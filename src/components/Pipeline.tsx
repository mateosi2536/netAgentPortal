import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

type Stage = {
  id: string
  num: string
  title: string
  sub: string
  tech: string
  desc: string
}

const stages: Stage[] = [
  {
    id: 'whatsapp',
    num: '01',
    title: 'WhatsApp',
    sub: 'canal / entrada',
    tech: 'Baileys',
    desc:
      'El técnico escribe al agente como a cualquier compañero. DMs directos o grupos registrados con mención.',
  },
  {
    id: 'queue',
    num: '02',
    title: 'Cola + DB',
    sub: 'persistencia local',
    tech: 'SQLite',
    desc:
      'Cada mensaje se guarda antes de procesar. Historia completa por chat, sin perder nada si la app se reinicia.',
  },
  {
    id: 'agent',
    num: '03',
    title: 'Agente IA',
    sub: 'tool-calling loop',
    tech: 'Vercel AI SDK · OpenRouter / Ollama',
    desc:
      'Un solo agente dinámico. Lee IDENTITY.md + RULES.md del workspace, decide qué herramientas llamar, encadena llamadas.',
  },
  {
    id: 'sandbox',
    num: '04',
    title: 'Sandbox',
    sub: 'ejecución aislada',
    tech: 'Docker · node:20-slim',
    desc:
      'bash, python y ssh corren dentro del contenedor. El host nunca ejecuta código del agente directamente.',
  },
  {
    id: 'network',
    num: '05',
    title: 'Red',
    sub: 'equipos reales',
    tech: 'MikroTik · OLT · switches',
    desc:
      'SSH con sshpass + credenciales del workspace. Scripts Python pre-cargados para auditoría, gráficos, señal GPON.',
  },
]

export default function Pipeline() {
  return (
    <section id="pipeline" className="relative py-24 md:py-32 border-t border-border-soft overflow-hidden">
      <div className="container-pg relative">
        <SectionHeader
          index="03"
          label="Arquitectura / pipeline"
          title={
            <>
              Cinco piezas.{' '}
              <span className="italic font-display text-ink-dim">Una conversación.</span>
            </>
          }
          lede="Sin colas oscuras, sin agentes anidados, sin capas opacas. El mensaje entra por WhatsApp y sale por WhatsApp. En medio, código que puedes leer."
        />

        {/* Pipeline diagram */}
        <div className="mt-16 relative">
          {/* Stages grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-0">
            {stages.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative group"
              >
                <div className="relative card tick-corner p-5 md:p-6 h-full bg-surface/70 hover:bg-surface transition-colors md:border-r-0 last:md:border-r">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-micro text-phosphor">
                      [{s.num}]
                    </span>
                    <span className="font-mono text-[9.5px] tracking-mid text-ink-faint uppercase">
                      {s.sub}
                    </span>
                  </div>
                  <div className="font-display text-[22px] leading-none text-ink mb-2">
                    {s.title}
                  </div>
                  <div className="font-mono text-[10.5px] text-phosphor-dim mb-4 tracking-mid">
                    {s.tech}
                  </div>
                  <p className="font-sans text-[12.5px] leading-relaxed text-ink-dim">
                    {s.desc}
                  </p>

                  {/* Arrow between cards (desktop) */}
                  {i < stages.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-bg border border-border rounded-full items-center justify-center">
                      <span className="font-mono text-[11px] text-phosphor animate-flow">
                        →
                      </span>
                    </div>
                  )}
                  {/* Arrow between cards (mobile) */}
                  {i < stages.length - 1 && (
                    <div className="md:hidden flex justify-center py-2">
                      <span className="font-mono text-phosphor animate-flow">↓</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom label strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid md:grid-cols-2 gap-6 md:gap-10"
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-[11px] text-phosphor tracking-mid shrink-0 pt-0.5">
                [A]
              </span>
              <div>
                <div className="mono-label mb-1">IDA</div>
                <p className="font-sans text-[13.5px] text-ink-dim leading-relaxed">
                  Mensaje → DB → agent runner → streamText loop → tool call →{' '}
                  <span className="text-ink">docker exec</span> → red.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-mono text-[11px] text-phosphor tracking-mid shrink-0 pt-0.5">
                [B]
              </span>
              <div>
                <div className="mono-label mb-1">VUELTA</div>
                <p className="font-sans text-[13.5px] text-ink-dim leading-relaxed">
                  stdout → tool result → siguiente paso del loop → respuesta
                  final → <span className="text-ink">Baileys.send()</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
