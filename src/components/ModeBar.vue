<script setup>
import { useLLM } from '../composables/useLLM'

const { mode, apiKey, isReal, lastLatency, setMode } = useLLM()
</script>

<template>
  <div class="rounded-lg border border-edge bg-panel p-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-xs uppercase tracking-widest text-mist">Motor</span>
        <div class="flex rounded-md border border-edge p-0.5">
          <button
            type="button"
            class="rounded px-3 py-1 text-sm font-medium transition"
            :class="!isReal ? 'bg-signal text-white' : 'text-mist hover:text-cloud'"
            @click="setMode('sim')"
          >
            Simulado
          </button>
          <button
            type="button"
            class="rounded px-3 py-1 text-sm font-medium transition"
            :class="isReal ? 'bg-signal text-white' : 'text-mist hover:text-cloud'"
            @click="setMode('real')"
          >
            API real
          </button>
        </div>
      </div>

      <div v-if="lastLatency > 0" class="font-mono text-xs text-mist">
        ultima respuesta: {{ lastLatency }} ms
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isReal" class="mt-4">
        <label class="mb-1 block text-xs text-mist">
          Anthropic API key (se queda en tu navegador, no se guarda ni se envia a ningun servidor propio)
        </label>
        <input
          v-model="apiKey"
          type="password"
          placeholder="sk-ant-..."
          class="w-full rounded-md border border-edge bg-ink px-3 py-2 font-mono text-sm text-cloud placeholder:text-mist/50 focus:border-signal focus:outline-none"
        />
        <p class="mt-2 text-xs text-mist">
          Modo opcional para ver la integracion en vivo. Requiere una key de Anthropic con
          saldo. Si no tenes una, el modo <span class="text-cloud">Simulado</span> muestra
          toda la demo sin costo.
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>