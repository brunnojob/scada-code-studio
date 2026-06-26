import { HMIPanel } from "../HMI";

export function IntroSlide() {
  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-7 flex flex-col justify-center gap-6">
        <div className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
          // SCADA · PLC · Comandos Elétricos
        </div>
        <h1 className="text-6xl font-bold tracking-tight leading-[0.95]">
          Automação Industrial
          <br />
          <span className="text-primary">ao vivo</span>, com código real.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          Uma apresentação interativa de SCADA e CLP aplicada a comandos elétricos.
          Acione botoeiras, observe a lógica ladder energizar em tempo real e leia o
          código IEC 61131-3 que executa por trás de cada acionamento.
        </p>
        <div className="flex gap-6 pt-2">
          {[
            { k: "06", v: "Cenários" },
            { k: "100%", v: "Interativo" },
            { k: "ST + LD", v: "Linguagens" },
            { k: "Tempo real", v: "Simulação" },
          ].map((s) => (
            <div key={s.v} className="border-l-2 border-primary/60 pl-3">
              <div className="font-mono text-2xl text-primary">{s.k}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-5 flex items-center">
        <HMIPanel title="SCADA · Synoptic" className="w-full">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3 font-mono text-[10px]">
              {[
                { t: "TANK-01", v: "72.4" },
                { t: "BOMBA-A", v: "ON" },
                { t: "VALV-V2", v: "48%" },
                { t: "CHILLER", v: "12.1" },
                { t: "ESTEIRA", v: "1.20" },
                { t: "FORNO", v: "318°" },
              ].map((s) => (
                <div
                  key={s.t}
                  className="rounded border border-border/70 bg-secondary/40 p-3 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{s.t}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-signal-on glow-on" />
                  </div>
                  <div className="text-primary text-sm">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="h-px bg-border/60" />
            <div className="font-mono text-[10px] text-muted-foreground space-y-1">
              <div>[OK] Conexão CLP-01 estabelecida — 192.168.0.10:502</div>
              <div>[OK] Tag database carregado — 248 tags</div>
              <div className="text-accent">[RUN] Scan time: 4.2 ms · CPU: 18%</div>
            </div>
          </div>
        </HMIPanel>
      </div>
    </div>
  );
}