<script setup>
import { ref } from 'vue'
import ModeBar from './components/ModeBar.vue'
import Classifier from './components/Classifier.vue'
import Generator from './components/Generator.vue'
import Chat from './components/Chat.vue'

const tools = [
  { id: 'classify', cmd: 'classify', label: 'Clasificador', desc: 'Sentiment y urgencia de un texto de soporte' },
  { id: 'generate', cmd: 'generate', label: 'Generador', desc: 'Copy de marketing desde un prompt' },
  { id: 'chat', cmd: 'chat', label: 'Asistente', desc: 'Conversacion con historial de contexto' }
]
const active = ref('classify')
const activeTool = () => tools.find(function (t) { return t.id === active.value })

// Cambia esta URL por la de tu portfolio
const portfolioUrl = 'https://lgpicek.github.io'
</script>

<template>
  <div class="min-h-screen bg-ink">
    <!-- Header -->
    <header class="border-b border-edge">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-md bg-signaldim font-mono text-base font-bold text-ink">
            &#8983;
          </div>
          <div>
            <h1 class="font-display text-base font-semibold tracking-tight text-cloud">Vue AI Studio</h1>
            <p class="font-mono text-[11px] text-mist">vue3 . composition-api . vite . llm</p>
          </div>
        </div>
        <a
          :href="portfolioUrl"
          class="rounded-md border border-edge px-3 py-1.5 font-mono text-xs text-mist transition hover:border-signaldim hover:text-signal"
        >
          &larr; portfolio
        </a>
      </div>
    </header>

    <main class="mx-auto max-w-4xl space-y-7 px-6 py-10">
      <!-- Intro -->
      <section>
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-signaldim">tres herramientas . un motor</p>
        <h2 class="mt-2 font-display text-3xl font-semibold leading-tight text-cloud">
          IA aplicada, en vivo o sin conexion
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
          Construida con Vue 3 y Composition API. Corre por defecto en modo
          <span class="text-signal">simulado</span> &mdash; un motor heuristico offline, sin key
          ni costo &mdash; y tiene un modo <span class="text-signal">API real</span> opcional que
          conecta con un LLM usando tu propia credencial.
        </p>
      </section>

      <ModeBar />

      <!-- Selector tipo terminal -->
      <div class="overflow-hidden rounded-lg border border-edge bg-panel">
        <div class="flex items-center gap-2 border-b border-edge bg-panel2 px-4 py-2">
          <span class="h-2.5 w-2.5 rounded-full bg-edge"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-edge"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-signaldim"></span>
          <span class="ml-2 font-mono text-[11px] text-mist">vue-ai-studio &mdash; {{ activeTool().cmd }}</span>
        </div>

        <nav class="flex flex-wrap gap-1 border-b border-edge p-2">
          <button
            v-for="t in tools"
            :key="t.id"
            type="button"
            class="rounded-md px-3 py-1.5 font-mono text-[13px] transition"
            :class="active === t.id
              ? 'bg-signaldeep/25 text-signal'
              : 'text-mist hover:bg-panel2 hover:text-cloud'"
            @click="active = t.id"
          >
            <span class="text-signaldim">$</span> {{ t.cmd }}
          </button>
        </nav>

        <!-- Panel -->
        <div class="p-5">
          <p class="mb-4 font-mono text-[11px] uppercase tracking-widest text-mist">
            // {{ activeTool().desc }}
          </p>
          <Classifier v-if="active === 'classify'" />
          <Generator v-else-if="active === 'generate'" />
          <Chat v-else-if="active === 'chat'" />
        </div>
      </div>

      <footer class="flex flex-wrap items-center justify-between gap-2 pt-2 font-mono text-[11px] text-mist">
        <span>vue 3 . vite . tailwind</span>
        <a
          href="https://github.com/Lgpicek/vue-ai-studio"
          target="_blank"
          rel="noopener"
          class="transition hover:text-signal"
        >
          codigo en github &rarr;
        </a>
      </footer>
    </main>
  </div>
</template>
