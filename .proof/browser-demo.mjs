import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,readFile} from 'node:fs/promises';
import {chromium} from './browser/node_modules/playwright/index.mjs';
const pages=process.env.SCADA_BUILD==='pages';
const baseUrl=process.env.SCADA_BASE_URL || `http://127.0.0.1:4188${pages?'/scada-code-studio/':'/'}`;
const server=process.env.SCADA_BASE_URL ? null : spawn('node',['node_modules/vite/bin/vite.js',...(pages?['preview','--config','vite.pages.config.ts']:[]),'--host','127.0.0.1','--port','4188','--strictPort'],{stdio:'ignore',detached:true});
let browser;
try {
  for(let i=0;i<150;i++) {
    try { const response=await fetch(baseUrl); if(response.ok)break; } catch {}
    if(i===149) throw new Error('Application did not start');
    await new Promise(resolve=>setTimeout(resolve,200));
  }
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1600,height:1000},acceptDownloads:true});
  const page=await context.newPage();
  const errors=[];
  const assetErrors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{
    if(response.url().startsWith(baseUrl) && response.status()>=400) assetErrors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(baseUrl,{waitUntil:'networkidle'});
  await page.getByRole('button',{name:/03.*Partida Direta/}).click();
  const start=page.getByRole('button',{name:'S1 · Ligar',exact:true});
  await start.focus();
  await start.press('Enter');
  await page.getByText('ON',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Trip FT',exact:true}).click();
  await page.getByText('TRIP',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Reset',exact:true}).click();
  await page.getByText('OFF',{exact:true}).waitFor();
  const downloadPromise=page.waitForEvent('download');
  await page.getByRole('button',{name:'Exportar JSON',exact:true}).click();
  const download=await downloadPromise;
  await mkdir('docs/proof',{recursive:true});
  await download.saveAs('docs/proof/scada-session.json');
  const session=JSON.parse(await readFile('docs/proof/scada-session.json','utf8'));
  assert.ok(session.actions.length>=4);
  assert.ok(session.actions.some(action=>action.label==='S1 · Ligar'));
  assert.ok(session.actions.every(action=>action.path===new URL(baseUrl).pathname));
  assert.equal(errors.length,0);
  assert.deepEqual(assetErrors,[]);
  await page.screenshot({path:'docs/proof/browser.png',fullPage:true});
  console.log(JSON.stringify({url:baseUrl,motor_started:true,thermal_trip_stopped_motor:true,reset_left_motor_stopped:true,exported_actions:session.actions.length,browser_errors:errors,asset_errors:assetErrors}));
} finally {
  if(browser) await browser.close();
  if(server) try {process.kill(-server.pid,'SIGTERM');}catch {}
}
