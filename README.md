# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Pages deployment notes

This project currently builds the frontend into the `docs/` folder for GitHub Pages. The frontend is configured with `VITE_API_BASE`, so the app can connect to a public backend API.

- For local development, copy from `.env.example` and set:
  ```
  VITE_API_BASE=http://localhost:8000
  ```
- For production on GitHub Pages, set a public backend base URL in `.env.production` before building.

Important: GitHub Pages only serves the static frontend. To share todos between users, you must host the FastAPI backend on a publicly accessible server and update `VITE_API_BASE` to point to that backend.
