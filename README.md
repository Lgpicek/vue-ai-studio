# Vue AI Studio

SPA construida con **Vue 3 + Composition API + Vite + Tailwind CSS** que reune tres
herramientas de IA en una sola interfaz. Cada una corre en modo **simulado** (motor offline,
sin API key) o **real** (conexion directa a la API de Anthropic con tu propia key).

## Herramientas

- **Clasificador** — analiza sentimiento y urgencia de un texto de soporte.
- **Generador** — produce copy de marketing a partir de un prompt.
- **Asistente** — chat conversacional con historial.

## Stack

| Capa | Tecnologia |
|------|-----------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build | Vite 6 |
| Estilos | Tailwind CSS 3 |
| IA | API de Anthropic (`/v1/messages`) + motor de simulacion propio |

La logica de IA esta encapsulada en un composable reutilizable
(`src/composables/useLLM.js`) que comparte estado (modo y key) entre las tres herramientas.

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # build de produccion en /dist
npm run preview  # previsualizar el build
```

## Modo real (API key)

La key se ingresa en un input del navegador, se mantiene solo en memoria y **nunca**
se hardcodea ni se versiona. El modo simulado permite probar toda la interfaz sin
ninguna credencial ni costo.

## Deploy en GitHub Pages

El repo incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que
buildea y publica automaticamente en cada push a `main`.

1. Crear un repo (por ejemplo `vue-ai-studio`).
2. Verificar que `base` en `vite.config.js` coincida con el nombre del repo:
   `base: '/vue-ai-studio/'`.
3. En **Settings → Pages**, elegir **Source: GitHub Actions**.
4. Push a `main`. Queda publicado en `https://<usuario>.github.io/vue-ai-studio/`.
