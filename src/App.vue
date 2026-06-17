<script setup>
import { ref } from 'vue'
import ModeBar from './components/ModeBar.vue'
import Classifier from './components/Classifier.vue'
import Generator from './components/Generator.vue'
import Chat from './components/Chat.vue'

const tabs = [
  { id: 'classify', label: 'Clasificador', desc: 'Sentiment y urgencia de texto' },
  { id: 'generate', label: 'Generador', desc: 'Copy de marketing desde un prompt' },
  { id: 'chat', label: 'Asistente', desc: 'Chat conversacional con historial' }
]
const active = ref('classify')

// Cambia esta URL por la de tu portfolio
const portfolioUrl = 'https://lgpicek.github.io'
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-edge">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-md bg-signal font-mono text-lg font-bold text-white">
            &lt;/&gt;
          </div>
          <div>
            <h1 class="font-mono text-sm font-bold text-cloud">Vue AI Studio</h1>
            <p class="text-xs text-mist">Vue 3 · Composition API · Tailwind · LLM</p>
          </div>
        </div>
        
          :href="portfolioUrl"
          class="rounded-md border border-edge px-3 py-1.5 text-xs text-mist transition hover:border-signal hover:text-cloud"
        >
          ← Volver al portfolio
        </a>
      </div>
    </header>

    <main class="mx-auto max-w-4xl space-y-6 px-6 py-8">
      <section>
        <h2 class="text-2xl font-bold text-cloud">Tres herramientas de IA en una SPA</h2>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
          Demo construida con Vue 3 y Composition API. Funciona por defecto en modo
          <span class="text-cloud">simulado</span>: un motor offline que corre sin API key
          ni costo, ideal para probar toda la interfaz. Tambien incluye un modo
          <span class="text-cloud">API real</span> opcional que se conecta a un LLM con tu
          propia key, para mostrar la integracion en vivo. El toggle de abajo cambia el motor.
        </p>
      </section>

      <ModeBar />

      <nav class="flex flex-wrap gap-2 border-b border-edge">
        <button
          v-for="t in tabs"
          :key="t.id"
          type="button"
          class="relative -mb-px border-b-2 px-4 py-2 text-sm font-medium transition"
          :class="active === t.id
            ? 'border-signal text-cloud'
            : 'border-transparent text-mist hover:text-cloud'"
          @click="active = t.id"
        >
          {{ t.label }}
        </button>
      </nav>

      <section class="rounded-lg border border-edge bg-panel p-5">
        <p class="mb-4 text-xs uppercase tracking-widest text-mist">
          {{ tabs.find(function (t) { return t.id === active }).desc }}
        </p>
        <Classifier v-if="active === 'classify'" />
        <Generator v-else-if="active === 'generate'" />
        <Chat v-else-if="active === 'chat'" />
      </section>

      <footer class="pt-4 text-center text-xs text-mist">
        Hecho con Vue 3 + Vite + Tailwind · codigo en GitHub
      </footer>
    </main>
  </div>
</template>