<script setup>
import { useLLM } from '../composables/useLLM'

const { mode, apiKey, isReal, lastLatency, setMode } = useLLM()
</script>

<template>
  <div class="rounded-lg border border-edge bg-panel p-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-mist">
          <span
            class="h-1.5 w-1.5 rounded-full"
            :class="isReal ? 'bg-warn' : 'bg-signal'"
          ></span>
          motor
        </span>
        <div class="flex rounded-md border border-edge bg-panel2 p-0.5">
          <button
            type="button"
            class="rounded px-3 py-1 font-mono text-[13px] font-medium transition"
            :class="!isReal ? 'bg-signaldeep/30 text-signal' : 'text-mist hover:text-cloud'"
            @click="setMode('sim')"
          >
            simulado
          </button>
          <button
            type="button"
            class="rounded px-3 py-1 font-mono text-[13px] font-medium transition"
            :class="isReal ? 'bg-warn/20 text-warn' : 'text-mist hover:text-cloud'"
            @click="setMode('real')"
          >
            api real
          </button>
        </div>
      </div>

      <div v-if="lastLatency > 0" class="font-mono text-[11px] text-mist">
        {{ lastLatency }}ms
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isReal" class="mt-4 border-t border-edge pt-4">
        <label class="mb-1.5 block font-mono text-[11px] text-mist">
          anthropic api key
          <span class="text-mist/60">(se queda en tu navegador, nunca se envia a un servidor propio)</span>
        </label>
        <input
          v-model="apiKey"
          type="password"
          placeholder="sk-ant-..."
          class="w-full rounded-md border border-edge bg-ink px-3 py-2 font-mono text-sm text-cloud placeholder:text-mist/40 focus:border-signal focus:outline-none"
        />
        <p class="mt-2 text-xs text-mist">
          Modo opcional para ver la integracion en vivo. Requiere una key de Anthropic con
          saldo. Si no tenes una, el modo <span class="text-signal">simulado</span> muestra
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
