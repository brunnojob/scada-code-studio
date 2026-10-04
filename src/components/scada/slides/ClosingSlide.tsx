import { useLanguage, Localized } from "@/lib/i18n";
import { HMIPanel } from "../HMI";
import { CheckCircle2 } from "lucide-react";

const points = [
  "SCADA é a camada de supervisão; o CLP é quem executa a lógica em ciclo determinístico",
  "Toda partida de motor precisa de selo, botão NF de parada e contato NF do térmico",
  "Reversão exige intertravamento elétrico cruzado entre contatores (K1 ⊥ K2)",
  "Estrela-Triângulo reduz a corrente de partida e depende de TON para comutar",
  "Máquinas de estado (CASE) modelam sequências cíclicas como semáforos e batidas",
  "Structured Text e Ladder são equivalentes — o CLP traduz LD para a mesma lógica booleana",
];

export function ClosingSlide() {
  const { language } = useLanguage();
  const english = language === "en";
  return (
    <Localized language={language}>
    <div className="h-full flex flex-col gap-6">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.32em] text-primary mb-2">
          06 · Encerramento
        </div>
        <h2 className="text-5xl font-bold">O que ficou</h2>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-7 space-y-3">
          {points.map((p, i) => (
            <div
              key={i}
              className="flex gap-3 items-start p-4 rounded-lg border border-border bg-card/50"
            >
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-base text-foreground/90 leading-relaxed">{p}</div>
            </div>
          ))}
        </div>

        <div className="col-span-5 flex flex-col gap-4">
          <HMIPanel title={english ? "Next steps" : "Próximos passos"} className="flex-1">
            <div className="p-6 space-y-4">
              <Step n="01" t="Modbus TCP / OPC UA" d="Integre o CLP a um SCADA real e leia os tags via rede industrial." />
              <Step n="02" t="Alarmes e Históricos" d="Trate eventos críticos, registre tendências e gere relatórios." />
              <Step n="03" t={english ? "Recipes and MES" : "Receitas e MES"} d="Eleve a automação ao nível 3 — produção orientada a ordem." />
            </div>
          </HMIPanel>

          <HMIPanel title={english ? "System · Online" : "Sistema · Online"}>
            <div className="p-4 font-mono text-[11px] space-y-1 text-muted-foreground">
              <div>[OK] {english ? "Demo completed without alarms" : "Demonstração concluída sem alarmes"}</div>
              <div>[OK] {english ? "4 scenarios completed · 0 failures" : "4 cenários executados · 0 falhas"}</div>
              <div className="text-accent">[END] {english ? "Thank you — ready for questions." : "Obrigado — pronto para perguntas."}</div>
            </div>
          </HMIPanel>
        </div>
      </div>
    </div>
    </Localized>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="flex gap-3">
      <div className="font-mono text-primary text-lg">{n}</div>
      <div>
        <div className="font-semibold">{t}</div>
        <div className="text-sm text-muted-foreground">{d}</div>
      </div>
    </div>
  );
}
