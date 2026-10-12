# SCADA Code Studio

[Open the live application](https://brunnojob.github.io/scada-code-studio/)

[View execution evidence](https://brunnojob.github.io/devstart-lab/proofs/scada-code-studio/)

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

## GitHub Pages

The live application runs the same React simulation components entirely in the browser. The static build includes the repository base path and needs no backend or API credentials. The existing server build remains available through `npm run build`.

```sh
npm ci
npm run build:pages
npm run preview:pages
```

Open `http://localhost:4173/scada-code-studio/` to preview the production build. Pushes to `main` build and test the static application in Chromium before publishing it with the official GitHub Pages deployment actions. The browser check starts the motor, triggers the thermal trip, resets the protection, exports a session and rejects missing application assets or browser errors.

[Pages deployment](https://github.com/brunnojob/scada-code-studio/actions/workflows/pages.yml)

## Optional report archive

Use the [shared operations archive client](https://github.com/brunnojob/vercel-home-telemetry-api/tree/main/cloud) to queue `result.json` under project `scada-code-studio`. The client uses `BRUNNODEV_ACCESS_TOKEN` and retains unacknowledged reports locally.

## License

Original source and documentation are MIT licensed; see [LICENSE](LICENSE). Third-party dependencies and media retain their respective terms. Maintained by [Brunno Dev](https://brunnodev.store).

## Implementation update

Netlify builds use the official TanStack Start adapter with SSR output; the previous Nitro target remains available outside Netlify. Session recording validates action fields and exports only bounded, known fields. Use `NETLIFY=true npm run build` to verify the Netlify target locally.

Contribution trailer: `Co-authored-by: nyctophile <33561761+ineedfoundmyway@users.noreply.github.com>`.

## Execution proof

[![Executable proof](https://github.com/brunnojob/scada-code-studio/actions/workflows/proof.yml/badge.svg)](https://github.com/brunnojob/scada-code-studio/actions/workflows/proof.yml)

![Recorded program execution](docs/proof/execution.svg)

[Verified run](https://github.com/brunnojob/scada-code-studio/actions/runs/38017986898) · [Execution report](docs/proof/evidence.json)

Run `python .proof/record.py` after installing the prerequisites above. The scenarios execute repository code and verify exit codes and expected output. CI publishes `execution-proof` with the transcript, input fingerprints and source commit. The downloadable report identifies the exact tested version; the workflow badge tracks the latest run.

![Actual browser execution](docs/proof/browser.png)

Chromium starts the motor, verifies the thermal trip and reset, then downloads the captured session JSON. [Browser execution record](https://github.com/brunnojob/scada-code-studio/actions/runs/38017986898)
