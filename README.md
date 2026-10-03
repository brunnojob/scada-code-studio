# SCADA Code Studio

An interactive visual guide to PLC and electrical control concepts. Each scenario pairs an HMI-style process view with a ladder diagram and readable control logic.

## Scenarios

- Direct-on-line motor starting
- Motor reversal
- Star-delta starting
- Traffic light sequencing

The interface is built with React, TypeScript, TanStack Start, and Vite. The scenario components live in `src/components/scada`.

## Run locally

Requirements: Node.js and npm, or Bun.

```sh
bun install
bun run dev
```

Or use npm:

```sh
npm install
npm run dev
```

Vite prints the local development URL when the server starts.

## Available scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint.

## Scope

This is a visual learning project. It does not connect to or control a physical PLC or live equipment. Do not use its simulations as a substitute for validated industrial control logic or safety procedures.
