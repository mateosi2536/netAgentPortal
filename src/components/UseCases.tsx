import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

/* ============================================================
   VIEWERS — uno por caso. Cada uno es una mini-demo animada
   que se dispara al entrar al viewport (once: true).
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = (delay = 0.18) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.15 } },
})

/* ---------- WhatsApp chat primitives (recortes) ---------- */

type Bubble = {
  who: 'user' | 'agent'
  text: string
  time: string
  block?: boolean
  footer?: string
}

function ChatHeader({
  name,
  subtitle,
}: {
  name: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-border-soft bg-surface-2">
      <div className="w-7 h-7 rounded-full bg-phosphor/10 border border-phosphor/40 flex items-center justify-center font-mono text-[11px] text-phosphor">
        {name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-sans text-[12.5px] text-ink leading-none truncate">
          {name}
        </div>
        <div className="font-mono text-[9.5px] text-ink-faint mt-1 flex items-center gap-1.5">
          <span className="w-1 h-1 bg-phosphor rounded-full animate-pulse-dot" />
          {subtitle}
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ b }: { b: Bubble }) {
  const isUser = b.who === 'user'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[88%] min-w-0 px-3 py-2 ${
          isUser
            ? 'bg-[#1a4d3a] text-[#e8f5e9] rounded-2xl rounded-br-sm'
            : 'bg-surface-2 text-ink border border-border-soft rounded-2xl rounded-bl-sm'
        }`}
      >
        {b.block ? (
          <pre className="font-mono text-[10.5px] leading-[1.55] whitespace-pre overflow-x-auto text-ink">
            {b.text}
          </pre>
        ) : (
          <div className="font-sans text-[13px] leading-snug whitespace-pre-wrap break-words">
            {b.text}
          </div>
        )}
        {b.footer && (
          <div className="mt-1.5 pt-1.5 border-t border-border-soft font-mono text-[9.5px] text-ink-faint tracking-mid">
            {b.footer}
          </div>
        )}
        <div
          className={`mt-1 font-mono text-[9.5px] ${
            isUser ? 'text-[#8fc1a3]' : 'text-ink-faint'
          } text-right flex items-center justify-end gap-1`}
        >
          {b.time}
          {isUser && (
            <svg width="12" height="9" viewBox="0 0 14 10" fill="none">
              <path
                d="M1 5l3 3 4-6M6 8l3 0M8 5l3-3"
                stroke="#6ab7ff"
                strokeWidth="1"
              />
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TypingDots() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="flex justify-start"
    >
      <div className="bg-surface-2 border border-border-soft rounded-2xl rounded-bl-sm px-3 py-2.5 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ink-faint"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

type Item =
  | { kind: 'msg'; bubble: Bubble; dwell?: number }
  | { kind: 'typing'; dwell?: number }

function ChatFrame({
  header,
  items,
  hint,
}: {
  header: React.ReactNode
  items: Item[]
  hint?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    let i = 0
    const tick = () => {
      if (cancelled || i >= items.length) return
      setStep(i + 1)
      const dwell =
        items[i].dwell ?? (items[i].kind === 'typing' ? 950 : 850)
      i += 1
      setTimeout(tick, dwell)
    }
    const start = setTimeout(tick, 350)
    return () => {
      cancelled = true
      clearTimeout(start)
    }
  }, [inView, items])

  // Slice up to current step. Drop typing items that are no longer the last
  // visible item — that's what makes "escribiendo…" disappear when the next
  // message lands.
  const visible = items.slice(0, step).filter((item, idx, arr) => {
    if (item.kind !== 'typing') return true
    return idx === arr.length - 1
  })

  return (
    <div ref={ref} className="card tick-corner overflow-hidden">
      {header}
      <div
        className="bg-bg/80 px-3 py-4 space-y-2.5 min-h-[280px]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(159,239,0,0.04) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      >
        <AnimatePresence initial={false}>
          {visible.map((item, idx) =>
            item.kind === 'typing' ? (
              <TypingDots key={`typing-${idx}`} />
            ) : (
              <ChatBubble key={`msg-${idx}`} b={item.bubble} />
            )
          )}
        </AnimatePresence>
      </div>
      {hint && (
        <div className="px-3.5 py-2 border-t border-border-soft bg-surface-2 font-mono text-[10px] tracking-mid text-ink-faint flex items-center gap-2">
          <span className="text-phosphor">●</span> {hint}
        </div>
      )}
    </div>
  )
}

/* 01 — WhatsApp remoto: el admin desde la calle */
function ChatViewer() {
  const items: Item[] = [
    {
      kind: 'msg',
      bubble: { who: 'user', text: 'estado del puerto gpon0/1/3 ?', time: '22:47' },
    },
    { kind: 'typing', dwell: 1100 },
    {
      kind: 'msg',
      bubble: {
        who: 'agent',
        text:
          'OLT principal · gpon0/1/3\n\n· UP · 14 ONUs activas\n· RX prom: -23.8 dBm\n· sin alarmas',
        time: '22:47',
      },
      dwell: 1200,
    },
    {
      kind: 'msg',
      bubble: {
        who: 'user',
        text: 'reinicia la onu del cliente martínez plis',
        time: '22:48',
      },
    },
    { kind: 'typing', dwell: 900 },
    {
      kind: 'msg',
      bubble: {
        who: 'agent',
        text: 'Reiniciando ONU-087 (martínez)…\nlista en ~25s. Te aviso cuando vuelva.',
        time: '22:48',
      },
    },
  ]
  return (
    <ChatFrame
      header={<ChatHeader name="Andy" subtitle="en línea · agente de red" />}
      hint="desde el celular · sin VPN, sin SSH"
      items={items}
    />
  )
}

/* 02 — Monitoreo OLT con señal degradándose */
function SignalViewer() {
  const onus = [
    { id: 'ONU-019', dbm: '-21.4', stable: true },
    { id: 'ONU-024', dbm: '-22.8', stable: true },
    { id: 'ONU-042', dbm: '-29.1', stable: false }, // la que se degrada
    { id: 'ONU-051', dbm: '-23.0', stable: true },
  ]
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.12)}
      className="card tick-corner p-5 md:p-6 bg-surface/70 font-mono text-[11.5px]"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-soft">
        <span className="text-[10px] tracking-mid text-ink-faint uppercase">
          OLT · scan /15min
        </span>
        <span className="text-[10px] text-phosphor">live</span>
      </div>

      <div className="space-y-2.5">
        {onus.map((o) => (
          <motion.div
            key={o.id}
            variants={fadeUp}
            className="flex items-center gap-3"
          >
            <span className="text-ink-dim w-[68px] shrink-0">{o.id}</span>
            <div className="flex-1 h-1.5 bg-bg border border-border-soft relative overflow-hidden">
              {o.stable ? (
                <div
                  className="h-full bg-phosphor/70"
                  style={{ width: '78%' }}
                />
              ) : (
                <motion.div
                  className="h-full bg-phosphor/70"
                  initial={{ width: '78%' }}
                  whileInView={{
                    width: ['78%', '78%', '32%'],
                    backgroundColor: [
                      'rgba(159,239,0,0.7)',
                      'rgba(255,181,71,0.8)',
                      'rgba(255,77,77,0.85)',
                    ],
                  }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 2.6, delay: 1.2, ease: 'easeInOut' }}
                />
              )}
            </div>
            <span
              className={`w-[58px] text-right tabular-nums ${o.stable ? 'text-ink' : 'text-signal'
                }`}
            >
              {o.dbm}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 4.2, duration: 0.4 }}
        className="mt-5 pt-4 border-t border-border-soft flex items-center gap-2 text-signal"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-dot" />
        <span className="text-[10px] tracking-mid uppercase">[alert]</span>
        <span className="text-ink-dim">
          ONU-042 → señal{' '}
          <span className="text-signal">-29.1 dBm</span> · degradación
        </span>
      </motion.div>
    </motion.div>
  )
}

/* 03 — Provisioning ONU */
function ProvisionViewer() {
  const steps = [
    'detectar ONU · SN VSOLxx88a3',
    'asignar perfil · 100M residencial',
    'autorizar en OLT · slot 1/3/8',
    'configurar VLAN 200',
    'verificar enlace · RX -22.4 dBm',
  ]
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.42)}
      className="card tick-corner p-5 md:p-6 bg-surface/70 font-mono text-[12px]"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-soft">
        <span className="text-[10px] tracking-mid text-ink-faint uppercase">
          provision.run
        </span>
        <span className="text-[10px] text-ink-faint">técnico · campo</span>
      </div>

      <div className="space-y-2">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex items-center gap-3"
          >
            <span className="text-phosphor">▸</span>
            <span className="flex-1 text-ink-dim">{s}</span>
            <span className="text-[10px] tracking-mid text-phosphor">[ok]</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 2.6, duration: 0.4 }}
        className="mt-5 pt-4 border-t border-border-soft flex items-center justify-between"
      >
        <span className="text-ink">cliente activo</span>
        <span className="text-phosphor glow-phosphor text-[14px]">✓</span>
      </motion.div>
    </motion.div>
  )
}

/* 04 — Topología viva (SVG con paths animados) */
function TopologyViewer() {
  const drawTransition = (delay: number) => ({
    duration: 0.9,
    delay,
    ease: 'easeInOut',
  })
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="card tick-corner p-5 md:p-6 bg-surface/70 font-mono text-[11px]"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-soft">
        <span className="text-[10px] tracking-mid text-ink-faint uppercase">
          topology.db
        </span>
        <span className="text-[10px] text-phosphor">3 nodos · 4 enlaces</span>
      </div>

      <svg viewBox="0 0 320 180" className="w-full h-auto">
        {/* Lines */}
        <motion.line
          x1="60" y1="90" x2="160" y2="40"
          stroke="#9fef00" strokeOpacity="0.55" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={drawTransition(0.2)}
        />
        <motion.line
          x1="60" y1="90" x2="160" y2="90"
          stroke="#9fef00" strokeOpacity="0.55" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={drawTransition(0.4)}
        />
        <motion.line
          x1="60" y1="90" x2="160" y2="140"
          stroke="#9fef00" strokeOpacity="0.55" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={drawTransition(0.6)}
        />
        <motion.line
          x1="180" y1="90" x2="270" y2="90"
          stroke="#9fef00" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={drawTransition(1.2)}
        />

        {/* OLT */}
        <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
          <rect x="20" y="78" width="44" height="24" fill="#101217" stroke="#9fef00" />
          <text x="42" y="94" textAnchor="middle" fill="#e8eaed" fontSize="9" fontFamily="JetBrains Mono">OLT</text>
        </motion.g>

        {/* Splitters / nodos */}
        {[40, 90, 140].map((y, i) => (
          <motion.g
            key={y}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 1.0 + i * 0.12, duration: 0.3 }}
          >
            <circle cx="170" cy={y} r="6" fill="#0a0b0d" stroke="#9fef00" />
            <circle cx="170" cy={y} r="2" fill="#9fef00" />
          </motion.g>
        ))}

        {/* Endpoint cliente */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 2.0 }}
        >
          <rect x="266" y="80" width="48" height="20" fill="#101217" stroke="#54585f" />
          <text x="290" y="93" textAnchor="middle" fill="#8b8f98" fontSize="8" fontFamily="JetBrains Mono">NODO 5</text>
        </motion.g>

        {/* Pulse en el camino consultado */}
        <motion.circle
          cx="170" cy="90" r="3" fill="#9fef00"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: [0, 1, 0],
            cx: [60, 170, 270],
          }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 2.4, duration: 1.6, ease: 'easeInOut' }}
        />
      </svg>

      <div className="mt-3 pt-3 border-t border-border-soft text-ink-dim">
        <span className="text-phosphor">›</span> ¿a qué puerto llega el Nodo 5?{' '}
        <span className="text-ink">→ OLT/1/2 · splitter B</span>
      </div>
    </motion.div>
  )
}

/* 05 — Q&A técnico onboarding (recorte de chat) */
function QAViewer() {
  const items: Item[] = [
    {
      kind: 'msg',
      bubble: { who: 'user', text: 'cuál es la ip del bridge en el nodo 5?', time: '09:12' },
    },
    { kind: 'typing', dwell: 850 },
    {
      kind: 'msg',
      bubble: {
        who: 'agent',
        text: 'bridge · 10.10.5.1/24',
        footer: 'workspace/topology/nodo-5.md · línea 14',
        time: '09:12',
      },
      dwell: 1100,
    },
    {
      kind: 'msg',
      bubble: {
        who: 'user',
        text: 'y la pass del mikrotik del sector norte?',
        time: '09:13',
      },
    },
    { kind: 'typing', dwell: 1000 },
    {
      kind: 'msg',
      bubble: {
        who: 'agent',
        text: 'Te la mando por mensaje privado en 5s — no la pongo en el grupo.',
        time: '09:13',
      },
    },
  ]
  return (
    <ChatFrame
      header={<ChatHeader name="Andy" subtitle="grupo · técnicos campo" />}
      hint="técnico nuevo · sin interrumpir al senior"
      items={items}
    />
  )
}

/* 06 — Cron / set-and-forget */
function CronViewer() {
  const events = [
    { t: '03:00', msg: 'backup mikrotik-core', ok: true },
    { t: '03:15', msg: 'backup mikrotik-core', ok: true },
    { t: '03:30', msg: 'backup mikrotik-core', ok: true },
    { t: '03:45', msg: 'backup mikrotik-core', ok: true },
  ]
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger(0.32)}
      className="card tick-corner p-5 md:p-6 bg-surface/70 font-mono text-[12px]"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-soft">
        <span className="text-[10px] tracking-mid text-ink-faint uppercase">
          cron · workspace
        </span>
        <span className="text-[10px] text-phosphor tabular-nums">
          */15 * * * *
        </span>
      </div>

      <div className="space-y-1.5">
        {events.map((e, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="grid grid-cols-[58px_1fr_auto] items-center gap-3 text-ink-dim"
          >
            <span className="text-ink-faint tabular-nums">[{e.t}]</span>
            <span className="truncate">{e.msg}</span>
            <span className="text-phosphor">✓</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        className="mt-4 pt-3 border-t border-border-soft text-[10.5px] text-ink-faint tracking-mid"
      >
        próxima corrida en 12 min · sin intervención
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   CASOS — orden priorizado (de visceral a estratégico)
   ============================================================ */

type Case = {
  num: string
  tag: string
  title: React.ReactNode
  body: string
  Viewer: React.FC
}

const cases: Case[] = [
  {
    num: '01',
    tag: 'En campo · WhatsApp',
    title: (
      <>
        Estás en la calle.{' '}
        <span className="italic font-display text-ink-dim">
          La red, en tu bolsillo.
        </span>
      </>
    ),
    body:
      'Un cliente reporta caída y tú no estás frente a la laptop. Abres WhatsApp y le pides al agente el estado del puerto. Sin VPN, sin SSH, sin abrir la consola en un celular de 5 pulgadas. Hablas, te responde.',
    Viewer: ChatViewer,
  },
  {
    num: '02',
    tag: 'Monitoreo proactivo',
    title: (
      <>
        La OLT te avisa{' '}
        <span className="italic font-display text-ink-dim">primero.</span>
      </>
    ),
    body:
      'Cientos de ONUs en GPON, cada una con su señal RX. El agente recorre la OLT en intervalos, compara contra el histórico y solo te interrumpe cuando algo se está degradando. Llegas a la falla antes de que el cliente marque.',
    Viewer: SignalViewer,
  },
  {
    num: '03',
    tag: 'Provisioning · ONU',
    title: (
      <>
        El técnico activa,{' '}
        <span className="italic font-display text-ink-dim">
          tú no eres cuello de botella.
        </span>
      </>
    ),
    body:
      'Antes: el técnico termina de instalar y espera a que un admin senior registre la ONU en la OLT. Ahora: el técnico le pide al agente, que registra, autoriza, asigna VLAN y verifica enlace. La instalación se cierra en campo.',
    Viewer: ProvisionViewer,
  },
  {
    num: '04',
    tag: 'Topología',
    title: (
      <>
        Tu Excel de la red,{' '}
        <span className="italic font-display text-ink-dim">pero vivo.</span>
      </>
    ),
    body:
      '¿Qué equipo está conectado a qué puerto? ¿Qué equipos hay en este nodo? El agente lee la topología del workspace y responde al instante. La hoja desactualizada deja de ser la fuente de la verdad.',
    Viewer: TopologyViewer,
  },
  {
    num: '05',
    tag: 'Onboarding técnico',
    title: (
      <>
        El técnico nuevo{' '}
        <span className="italic font-display text-ink-dim">
          deja de interrumpirte.
        </span>
      </>
    ),
    body:
      'IPs de bridges, contraseñas, parámetros de configuración, qué cliente usa qué perfil. Lo que antes era una llamada al admin senior, ahora es una pregunta al agente — con la fuente citada del workspace para que el técnico aprenda al mismo tiempo.',
    Viewer: QAViewer,
  },
  {
    num: '06',
    tag: 'Set & forget',
    title: (
      <>
        Lo programas una vez.{' '}
        <span className="italic font-display text-ink-dim">
          Corre solo, te avisa si falla.
        </span>
      </>
    ),
    body:
      'Respaldos de MikroTik, verificaciones de ruteo, limpiezas, reportes diarios. Tareas autónomas que se ejecutan por intervalo o cron — el agente las corre en silencio y solo te toca el hombro cuando algo se sale del patrón.',
    Viewer: CronViewer,
  },
]

/* ============================================================
   ROW + SECTION
   ============================================================ */

function CaseRow({ c, index }: { c: Case; index: number }) {
  const reverse = index % 2 === 1
  const Viewer = c.Viewer
  return (
    <div
      className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-center py-16 md:py-20 ${index > 0 ? 'border-t border-dashed border-border-soft' : ''
        }`}
    >
      {/* Viewer */}
      <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
        <Viewer />
      </div>

      {/* Copy */}
      <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="space-y-5 relative"
        >
          {/* Big ghost number */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -top-10 -left-2 font-display text-[120px] leading-none text-ink/[0.04]"
          >
            {c.num}
          </span>

          <div className="relative flex items-center gap-3">
            <span className="font-mono text-[11px] text-phosphor tracking-mid">
              [{c.num}]
            </span>
            <span className="rule-dash w-10" />
            <span className="eyebrow">{c.tag}</span>
          </div>

          <h3 className="relative font-display text-display-md text-ink text-balance">
            {c.title}
          </h3>

          <p className="relative font-sans text-[15.5px] leading-relaxed text-ink-dim text-pretty max-w-xl">
            {c.body}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="relative py-24 md:py-32 border-t border-border-soft overflow-hidden"
    >
      <div className="container-pg relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-6">
          <SectionHeader
            index="03"
            label="Casos · operación real"
            title={
              <>
                Lo que pasa cuando el agente{' '}
                <span className="italic font-display text-ink-dim">
                  ya está corriendo.
                </span>
              </>
            }
            lede="No funcionalidades sueltas. Escenarios concretos del día a día de un ISP — recogidos del campo, resueltos con una conversación."
          />
          <div className="font-mono text-[11px] tracking-mid text-ink-faint shrink-0">
            06 / ESCENARIOS · TIEMPO REAL
          </div>
        </div>

        <div className="mt-8">
          {cases.map((c, i) => (
            <CaseRow key={c.num} c={c} index={i} />
          ))}
        </div>

        {/* Cierre editorial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 pt-10 border-t border-border-soft max-w-3xl"
        >
          <div className="mono-label mb-4">[ NOTA / OPERACIÓN ]</div>
          <p className="font-display text-[22px] md:text-[26px] leading-snug text-ink text-balance">
            Cada caso de arriba empezó como un mensaje de WhatsApp a las 2am.
            El agente convierte ese{' '}
            <span className="italic text-phosphor">turno nocturno repetido</span>{' '}
            en una rutina silenciosa.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
