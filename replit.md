# Escola de Solda no Japão

A high-conversion landing page for a welding school program in Japan, built with React + Vite + Tailwind CSS and Gemini AI. Originally exported from Google AI Studio.

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (dev server on port 5000)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **@google/genai** — Gemini AI SDK
- **Framer Motion** (`motion`)

## Running the app

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5000`.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Gemini API key for AI features |
| `APP_URL` | No | Public URL of the deployed app |

Set these in `.env.local` (gitignored). See `.env.example` for the format.

## Project structure

```
src/
  App.tsx        # Root component
  main.tsx       # Entry point
  index.css      # Global styles
  data.ts        # Static content / copy
  types.ts       # TypeScript types
  components/    # UI components
assets/          # Static assets
```

## User preferences

- Keep existing project structure and stack intact.
