import { useEffect, useRef, useState } from "react";

type Action = { atMs: number; label: string; state: "pressed" | "released"; path: string };

export function recordAction(label: string, state: Action["state"]) {
  window.dispatchEvent(
    new CustomEvent("scada-action", { detail: { label, state, path: window.location.pathname } }),
  );
}

export function SessionRecorder() {
  const [actions, setActions] = useState<Action[]>([]);
  const started = useRef(0);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    started.current = performance.now();
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<Omit<Action, "atMs">>).detail;
      if (!detail || typeof detail.label !== "string" || detail.label.length > 120 ||
          !["pressed", "released"].includes(detail.state) || typeof detail.path !== "string" ||
          detail.path.length > 2048 || !detail.path.startsWith("/")) return;
      setActions((previous) => [
        ...previous.slice(-999),
        { label: detail.label, state: detail.state, path: detail.path,
          atMs: Math.round(performance.now() - started.current) },
      ]);
    };
    window.addEventListener("scada-action", listener);
    return () => window.removeEventListener("scada-action", listener);
  }, []);
  function download() {
    const data = {
      project: "scada-code-studio",
      mode: "training",
      durationMs: Math.round(performance.now() - started.current),
      actions,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "scada-session.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Sessão exportada. Você pode armazená-la no arquivo de operações.");
  }
  return (
    <aside className="border-t border-border bg-background px-5 py-4 text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <span>Histórico da sessão: {actions.length} ações</span>
        <button
          type="button"
          disabled={!actions.length}
          onClick={download}
          className="rounded border border-border px-3 py-2 disabled:opacity-50"
        >
          Exportar JSON
        </button>
        <a
          href="https://vercel-home-telemetry-api.vercel.app/laboratory.html?project=scada-code-studio"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Arquivo de operações
        </a>
        <button
          type="button"
          onClick={() => {
            setActions([]);
            started.current = performance.now();
            setNotice("Histórico reiniciado.");
          }}
        >
          Reiniciar histórico
        </button>
        <span role="status">{notice}</span>
      </div>
    </aside>
  );
}
