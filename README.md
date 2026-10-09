# SCADA Code Studio

An interactive interface for electrical controls, ladder diagrams, and motor states, with accessible controls and action-history export.

## Run

Requirements: React, TypeScript, TanStack Start, and Vite.

```sh
npm ci
npm run dev
npm run build
```

## Behavior

Controls handle pointer input, cancellation, keyboard interaction, and loss of focus. History retains up to 1,000 actions and exports JSON for the operations archive. This is a training environment and does not control a physical PLC.

## Optional report archive

Use the [shared operations archive client](https://github.com/brunnojob/vercel-home-telemetry-api/tree/main/cloud) to queue `result.json` under project `scada-code-studio`. The client uses `BRUNNODEV_ACCESS_TOKEN` and retains unacknowledged reports locally.

## License

Original source and documentation are MIT licensed; see [LICENSE](LICENSE). Third-party dependencies and media retain their respective terms. Maintained by [Brunno Dev](https://brunnodev.store).
