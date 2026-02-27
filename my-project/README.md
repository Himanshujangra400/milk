# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

**This project has been extended into a full‑stack dairy tracking app.** The front‑end is a React/Vite dashboard and entry form; a simple Node/Express backend persists the data to `server/db.json`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Running the application

Open two terminals (or run `npm run dev:full` once you have installed dependencies):

```bash
# install everything once
npm install

# start the backend (port 5000)
npm run start:server

# in another shell start the frontend dev server (port 5173 by default)
npm run dev
```

The client is configured with a proxy so that calls to `/api/*` are forwarded to the backend. In production you can build the frontend and serve it from any static host while keeping the Express API running.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
