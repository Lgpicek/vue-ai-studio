<script setup>
import { ref, nextTick } from 'vue'
import { useLLM } from '../composables/useLLM'

const { run, isReal } = useLLM()
const messages = ref([
  { role: 'assistant', content: 'Hola, soy el asistente de la demo. Preguntame lo que quieras.' }
])
const draft = ref('')
const loading = ref(false)
const error = ref('')
const scroller = ref(null)

async function send() {
  const text = draft.value.trim()
  if (!text || loading.value) return
  messages.value.push({ role: 'user', content: text })
  draft.value = ''
  loading.value = true
  error.value = ''
  await scrollDown()
  try {
    // Para el modo real pasamos el historial (sin el saludo inicial del assistant)
    const history = messages.value
      .slice(1)
      .map(function (m) { return { role: m.role, content: m.content } })
    const res = await run('chat', text, history)
    messages.value.push({ role: 'assistant', content: res.content })
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
    await scrollDown()
  }
}

async function scrollDown() {
  await nextTick()
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
}
</script>

<template>
  <div class="space-y-3">
    <p v-if="!isReal" class="rounded-md border border-edge bg-ink/50 px-3 py-2 text-xs text-mist">
      Modo simulado: las respuestas son de muestra generadas offline. Activa
      <span class="text-signal">API real</span> con tu key para una conversacion real con el LLM.
    </p>

    <div
      ref="scroller"
      class="h-64 space-y-3 overflow-y-auto rounded-md border border-edge bg-ink p-4"
    >
      <div
        v-for="(m, i) in messages"
        :key="i"
        class="flex"
        :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] rounded-lg px-3 py-2 text-sm"
          :class="m.role === 'user'
            ? 'bg-signaldeep/25 text-signal border border-signaldim/30'
            : 'border border-edge bg-panel text-cloud'"
        >
          {{ m.content }}
        </div>
      </div>
      <div v-if="loading" class="flex justify-start">
        <div class="rounded-lg border border-edge bg-panel px-3 py-2 text-sm text-mist">
          <span class="inline-flex gap-1">
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-signaldim" style="animation-delay: 0ms"></span>
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-signaldim" style="animation-delay: 150ms"></span>
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-signaldim" style="animation-delay: 300ms"></span>
          </span>
        </div>
      </div>
    </div>

    <p v-if="error" class="rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn">
      {{ error }}
    </p>

    <div class="flex gap-2">
      <input
        v-model="draft"
        type="text"
        class="flex-1 rounded-md border border-edge bg-ink px-3 py-2 font-mono text-sm text-cloud focus:border-signal focus:outline-none"
        placeholder="Escribi un mensaje..."
        @keyup.enter="send"
      />
      <button
        type="button"
        :disabled="loading"
        class="rounded-md bg-signaldim px-4 py-2 font-mono text-sm font-medium text-ink transition hover:bg-signal disabled:opacity-50"
        @click="send"
      >
        enviar
      </button>
    </div>
  </div>
</template>
