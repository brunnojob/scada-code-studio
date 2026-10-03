import { useLanguage, Localized } from "@/lib/i18n";
import { HMIPanel } from "../HMI";
import { Cpu, Database, Eye, Network } from "lucide-react";

const blocks = [
  {
    icon: Eye,
    title: "SCADA",
    sub: "Supervisory Control And Data Acquisition",
    desc: "Camada de supervisão — exibe sinópticos, alarmes, históricos e permite ao operador interagir com o processo.",
  },
  {
    icon: Cpu,
    title: "CLP / PLC",
    sub: "Controlador Lógico Programável",
    desc: "Executa a lógica de controle em ciclo determinístico: lê entradas, processa o programa e escreve saídas.",
  },
  {
    icon: Network,
    title: "Field Bus",
    sub: "Modbus TCP · PROFINET · EtherCAT",
    desc: "Rede industrial que transporta os tags entre CLP, IHM, SCADA e dispositivos remotos.",
  },
  {
    icon: Database,
    title: "I/O e Comandos",
    sub: "Botoeiras, contatoras, sensores",
    desc: "Os comandos elétricos clássicos — NA, NF, selo e intertravamento — são a base da automação.",
  },
];

export function ConceptSlide() {
  const { language } = useLanguage();
  return (
    <Localized language={language}>
    <div className="h-full flex flex-col gap-6">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.32em] text-primary mb-2">
          01 · Arquitetura
        </div>
        <h2 className="text-4xl font-bold">Do botão à supervisão</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 flex-1">
        {blocks.map((b, i) => (
          <HMIPanel key={b.title} title={`MOD-0${i + 1}`} className="flex flex-col">
            <div className="p-5 space-y-3 flex-1">
              <b.icon className="h-7 w-7 text-primary" />
              <div>
                <div className="text-xl font-semibold">{b.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {b.sub}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          </HMIPanel>
        ))}
      </div>

      <HMIPanel title="Pirâmide da automação · ISA-95">
        <div className="p-5 grid grid-cols-5 items-end gap-2 h-36 font-mono text-[10px]">
          {[
            { lvl: "L0", lbl: "Sensores / Atuadores", h: "h-12", c: "bg-muted border-border" },
            { lvl: "L1", lbl: "CLP / PLC", h: "h-16", c: "bg-secondary border-border" },
            { lvl: "L2", lbl: "SCADA / IHM", h: "h-20", c: "bg-primary/40 border-primary" },
            { lvl: "L3", lbl: "MES", h: "h-24", c: "bg-accent/30 border-accent" },
            { lvl: "L4", lbl: "ERP", h: "h-28", c: "bg-background border-border" },
          ].map((p) => (
            <div key={p.lvl} className="flex flex-col items-center gap-2">
              <div className={`w-full ${p.h} ${p.c} border rounded-t`} />
              <div className="text-muted-foreground uppercase tracking-widest">
                {p.lvl} · {p.lbl}
              </div>
            </div>
          ))}
        </div>
      </HMIPanel>
    </div>
    </Localized>
  );
}