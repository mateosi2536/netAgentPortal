import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const prompts = [
  '"el nodo central no responde"',
  '"sube el plan del cliente 507 a 100m"',
  '"qué onus de la olt principal tienen señal baja"',
  '"reinicia el radio del sector norte"',
  '"reporte de tráfico del core · 2h"',
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const target = prompts[idx]
    let i = 0
    setTyped('')
    const t = setInterval(() => {
      i++
      setTyped(target.slice(0, i))
      if (i >= target.length) {
        clearInterval(t)
        setTimeout(() => setIdx((v) => (v + 1) % prompts.length), 2400)
      }
    }, 55)
    return () => clearInterval(t)
  }, [idx])

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 bg-grid-lines pointer-events-none"
        style={{ backgroundSize: '56px 56px' }}
      />
      {/* Radial light behind headline */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(159,239,0,0.08) 0%, rgba(159,239,0,0.03) 30%, transparent 60%)',
        }}
      />

      <div className="container-pg relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — headline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="eyebrow mb-6 flex items-center gap-2"
            >
              <span className="text-phosphor">◆</span>
              AGENTE DE RED / ISPs · WISPs
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-display-xl text-ink leading-[0.95] tracking-tight text-balance"
            >
              Tu red responde
              <br />
              por <span className="italic text-phosphor glow-phosphor">WhatsApp</span>
              <span className="text-phosphor animate-blink">_</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 max-w-xl font-sans text-[18px] leading-relaxed text-ink-dim text-pretty"
            >
              Pleno Agent convierte cualquier chat en{' '}
              <span className="text-ink font-medium">terminal de MikroTik</span>.
              El técnico escribe en lenguaje natural, el agente hace SSH real,
              diagnostica y responde con datos. Sin abrir una ventana negra,
              sin VPN, sin esperas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href="#pricing" className="btn-primary">
                Comprar licencia
                <span>→</span>
              </a>
              <a href="#demo" className="btn-ghost">
                Ver demo en vivo
              </a>
              <span className="ml-1 font-mono text-[11px] text-ink-faint">
                14 días de garantía
              </span>
            </motion.div>

            {/* Capabilities strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-16 pt-6 border-t border-border-soft"
            >
              <div className="mono-label mb-4">CAPACIDADES / ESTABLES</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 font-mono text-[12px] text-ink-dim">
                <Cap label="SSH" sub="MikroTik RouterOS" />
                <Cap label="GPON" sub="V-Sol · ZTE · Huawei" />
                <Cap label="Docker" sub="sandbox aislado" />
                <Cap label="Scripts" sub="Python listos" />
              </div>
            </motion.div>
          </div>

          {/* Right — live prompt card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="tick-corner card p-0">
              {/* Chrome */}
              <div className="flex items-center justify-between border-b border-border-soft px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-signal/70" />
                  <span className="w-2 h-2 rounded-full bg-amber/70" />
                  <span className="w-2 h-2 rounded-full bg-phosphor/80" />
                </div>
                <div className="font-mono text-[10px] tracking-mid text-ink-faint">
                  whatsapp ➝ agent
                </div>
                <div className="font-mono text-[10px] text-ink-faint">demo</div>
              </div>

              {/* Incoming message */}
              <div className="px-6 py-7 bg-surface">
                <div className="mono-label mb-2">TÉCNICO</div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-phosphor">&gt;</span>
                  <span className="font-mono text-[15px] text-ink">
                    {typed}
                    <span className="inline-block w-2 h-4 bg-phosphor ml-0.5 align-middle animate-blink" />
                  </span>
                </div>
              </div>

              {/* Execution feed */}
              <div className="border-t border-border-soft bg-bg/60 p-5 space-y-1.5 font-mono text-[11.5px]">
                <FeedLine t="→" tag="inbound" text="técnico → single agent" />
                <FeedLine t="→" tag="tool" text="bash(ping -c 3 10.0.0.5)" />
                <FeedLine
                  t="→"
                  tag="stdout"
                  text="3 packets transmitted, 0 received"
                  accent="signal"
                />
                <FeedLine t="→" tag="tool" text="ssh(10.0.0.4, /system resource)" />
                <FeedLine
                  t="→"
                  tag="stdout"
                  text="uptime: 14d 03h · cpu: 12%"
                  accent="phosphor"
                />
                <FeedLine t="→" tag="reply" text="mensaje + gráfico → whatsapp" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee of example commands */}
      <div className="relative mt-24 overflow-hidden border-y border-border-soft py-3 bg-surface/40">
        <div className="flex animate-marquee whitespace-nowrap gap-12 font-mono text-[11px] tracking-mid text-ink-dim">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12">
              {[
                '/interface print',
                '/system reboot',
                '/ip address print',
                '/queue simple add',
                '/ppp active print',
                '/tool bandwidth-test',
                '/ip dhcp-server lease print',
                '/interface wireless scan',
                'ping 8.8.8.8 count=5',
                '/log print where topics~"error"',
                '/system resource print',
                '/certificate print',
              ].map((cmd) => (
                <span key={cmd + k} className="flex items-center gap-3">
                  <span className="text-phosphor">$</span>
                  {cmd}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cap({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-ink text-[13px] tracking-mid">{label}</span>
      <span className="text-ink-faint text-[11px]">{sub}</span>
    </div>
  )
}

function FeedLine({
  t,
  tag,
  text,
  accent,
}: {
  t: string
  tag: string
  text: string
  accent?: 'phosphor' | 'signal' | 'amber'
}) {
  const accentCls =
    accent === 'phosphor'
      ? 'text-phosphor'
      : accent === 'signal'
      ? 'text-signal'
      : accent === 'amber'
      ? 'text-amber'
      : 'text-ink'
  return (
    <div className="flex items-start gap-3 leading-[1.55]">
      <span className="text-ink-faint shrink-0">{t}</span>
      <span className="text-ink-dim shrink-0 w-14 uppercase tracking-mid text-[10px] pt-0.5">
        {tag}
      </span>
      <span className={accentCls}>{text}</span>
    </div>
  )
}
