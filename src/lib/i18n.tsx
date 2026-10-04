import { Children, cloneElement, createContext, isValidElement, useContext, type ReactNode } from "react";

export type Language = "pt" | "en";
type LanguageState = { language: Language; setLanguage: (language: Language) => void };

export const LanguageContext = createContext<LanguageState>({
  language: "pt",
  setLanguage: () => undefined,
});

const translations: Record<string, string> = {
  "Abertura": "Opening",
  "Arquitetura": "Architecture",
  "Estrela-Triângulo": "Star-Delta",
  "Semáforo Sequencial": "Traffic Light Sequence",
  "Reversão": "Reversal",
  "Encerramento": "Closing",
  "Apresentação": "Presentation",
  "Conceitos": "Concepts",
  "Cenário": "Scenario",
  "Final": "Closing",
  "Automação Industrial": "Industrial Automation",
  "ao vivo": "live",
  ", com código real.": ", with real code.",
  "SCADA · PLC · Comandos Elétricos": "SCADA · PLC · Electrical Controls",
  "CLP · Comandos Elétricos · IEC 61131-3": "PLC · Electrical Controls · IEC 61131-3",
  "Uma apresentação interativa de SCADA e CLP aplicada a comandos elétricos. Acione botoeiras, observe a lógica ladder energizar em tempo real e leia o código IEC 61131-3 que executa por trás de cada acionamento.": "An interactive SCADA and PLC presentation for electrical controls. Operate the push buttons, watch the ladder logic energize in real time, and read the IEC 61131-3 code behind each action.",
  "Cenários": "Scenarios",
  "Interativo": "Interactive",
  "Linguagens": "Languages",
  "Tempo real": "Real time",
  "SIMULAÇÃO": "SIMULATION",
  "Conexão CLP-01 estabelecida — 192.168.0.10:502": "PLC-01 connection established — 192.168.0.10:502",
  "Tag database carregado — 248 tags": "Tag database loaded — 248 tags",
  "01 · Arquitetura": "01 · Architecture",
  "Do botão à supervisão": "From push button to supervision",
  "Camada de supervisão — exibe sinópticos, alarmes, históricos e permite ao operador interagir com o processo.": "Supervisory layer that displays process diagrams, alarms, and history, and lets operators interact with the process.",
  "Controlador Lógico Programável": "Programmable Logic Controller",
  "Executa a lógica de controle em ciclo determinístico: lê entradas, processa o programa e escreve saídas.": "Executes control logic in a deterministic cycle: reads inputs, runs the program, and writes outputs.",
  "Rede industrial que transporta os tags entre CLP, IHM, SCADA e dispositivos remotos.": "Industrial network that carries tags between the PLC, HMI, SCADA, and remote devices.",
  "I/O e Comandos": "I/O and Controls",
  "Botoeiras, contatoras, sensores": "Push buttons, contactors, sensors",
  "Os comandos elétricos clássicos — NA, NF, selo e intertravamento — são a base da automação.": "Classic electrical controls—NO, NC, seal-in, and interlocking—are the foundation of automation.",
  "Pirâmide da automação · ISA-95": "Automation pyramid · ISA-95",
  "Supervisory Control And Data Acquisition": "Supervisory Control And Data Acquisition",
  "Field Bus": "Field Bus",
  "Sensores / Atuadores": "Sensors / Actuators",
  "02 · Cenário": "02 · Scenario",
  "Partida Direta": "Direct-on-Line Starting",
  "Selo + intertravamento térmico": "Seal-in + thermal interlock",
  "HMI · Painel de Comando": "HMI · Control Panel",
  "Parar": "Stop",
  "Ligar": "Start",
  "S1 · Ligar": "S1 · Start",
  "Modo": "Mode",
  "Diagrama Ladder · Online Monitor": "Ladder Diagram · Online Monitor",
  "Partida com selo e desligamento por S0 / FT": "Start with seal-in and shutdown by S0 / FT",
  "Selo de K1 em paralelo com S1": "K1 seal-in parallel to S1",
  "Sinaleira de motor ligado": "Motor-running indicator",
  "Pressione e segure as botoeiras": "Press and hold the push buttons",
  "Observe a energização das trilhas": "Watch the ladder rails energize",
  "03 · Cenário": "03 · Scenario",
  "Reversão de Motor": "Motor Reversal",
  "Intertravamento elétrico — K1 bloqueia K2 e vice-versa": "Electrical interlock — K1 blocks K2 and vice versa",
  "Pare antes de inverter o sentido": "Stop before changing direction",
  "Note os contatos NF cruzados": "Note the cross-wired NC contacts",
  "HMI · Painel": "HMI · Panel",
  "Direto": "Forward",
  "Reverso": "Reverse",
  "Avanço com intertravamento de K2 e S2": "Forward with K2 and S2 interlock",
  "Selo de K1": "K1 seal-in",
  "Recuo com intertravamento de K1 e S1": "Reverse with K1 and S1 interlock",
  "Selo de K2": "K2 seal-in",
  "04 · Cenário": "04 · Scenario",
  "Partida Estrela-Triângulo": "Star-Delta Starting",
  "Temporizador TON comuta a configuração após 5 segundos": "A TON timer switches the configuration after 5 seconds",
  "Pressione S1 e aguarde": "Press S1 and wait",
  "a transição Y → Δ": "for the Y → Δ transition",
  "HMI · Partida Y-Δ": "HMI · Y-Δ Starting",
  "Temporizador": "Timer",
  "Linha": "Line",
  "S0 · Parar": "S0 · Stop",
  "S1 · Partir": "S1 · Start",
  "Etapa": "Stage",
  "ESTRELA": "STAR",
  "TRIÂNGULO": "DELTA",
  "Memória de marcha (selo)": "Run memory (seal-in)",
  "Selo de M": "M seal-in",
  "Temporizador TON · 5s": "TON timer · 5s",
  "Estrela (KY) — antes do timer": "Star (KY) — before timer",
  "Triângulo (KD) — após timer": "Delta (KD) — after timer",
  "Contator de linha": "Line contactor",
  "05 · Cenário": "05 · Scenario",
  "Máquina de estados (CASE) com temporizador único reaproveitado": "CASE state machine with a reused timer",
  "Acione START e observe": "Press START and watch",
  "a sequência cíclica": "the repeating sequence",
  "HMI · Cruzamento": "HMI · Intersection",
  "FASE GREEN": "PHASE GREEN",
  "FASE YELLOW": "PHASE YELLOW",
  "FASE RED": "PHASE RED",
  "Estado": "State",
  "Ciclo": "Cycle",
  "Habilita ciclo (selo)": "Enable cycle (seal-in)",
  "Saída VERDE — STATE=1": "GREEN output — STATE=1",
  "Saída AMARELO — STATE=2": "YELLOW output — STATE=2",
  "Saída VERMELHO — STATE=3": "RED output — STATE=3",
  "Temporizador da fase atual": "Current phase timer",
  "06 · Encerramento": "06 · Closing",
  "O que ficou": "Key takeaways",
  "SCADA é a camada de supervisão; o CLP é quem executa a lógica em ciclo determinístico": "SCADA is the supervisory layer; the PLC executes logic in a deterministic cycle",
  "Toda partida de motor precisa de selo, botão NF de parada e contato NF do térmico": "Every motor starter needs a seal-in, an NC stop button, and an NC thermal contact",
  "Reversão exige intertravamento elétrico cruzado entre contatores (K1 ⊥ K2)": "Reversal requires cross electrical interlocking between contactors (K1 ⊥ K2)",
  "Estrela-Triângulo reduz a corrente de partida e depende de TON para comutar": "Star-delta reduces starting current and uses a TON timer to switch",
  "Máquinas de estado (CASE) modelam sequências cíclicas como semáforos e batidas": "CASE state machines model repeating sequences such as traffic lights and beats",
  "Structured Text e Ladder são equivalentes — o CLP traduz LD para a mesma lógica booleana": "Structured Text and Ladder are equivalent—the PLC translates LD into the same Boolean logic",
  "Próximos passos": "Next steps",
  "Integre o CLP a um SCADA real e leia os tags via rede industrial.": "Connect a PLC to a real SCADA system and read tags over an industrial network.",
  "Alarmes e Históricos": "Alarms and History",
  "Falha": "Fault",
  "Trate eventos críticos, registre tendências e gere relatórios.": "Handle critical events, record trends, and generate reports.",
  "Eleve a automação ao nível 3 — produção orientada a ordem.": "Bring automation to level 3 with order-driven production.",
  "Demonstração concluída sem alarmes": "Demo completed without alarms",
  "4 cenários executados · 0 falhas": "4 scenarios completed · 0 failures",
  "Obrigado — pronto para perguntas.": "Thank you — ready for questions.",
  "Compilado · Online": "Compiled · Online"
};

export function useLanguage() {
  return useContext(LanguageContext);
}

export function translateText(value: string, language: Language) {
  if (language === "pt") return value;
  const normalized = value.replace(/\s+/g, " ").trim().toLocaleLowerCase();
  const match = Object.entries(translations).find(([source]) =>
    source.replace(/\s+/g, " ").trim().toLocaleLowerCase() === normalized,
  );
  return match?.[1] ?? value;
}

function translateValue(value: unknown, language: Language): unknown {
  if (typeof value === "string") return translateText(value, language);
  if (Array.isArray(value)) return value.map((item) => translateValue(item, language));
  if (isValidElement(value)) return translateElement(value, language);
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateValue(item, language)]));
  }
  return value;
}

export function translateElement(node: ReactNode, language: Language): ReactNode {
  if (language === "pt" || node === null || node === undefined || typeof node === "boolean") return node;
  if (typeof node === "string") return translateText(node, language);
  if (Array.isArray(node)) return node.map((item) => translateElement(item, language));
  if (!isValidElement(node)) return node;
  const props = Object.fromEntries(
    Object.entries(node.props).map(([key, value]) => [
      key,
      key === "children" ? translateElement(value as ReactNode, language) : translateValue(value, language),
    ]),
  );
  return cloneElement(node, props as never);
}

export function Localized({ children, language }: { children: ReactNode; language: Language }) {
  return <>{translateElement(Children.toArray(children), language)}</>;
}
