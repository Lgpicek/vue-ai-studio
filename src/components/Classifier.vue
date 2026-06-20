<script setup>
import { ref } from 'vue'
import { useLLM } from '../composables/useLLM'

const { run } = useLLM()
const input = ref('No funciona el sistema desde ayer y es urgente, no puedo trabajar.')
const result = ref(null)
const loading = ref(false)
const error = ref('')

async function analyze() {
  if (!input.value.trim()) return
  loading.value = true
  error.value = ''
  result.value = null
  try {
    result.value = await run('classify', input.value)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const sentimentColor = {
  positivo: 'text-signal',
  negativo: 'text-warn',
  neutral: 'text-mist'
}
const urgencyColor = {
  alta: 'bg-warn/15 text-warn border-warn/40',
  media: 'bg-signaldeep/20 text-signal border-signaldim/40',
  baja: 'bg-edge text-mist border-edge'
}
</script>

<template>
  <div class="space-y-4">
    <textarea
      v-model="input"
      rows="3"
      class="w-full resize-none rounded-md border border-edge bg-ink px-3 py-2 font-mono text-sm text-cloud focus:border-signal focus:outline-none"
      placeholder="Pega un mensaje de soporte..."
    ></textarea>

    <button
      type="button"
      :disabled="loading"
      class="rounded-md bg-signaldim px-4 py-2 font-mono text-sm font-medium text-ink transition hover:bg-signal disabled:opacity-50"
      @click="analyze"
    >
      {{ loading ? 'analizando...' : 'analizar texto' }}
    </button>

    <p v-if="error" class="rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn">
      {{ error }}
    </p>

    <div v-if="result" class="grid gap-3 sm:grid-cols-3">
      <div class="rounded-md border border-edge bg-ink p-3">
        <p class="font-mono text-[11px] uppercase tracking-wide text-mist">sentimiento</p>
        <p class="mt-1 text-lg font-semibold capitalize" :class="sentimentColor[result.sentiment]">
          {{ result.sentiment }}
        </p>
      </div>
      <div class="rounded-md border border-edge bg-ink p-3">
        <p class="font-mono text-[11px] uppercase tracking-wide text-mist">urgencia</p>
        <span
          class="mt-1 inline-block rounded border px-2 py-0.5 text-sm font-medium capitalize"
          :class="urgencyColor[result.urgency]"
        >
          {{ result.urgency }}
        </span>
      </div>
      <div class="rounded-md border border-edge bg-ink p-3">
        <p class="font-mono text-[11px] uppercase tracking-wide text-mist">confianza</p>
        <p class="mt-1 font-mono text-lg text-cloud">
          {{ Math.round(result.confidence * 100) }}%
        </p>
      </div>
      <div v-if="result.keywords && result.keywords.length" class="sm:col-span-3">
        <p class="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-mist">palabras clave detectadas</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="kw in result.keywords"
            :key="kw"
            class="rounded bg-panel2 px-2 py-0.5 font-mono text-xs text-signal"
          >
            {{ kw }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
