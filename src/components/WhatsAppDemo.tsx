import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

type Msg = {
  who: 'user' | 'agent'
  text: string
  time: string
  attachments?: string[]
}

const convo: Msg[] = [
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
  {
    who: 'agent',
    text: '[tx-rx-core01_last-1h.png · 94 KB]',
    time: '19:43',
    attachments: ['graph'],
  },
  { who: 'user', text: 'ok. y la olt principal?', time: '19:44' },
  {
    who: 'agent',
    text:
      'OLT-01 (192.168.10.2) responde. Corriendo signal_report…\n\n3 ONUs con RX < -26 dBm:\n  · onu_312  → -28.1 dBm\n  · onu_507  → -29.3 dBm  (offline 6h)\n  · onu_618  → -30.8 dBm  (offline 6h)\n\n¿Abro ticket o dejo en observación?',
    time: '19:44',
  },
]

const terminal = [
  { t: '→', lvl: 'inbound', text: 'técnico · single agent · nueva sesión' },
  { t: '→', lvl: 'router', text: 'parse → "el nodo central no responde" · intent=diagnose_host' },
  { t: '→', lvl: 'tool', text: 'bash(ping -c 3 10.0.0.5)' },
  { t: '→', lvl: 'stdout', text: '3 packets transmitted, 0 received, 100% loss', accent: 'signal' },
  { t: '→', lvl: 'tool', text: 'ssh(10.0.0.4) → /system identity print' },
  { t: '→', lvl: 'stdout', text: 'name: CORE-01', accent: 'phosphor' },
  { t: '→', lvl: 'tool', text: 'ssh(10.0.0.4) → /interface monitor-traffic ether2 once' },
  { t: '→', lvl: 'stdout', text: 'rx: 0 bps · tx: 0 bps · last-link-up: -2min', accent: 'amber' },
  { t: '→', lvl: 'tool', text: 'python(mikrotik_get_graphs.py --host 10.0.0.4 --iface ether2 --last 1h)' },
  { t: '→', lvl: 'stdout', text: 'saved: /workspace/data/graphs/core-01-ether2.png' },
  { t: '→', lvl: 'reply', text: 'enviando 3 msg + 1 adjunto → whatsapp' },
  { t: '→', lvl: 'ok', text: 'sesión en espera', accent: 'phosphor' },
]

export default function WhatsAppDemo() {
  return (
    <section id="demo" className="relative py-24 md:py-32 border-t border-border-soft">
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
              Esto es lo que pasa en una caída real. A la izquierda, lo que ve el
              técnico en WhatsApp. A la derecha, lo que hace el agente por debajo —
              SSH, scripts, reportes. Sin magia, sin promesas vagas.
            </>
          }
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-8 lg:gap-6 items-start">
          {/* WhatsApp pane */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
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
                <div className="font-mono text-[10px] text-ink-faint tracking-mid">
                  demo
                </div>
              </div>

              {/* Messages */}
              <div className="px-5 py-6 bg-bg/80 space-y-3 max-h-[540px] overflow-y-auto">
                {convo.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className={`flex ${m.who === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 font-sans text-[14px] leading-snug whitespace-pre-wrap ${
                        m.who === 'user'
                          ? 'bg-[#1a4d3a] text-[#e8f5e9] rounded-2xl rounded-br-sm'
                          : 'bg-surface-2 text-ink border border-border-soft rounded-2xl rounded-bl-sm'
                      }`}
                    >
                      {m.attachments?.includes('graph') ? (
                        <GraphAttachment />
                      ) : (
                        m.text
                      )}
                      <div
                        className={`mt-1 font-mono text-[10px] ${
                          m.who === 'user' ? 'text-[#8fc1a3]' : 'text-ink-faint'
                        } text-right flex items-center justify-end gap-1`}
                      >
                        {m.time}
                        {m.who === 'user' && (
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1 5l3 3 4-6M6 8l3 0M8 5l3-3" stroke="#6ab7ff" strokeWidth="1" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
          </motion.div>

          {/* Terminal mirror pane */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="mono-label mb-3 flex items-center gap-2">
              <span className="text-phosphor">▸</span> AGENTE / POR DEBAJO
            </div>
            <div className="card tick-corner ring-phosphor bg-bg/90">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
                <div className="font-mono text-[11px] text-ink-dim">
                  <span className="text-phosphor">●</span> agent.log
                </div>
                <div className="font-mono text-[10px] text-ink-faint tracking-mid">
                  tail -f
                </div>
              </div>
              <div className="p-5 font-mono text-[11.5px] leading-[1.75] space-y-0.5 overflow-x-auto">
                {terminal.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                    className="flex items-start gap-3 whitespace-nowrap"
                  >
                    <span className="text-ink-faint shrink-0">{l.t}</span>
                    <span className="text-ink-dim shrink-0 w-[58px] uppercase tracking-mid text-[10px] pt-0.5">
                      {l.lvl}
                    </span>
                    <span
                      className={
                        l.accent === 'signal'
                          ? 'text-signal'
                          : l.accent === 'phosphor'
                          ? 'text-phosphor'
                          : l.accent === 'amber'
                          ? 'text-amber'
                          : 'text-ink'
                      }
                    >
                      {l.text}
                    </span>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-phosphor">&gt;</span>
                  <span className="w-2 h-4 bg-phosphor/80 animate-blink" />
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-2 border-t border-border-soft font-mono text-[10px] tracking-mid text-ink-faint">
                <span>bash · ssh · python</span>
                <span>sandbox · sin errores</span>
              </div>
            </div>
            <div className="mt-4 font-mono text-[11px] text-ink-faint leading-relaxed">
              <span className="text-phosphor">*</span> Todos los comandos se ejecutan
              dentro de un contenedor Docker aislado. La app nunca toca tu host
              directamente. El workspace — carpetas y archivos — es legible por ti
              y por la IA al mismo tiempo.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function GraphAttachment() {
  // Fake network graph — drawn in SVG
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
          {/* grid */}
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
          {/* area */}
          <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#g1)" />
          <path d={d} fill="none" stroke="#9fef00" strokeWidth="1.4" />
          {/* drop marker */}
          <line x1={step * 20} x2={step * 20} y1="0" y2={h} stroke="#ff4d4d" strokeDasharray="2 2" />
          <text x={step * 20 + 4} y="14" fill="#ff4d4d" fontSize="9" fontFamily="JetBrains Mono">
            ↓ caída
          </text>
        </svg>
      </div>
      <div className="mt-2 font-mono text-[10.5px] text-ink-faint">
        tx-rx-core01_last-1h.png · 94 KB
      </div>
    </div>
  )
}
