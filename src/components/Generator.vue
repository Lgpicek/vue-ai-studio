<script setup>
import { ref } from 'vue'
import { useLLM } from '../composables/useLLM'

const { run } = useLLM()
const topic = ref('una app de gestion de tareas para equipos remotos')
const output = ref('')
const loading = ref(false)
const error = ref('')
const copied = ref(false)

async function generate() {
  if (!topic.value.trim()) return
  loading.value = true
  error.value = ''
  output.value = ''
  try {
    const res = await run('generate', topic.value)
    output.value = res.content
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function copy() {
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(function () { copied.value = false }, 1500)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-2 sm:flex-row">
      <input
        v-model="topic"
        type="text"
        class="flex-1 rounded-md border border-edge bg-ink px-3 py-2 font-mono text-sm text-cloud focus:border-signal focus:outline-none"
        placeholder="Describe el producto o tema..."
        @keyup.enter="generate"
      />
      <button
        type="button"
        :disabled="loading"
        class="rounded-md bg-signaldim px-4 py-2 font-mono text-sm font-medium text-ink transition hover:bg-signal disabled:opacity-50"
        @click="generate"
      >
        {{ loading ? 'generando...' : 'generar copy' }}
      </button>
    </div>

    <p v-if="error" class="rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn">
      {{ error }}
    </p>

    <div v-if="output" class="relative rounded-md border border-edge bg-ink p-4">
      <p class="pr-16 text-sm leading-relaxed text-cloud">{{ output }}</p>
      <button
        type="button"
        class="absolute right-3 top-3 rounded border border-edge px-2 py-1 font-mono text-xs transition"
        :class="copied ? 'border-signaldim text-signal' : 'text-mist hover:text-cloud'"
        @click="copy"
      >
        {{ copied ? 'copiado' : 'copiar' }}
      </button>
    </div>
  </div>
</template>
