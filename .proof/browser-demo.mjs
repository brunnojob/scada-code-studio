import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,readFile} from 'node:fs/promises';
import {chromium} from './browser/node_modules/playwright/index.mjs';
const server=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','4188','--strictPort'],{stdio:'ignore',detached:true});
let browser;
try {
  for(let i=0;i<150;i++) {
    try { const response=await fetch('http://127.0.0.1:4188'); if(response.ok)break; } catch {}
    if(i===149) throw new Error('Application did not start');
    await new Promise(resolve=>setTimeout(resolve,200));
  }
  browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1600,height:1000},acceptDownloads:true});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4188',{waitUntil:'networkidle'});
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
  assert.equal(errors.length,0);
  await page.screenshot({path:'docs/proof/browser.png',fullPage:true});
  console.log(JSON.stringify({motor_started:true,thermal_trip_stopped_motor:true,reset_left_motor_stopped:true,exported_actions:session.actions.length,browser_errors:errors}));
} finally {
  if(browser) await browser.close();
  try {process.kill(-server.pid,'SIGTERM');}catch {}
}
