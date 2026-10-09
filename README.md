# SCADA Code Studio

Interface interativa de comandos elétricos, diagramas ladder e estados de motor, com controles acessíveis e exportação do histórico de ações.

## Executar

Requisitos: React, TypeScript, TanStack Start e Vite.

```sh
npm ci
npm run dev
npm run build
```

## Funcionamento

Controles respondem a ponteiro, cancelamento, teclado e perda de foco. O histórico conserva até mil ações e exporta JSON para o arquivo de operações. O ambiente representa treinamento e não controla um PLC físico.

## Persistência de resultados

O arquivo de operações está em [vercel-home-telemetry-api.vercel.app](https://vercel-home-telemetry-api.vercel.app/laboratory.html?project=scada-code-studio). As migrações Supabase estão no [repositório da API](https://github.com/brunnojob/vercel-home-telemetry-api/tree/main/supabase/migrations).

```sh
python cloud/sync.py enqueue resultado.json --project scada-code-studio
python cloud/sync.py sync
```

Defina `BRUNNODEV_ACCESS_TOKEN` com sua sessão. A fila SQLite conserva os relatórios até confirmação do servidor; o mesmo conteúdo não gera registros duplicados. Tokens não são gravados no código.
