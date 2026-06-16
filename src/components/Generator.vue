<script setup>
import { ref } from 'vue'
import { useLLM } from '../composables/useLLM'

const { run } = useLLM()
const topic = ref('una app de gestion de tareas para equipos remotos')
const output = ref('')
const loading = ref(false)
const error = ref('')

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
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-2 sm:flex-row">
      <input
        v-model="topic"
        type="text"
        class="flex-1 rounded-md border border-edge bg-ink px-3 py-2 text-sm text-cloud focus:border-signal focus:outline-none"
        placeholder="Describe el producto o tema..."
        @keyup.enter="generate"
      />
      <button
        type="button"
        :disabled="loading"
        class="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white transition hover:bg-signaldim disabled:opacity-50"
        @click="generate"
      >
        {{ loading ? 'Generando...' : 'Generar copy' }}
      </button>
    </div>

    <p v-if="error" class="rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn">
      {{ error }}
    </p>

    <div v-if="output" class="relative rounded-md border border-edge bg-ink p-4">
      <p class="pr-16 text-sm leading-relaxed text-cloud">{{ output }}</p>
      <button
        type="button"
        class="absolute right-3 top-3 rounded border border-edge px-2 py-1 text-xs text-mist transition hover:text-cloud"
        @click="copy"
      >
        Copiar
      </button>
    </div>
  </div>
</template>
