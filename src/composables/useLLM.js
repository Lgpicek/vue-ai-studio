import { ref, computed } from 'vue'

// ── Estado compartido (singleton) entre todas las herramientas ──────────────
const mode = ref('sim')          // 'sim' | 'real'
const apiKey = ref('')
const lastLatency = ref(0)

export function useLLM() {
  const isReal = computed(() => mode.value === 'real')
  const hasKey = computed(() => apiKey.value.trim().length > 0)

  function setMode(next) {
    mode.value = next
  }

  // ── Motor de simulacion offline (sin API key, sin costo) ──────────────────
  // Reglas heuristicas que imitan la forma de una respuesta de LLM.
  function simulate(task, input) {
    const text = (input || '').trim()
    const words = text ? text.split(/\s+/).length : 0

    if (task === 'classify') {
      const lower = text.toLowerCase()
      const neg = ['no funciona', 'error', 'urgente', 'mal', 'pesimo', 'reclamo', 'cancelar', 'molesto', 'tarde', 'roto', 'falla']
      const pos = ['gracias', 'excelente', 'genial', 'perfecto', 'rapido', 'felicito', 'buenisimo', 'resuelto']
      const urgent = ['urgente', 'ya', 'inmediato', 'caido', 'produccion', 'no puedo', 'critico', 'ahora']
      const negHits = neg.filter(function (w) { return lower.indexOf(w) !== -1 }).length
      const posHits = pos.filter(function (w) { return lower.indexOf(w) !== -1 }).length
      const urgHits = urgent.filter(function (w) { return lower.indexOf(w) !== -1 }).length
      let sentiment = 'neutral'
      if (negHits > posHits) sentiment = 'negativo'
      else if (posHits > negHits) sentiment = 'positivo'
      const urgency = urgHits >= 2 ? 'alta' : urgHits === 1 ? 'media' : 'baja'
      return Promise.resolve({
        sentiment: sentiment,
        urgency: urgency,
        confidence: Math.min(0.95, 0.55 + (negHits + posHits + urgHits) * 0.08),
        keywords: Array.from(new Set(neg.concat(pos, urgent).filter(function (w) {
          return lower.indexOf(w) !== -1
        }))).slice(0, 5)
      })
    }

    if (task === 'generate') {
      const topic = text || 'tu producto'
      const out =
        'Presentamos ' + topic + ': la solucion pensada para quienes valoran ' +
        'resultados claros sin complicaciones. Diseñada con foco en la experiencia, ' +
        'combina rendimiento y simplicidad para que logres mas en menos tiempo. ' +
        'Descubri por que cada vez mas equipos eligen ' + topic + ' para crecer.'
      return Promise.resolve({ content: out, tokens: out.split(/\s+/).length })
    }

    if (task === 'chat') {
      const reply =
        'Entiendo tu consulta sobre "' + (text.slice(0, 60) || 'tu mensaje') + '". ' +
        (words > 12
          ? 'Es un tema con varias aristas; te lo separo en partes para que sea claro y accionable.'
          : 'Te doy una respuesta directa y, si necesitas, profundizamos.')
      return Promise.resolve({ content: reply })
    }

    return Promise.resolve({ content: 'Tarea no reconocida.' })
  }

  // ── Llamada real a la API de Anthropic ────────────────────────────────────
  // La key la pone el usuario en un input y NUNCA se hardcodea ni se versiona.
  async function callReal(task, input, history) {
    const prompts = {
      classify:
        'Analiza el siguiente texto de soporte. Responde SOLO con JSON valido, sin markdown, ' +
        'con esta forma exacta: {"sentiment":"positivo|neutral|negativo","urgency":"baja|media|alta",' +
        '"confidence":0.0,"keywords":["..."]}. Texto: ' + input,
      generate:
        'Escribi un texto de marketing breve (3-4 oraciones) sobre: ' + input +
        '. Responde solo con el texto, sin preambulo.',
      chat: input
    }

    const messages = task === 'chat' && Array.isArray(history)
      ? history.concat([{ role: 'user', content: input }])
      : [{ role: 'user', content: prompts[task] }]

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.value,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: messages
      })
    })

    if (!res.ok) {
      const detail = await res.text()
      throw new Error('La API respondio ' + res.status + '. ' + detail.slice(0, 200))
    }

    const data = await res.json()
    const textOut = (data.content || [])
      .map(function (b) { return b.type === 'text' ? b.text : '' })
      .join('\n')
      .trim()

    if (task === 'classify') {
      const clean = textOut.replace(/```json|```/g, '').trim()
      return JSON.parse(clean)
    }
    return { content: textOut }
  }

  // ── Entrada unica: decide simulado vs real y mide latencia ────────────────
  async function run(task, input, history) {
    const start = performance.now()
    try {
      if (isReal.value) {
        if (!hasKey.value) throw new Error('Ingresa tu API key para usar el modo real.')
        const out = await callReal(task, input, history)
        lastLatency.value = Math.round(performance.now() - start)
        return out
      }
      // En simulado agregamos un retardo leve para que se sienta como una llamada real
      await new Promise(function (r) { setTimeout(r, 350 + Math.random() * 400) })
      const out = await simulate(task, input)
      lastLatency.value = Math.round(performance.now() - start)
      return out
    } catch (err) {
      lastLatency.value = Math.round(performance.now() - start)
      throw err
    }
  }

  return { mode, apiKey, isReal, hasKey, lastLatency, setMode, run }
}
