import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

type Msg = {
  who: 'user' | 'agent'
  text: string
  time: string
  /** Optional: render as formatted monospace block (like WhatsApp triple-backtick). */
  block?: boolean
  /** Optional: render the in-chat graph attachment instead of text. */
  attachment?: 'graph'
}

const convo: Msg[] = [
  // ── Escena 1 · diagnóstico de nodo caído ──
  { who: 'user', text: 'el nodo central no responde', time: '19:42' },
  { who: 'agent', text: 'Revisando. Haciendo ping a 10.0.0.5…', time: '19:42' },
  {
    who: 'agent',
    text: 'Sin respuesta ICMP (3/3 loss). Probando SSH al router vecino CORE-01…',
    time: '19:42',
  },
  {
    who: 'agent',
    text:
      'Confirmado: nodo central caído desde 19:42 (hace ~2 min). Último uptime 2d 14h.\n\nCORE-01 responde ok. El tráfico en ether2 se cortó en seco — parece pérdida de energía en el POP, no falla de enlace.\n\nTe paso el gráfico de la última hora 👇',
    time: '19:43',
  },
  { who: 'agent', text: 'tx-rx-core01_last-1h.png', time: '19:43', attachment: 'graph' },

  // ── Escena 2 · revisión OLT ──
  { who: 'user', text: 'ok. y la olt principal?', time: '19:44' },
  {
    who: 'agent',
    text:
      'OLT-01 (192.168.10.2) responde. Corriendo signal_report…\n\n3 ONUs con RX < -26 dBm:\n  · onu_312  → -28.1 dBm\n  · onu_507  → -29.3 dBm  (offline 6h)\n  · onu_618  → -30.8 dBm  (offline 6h)\n\n¿Abro ticket o dejo en observación?',
    time: '19:44',
  },

  // ── Escena 3 · análisis de toda la red ──
  {
    who: 'user',
    text: 'dame un análisis del estado de todos los nodos de la red',
    time: '19:46',
  },
  {
    who: 'agent',
    text: 'Recorriendo topologia.json — 12 equipos registrados. Ping + SSH en paralelo…',
    time: '19:46',
  },
  {
    who: 'agent',
    block: true,
    text:
      'ANÁLISIS DE TOPOLOGÍA · 12 equipos · 38s\n\n✓  10 saludables\n⚠   1 alerta\n✗   1 caído\n\nCORE-01       ok    14d    cpu 18%\nCORE-02       ok    42d    cpu 12%\nNODO-NORTE    ok     8d    cpu 22%\nNODO-SUR      ok    21d    cpu 15%\nNODO-ESTE     ok     6d    cpu 19%\nNODO-OESTE    ⚠      3d    cpu 87%  ← revisar\nNODO-CENTRO   ✗     caído desde 19:42\nOLT-01        ok    89d    cpu 31%\nOLT-02        ok    45d    cpu 24%\nSW-CORE-A     ok   120d    cpu  8%\nSW-CORE-B     ok   120d    cpu  9%\nAP-TORRE-3    ok    11d    cpu 14%',
    time: '19:47',
  },
  {
    who: 'agent',
    text:
      'Reporte completo guardado en\nworkspace/data/reports/health_today.md\n\nResumen: la red está operativa salvo el nodo central. NODO-OESTE está al 87% de CPU — probablemente se está comiendo queues, vale la pena revisar antes que se convierta en incidencia.',
    time: '19:47',
  },

  // ── Escena 4 · automatización diaria ──
  {
    who: 'user',
    text: 'perfecto. quiero recibir este mismo reporte todos los días a las 8am',
    time: '19:48',
  },
  { who: 'agent', text: 'Entendido. Creando tarea programada…', time: '19:48' },
  {
    who: 'agent',
    block: true,
    text:
      'schedule: daily-health\ncron:     "0 8 * * *"\ntz:       America/Mexico_City\naction:   network_health_report\nsend_to:  este chat',
    time: '19:48',
  },
  {
    who: 'agent',
    text:
      'Listo. Guardado en\nworkspace/.agent/schedules/daily-health.yml\n\nCorre cada día a las 08:00 y te llega el reporte por este mismo chat. Para pausarla dime "pausa el reporte diario" o edita el YAML directo. La próxima corrida es mañana 08:00.',
    time: '19:48',
  },
]

type LogLine = {
  tag: string
  text: string
  accent?: 'phosphor' | 'signal' | 'amber'
}

const terminal: LogLine[] = [
  // Sesión A · diagnóstico
  { tag: 'inbound', text: 'técnico → agent · nueva sesión' },
  { tag: 'router', text: 'parse → "el nodo central no responde"' },
  { tag: 'tool', text: 'bash(ping -c 3 10.0.0.5)' },
  { tag: 'stdout', text: '3 packets transmitted, 0 received', accent: 'signal' },
  { tag: 'tool', text: 'ssh(10.0.0.4) → /interface monitor-traffic ether2' },
  { tag: 'stdout', text: 'rx 0 bps · tx 0 bps · link down', accent: 'amber' },
  { tag: 'tool', text: 'python(mikrotik_get_graphs.py --iface ether2)' },
  { tag: 'stdout', text: 'saved: core-01-ether2.png', accent: 'phosphor' },
  { tag: 'reply', text: '3 msg + 1 adjunto → whatsapp' },

  // Sesión B · OLT
  { tag: 'inbound', text: 'técnico → agent' },
  { tag: 'router', text: 'parse → "y la olt principal?"' },
  { tag: 'tool', text: 'python(vsol_olt_signal_report.py --host 192.168.10.2)' },
  { tag: 'stdout', text: 'scan · 128 onus · 3 bajo umbral -26dBm', accent: 'amber' },
  { tag: 'reply', text: 'resumen → whatsapp' },

  // Sesión C · análisis red completa
  { tag: 'inbound', text: 'técnico → agent' },
  { tag: 'router', text: 'parse → "estado de todos los nodos"' },
  { tag: 'tool', text: 'read(workspace/data/topologia.json)' },
  { tag: 'stdout', text: '12 equipos · 8 mikrotik · 2 olts · 2 switches', accent: 'phosphor' },
  { tag: 'tool', text: 'bash(fping -a -g · paralelo)' },
  { tag: 'stdout', text: '11/12 reachable · 1 down', accent: 'amber' },
  { tag: 'tool', text: 'ssh(×11) → /system resource · parallel' },
  { tag: 'stdout', text: 'NODO-OESTE cpu=87% ← alerta', accent: 'amber' },
  { tag: 'tool', text: 'write(workspace/data/reports/health_today.md)' },
  { tag: 'reply', text: 'tabla + resumen → whatsapp' },

  // Sesión D · programar
  { tag: 'inbound', text: 'técnico → agent' },
  { tag: 'router', text: 'parse → "reporte diario 8am"' },
  { tag: 'tool', text: 'write(.agent/schedules/daily-health.yml)' },
  { tag: 'stdout', text: 'cron "0 8 * * *" · registrada', accent: 'phosphor' },
  { tag: 'reply', text: 'confirmación → whatsapp' },
  { tag: 'ok', text: 'próxima ejecución: mañana 08:00', accent: 'phosphor' },
]

export default function WhatsAppDemo() {
  return (
    <section id="demo" className="relative py-24 md:py-32 border-t border-border-soft overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-lines pointer-events-none opacity-60"
        style={{ backgroundSize: '56px 56px' }}
      />
      <div className="container-pg relative">
        <SectionHeader
          index="02"
          label="Demo / conversación real"
          title={
            <>
              Lenguaje natural entra. <br />
              <span className="italic font-display text-ink-dim">Comandos reales salen.</span>
            </>
          }
          lede={
            <>
              Un día cualquiera: un nodo se cae, se revisa la OLT, se pide un análisis
              de toda la red y se programa un reporte diario. A la izquierda lo que
              ve el técnico. A la derecha lo que hace el agente por debajo.
            </>
          }
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-8 lg:gap-6 items-start">
          <ChatPane />
          <TerminalPane />
        </div>
      </div>
    </section>
  )
}

function ChatPane() {
  // Duplicate the conversation so translateY -50% loops seamlessly.
  const loop = [...convo, ...convo]

  return (
    <div className="relative">
      <div className="mono-label mb-3 flex items-center gap-2">
        <span className="text-wapp">●</span> WHATSAPP / TÉCNICO EN TERRENO
      </div>
      <div className="card tick-corner">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-soft bg-surface-2">
          <div className="w-9 h-9 rounded-full bg-phosphor/10 border border-phosphor/40 flex items-center justify-center font-mono text-[13px] text-phosphor">
            A
          </div>
          <div className="flex-1">
            <div className="font-sans text-[14px] text-ink leading-none">Andy</div>
            <div className="font-mono text-[10.5px] text-ink-faint mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse-dot" />
              en línea · agente de red
            </div>
          </div>
          <div className="font-mono text-[10px] text-ink-faint tracking-mid">demo</div>
        </div>

        {/* Auto-scrolling messages area */}
        <div className="relative bg-bg/80 overflow-hidden h-[440px] sm:h-[500px] md:h-[560px]">
          {/* top fade */}
          <div className="absolute inset-x-0 top-0 h-14 sm:h-20 bg-gradient-to-b from-bg via-bg/90 to-transparent z-10 pointer-events-none" />
          {/* bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-14 sm:h-20 bg-gradient-to-t from-bg via-bg/90 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="px-3 sm:px-5"
            animate={{ y: ['0%', '-50%'] }}
            transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
          >
            {loop.map((m, i) => (
              <div key={i} className="mb-3">
                <MessageBubble msg={m} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Input stub */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-border-soft bg-surface-2">
          <div className="flex-1 bg-bg border border-border-soft px-3 py-2 font-sans text-[13px] text-ink-faint">
            Escribir un mensaje…
          </div>
          <div className="w-9 h-9 bg-wapp/90 rounded-full flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7l12-6-5 12-2-5-5-1z" fill="#0a0b0d" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function TerminalPane() {
  const loop = [...terminal, ...terminal]

  return (
    <div className="relative">
      <div className="mono-label mb-3 flex items-center gap-2">
        <span className="text-phosphor">▸</span> AGENTE / POR DEBAJO
      </div>
      <div className="card tick-corner ring-phosphor bg-bg/90">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
          <div className="font-mono text-[11px] text-ink-dim">
            <span className="text-phosphor">●</span> agent.log
          </div>
          <div className="font-mono text-[10px] text-ink-faint tracking-mid">tail -f</div>
        </div>

        <div className="relative overflow-hidden h-[380px] sm:h-[430px] md:h-[486px]">
          <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-bg via-bg/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-bg via-bg/90 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="px-3 sm:px-5 font-mono text-[10.5px] sm:text-[11.5px] leading-[1.65] sm:leading-[1.75]"
            animate={{ y: ['0%', '-50%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {loop.map((l, i) => (
              <div
                key={i}
                className="flex items-start gap-2 sm:gap-3 mb-[3px] sm:mb-[2px]"
              >
                <span className="text-phosphor shrink-0">→</span>
                <span className="text-ink-dim shrink-0 w-[46px] sm:w-[58px] uppercase tracking-mid text-[9px] sm:text-[10px] pt-0.5">
                  {l.tag}
                </span>
                <span
                  className={`break-words min-w-0 ${
                    l.accent === 'signal'
                      ? 'text-signal'
                      : l.accent === 'phosphor'
                      ? 'text-phosphor'
                      : l.accent === 'amber'
                      ? 'text-amber'
                      : 'text-ink'
                  }`}
                >
                  {l.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-border-soft font-mono text-[10px] tracking-mid text-ink-faint">
          <span>bash · ssh · python · schedule</span>
          <span>sandbox · sin errores</span>
        </div>
      </div>

      <div className="mt-4 font-mono text-[11px] text-ink-faint leading-relaxed">
        <span className="text-phosphor">*</span> Todos los comandos se ejecutan dentro de
        un contenedor Docker aislado. El workspace — carpetas y archivos — es legible
        por ti y por la IA al mismo tiempo.
      </div>
    </div>
  )
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.who === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${
          msg.block ? 'max-w-full sm:max-w-[92%]' : 'max-w-[94%] sm:max-w-[92%]'
        } min-w-0 px-3 sm:px-3.5 py-2 sm:py-2.5 ${
          isUser
            ? 'bg-[#1a4d3a] text-[#e8f5e9] rounded-2xl rounded-br-sm'
            : 'bg-surface-2 text-ink border border-border-soft rounded-2xl rounded-bl-sm'
        }`}
      >
        {msg.attachment === 'graph' ? (
          <GraphAttachment filename={msg.text} />
        ) : msg.block ? (
          <pre className="font-mono text-[9px] sm:text-[10.5px] leading-[1.5] sm:leading-[1.55] whitespace-pre overflow-x-auto text-ink max-w-full">
            {msg.text}
          </pre>
        ) : (
          <div className="font-sans text-[13px] sm:text-[14px] leading-snug whitespace-pre-wrap break-words">
            {msg.text}
          </div>
        )}
        <div
          className={`mt-1 font-mono text-[10px] ${
            isUser ? 'text-[#8fc1a3]' : 'text-ink-faint'
          } text-right flex items-center justify-end gap-1`}
        >
          {msg.time}
          {isUser && (
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5l3 3 4-6M6 8l3 0M8 5l3-3" stroke="#6ab7ff" strokeWidth="1" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

function GraphAttachment({ filename }: { filename: string }) {
  const points = [8, 12, 10, 14, 11, 13, 16, 18, 22, 28, 35, 42, 48, 54, 60, 64, 62, 58, 46, 20, 4, 2, 2, 2]
  const max = Math.max(...points)
  const w = 280
  const h = 90
  const step = w / (points.length - 1)
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * (h - 8) - 2}`)
    .join(' ')

  return (
    <div className="min-w-[260px]">
      <div className="bg-bg border border-border-soft p-3">
        <div className="flex items-center justify-between mb-2 font-mono text-[10px] tracking-mid text-ink-faint">
          <span>tx/rx · ether2 · CORE-01</span>
          <span>1h</span>
        </div>
        <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="block">
          <defs>
            <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#9fef00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9fef00" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              x2={w}
              y1={(h / 3) * i}
              y2={(h / 3) * i}
              stroke="#1e2230"
              strokeDasharray="2 3"
            />
          ))}
          <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#g1)" />
          <path d={d} fill="none" stroke="#9fef00" strokeWidth="1.4" />
          <line x1={step * 20} x2={step * 20} y1="0" y2={h} stroke="#ff4d4d" strokeDasharray="2 2" />
          <text x={step * 20 + 4} y="14" fill="#ff4d4d" fontSize="9" fontFamily="JetBrains Mono">
            ↓ caída
          </text>
        </svg>
      </div>
      <div className="mt-2 font-mono text-[10.5px] text-ink-faint">
        {filename} · 94 KB
      </div>
    </div>
  )
}
