import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

type Tech = { name: string; role: string; version?: string }

const stack: Tech[] = [
  { name: 'Electron', role: 'desktop shell', version: '33' },
  { name: 'React', role: 'renderer UI', version: '18' },
  { name: 'TypeScript', role: 'source of truth', version: '5.7' },
  { name: 'Vercel AI SDK', role: 'agent backbone', version: 'v6' },
  { name: 'OpenRouter', role: 'prod provider' },
  { name: 'Ollama', role: 'local provider' },
  { name: 'Baileys', role: 'WhatsApp channel' },
  { name: 'Docker', role: 'sandbox runtime' },
  { name: 'better-sqlite3', role: 'messages + sessions' },
  { name: 'Tailwind', role: 'design system' },
  { name: 'Vitest', role: 'unit + integration' },
  { name: 'electron-builder', role: '.exe packaging' },
]

export default function Stack() {
  return (
    <section id="stack" className="relative py-24 md:py-32 border-t border-border-soft overflow-hidden">
      <div className="container-pg relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              index="05"
              label="Stack / piezas"
              title={
                <>
                  Nada exótico.{' '}
                  <span className="italic font-display text-ink-dim">
                    Todo probado.
                  </span>
                </>
              }
              lede={
                <>
                  Construido sobre piezas que la industria ya eligió. Cero magia
                  propia, cero lock-in. Si mañana quieres entender cómo funciona,
                  lees código que ya conoces.
                </>
              }
            />

            <div className="mt-10 space-y-4 font-mono text-[12.5px] leading-relaxed">
              <div className="flex items-start gap-3 text-ink-dim">
                <span className="text-phosphor shrink-0">›</span>
                <span>
                  Cada pieza respaldada por{' '}
                  <span className="text-ink">tests unitarios e integración</span>
                  {' '}corriendo en cada build.
                </span>
              </div>
              <div className="flex items-start gap-3 text-ink-dim">
                <span className="text-phosphor shrink-0">›</span>
                <span>
                  Provider{' '}
                  <span className="text-ink">openai-compatible</span>, intercambiable.
                  Cambias de OpenRouter a Ollama sin tocar código.
                </span>
              </div>
              <div className="flex items-start gap-3 text-ink-dim">
                <span className="text-phosphor shrink-0">›</span>
                <span>
                  El módulo de licencia se{' '}
                  <span className="text-ink">ofusca</span> en build para proteger
                  la validación — el resto vive como TypeScript legible.
                </span>
              </div>
            </div>
          </div>

          {/* Stack grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border-soft border border-border-soft">
              {stack.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                  className="group relative bg-bg p-5 hover:bg-surface transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-2 h-2 bg-phosphor/60 group-hover:bg-phosphor transition-colors mt-1.5" />
                    {s.version && (
                      <span className="font-mono text-[10px] text-ink-faint tracking-mid">
                        {s.version}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[14px] text-ink mb-1 tracking-tight">
                    {s.name}
                  </div>
                  <div className="font-mono text-[10.5px] text-ink-faint tracking-mid uppercase">
                    {s.role}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between font-mono text-[10.5px] tracking-mid text-ink-faint">
              <span>→ electron · react · ai-sdk · docker · baileys · ssh</span>
              <span>[OK]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
