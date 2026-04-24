import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

type QA = {
  q: string
  a: string
}

const faqs: QA[] = [
  {
    q: '¿Cómo funciona la licencia?',
    a: 'Cada licencia se vincula al HWID (ID único de hardware) de la primera máquina donde la actives. Tras comprar en Lemon Squeezy recibes una License Key; al abrir la app la pegas y el backend registra el HWID. Si cambias de máquina, puedes liberar la licencia desde el panel de cuenta.',
  },
  {
    q: '¿Dónde se guardan mis credenciales de router?',
    a: 'En tu máquina. Las credenciales viven en workspace/data/credentials.json — un archivo que tú eliges dónde crear. Nunca se envían a nuestros servidores, nunca salen del contenedor Docker. Solo viajan entre el sandbox y los equipos de red por SSH, como si las hubieras escrito tú.',
  },
  {
    q: '¿Funciona sin internet?',
    a: 'Parcialmente. Con Ollama local (modelo corriendo en tu máquina) el agente trabaja 100% offline — ideal para redes aisladas. Con OpenRouter necesitas conexión saliente al API. La app cambia de provider desde Settings, sin reinstalar nada.',
  },
  {
    q: '¿Qué marcas de red soporta?',
    a: 'De fábrica: MikroTik (RouterOS completo), OLTs V-Sol, Huawei SmartAX y ZTE C320 con scripts Python pre-cargados. Cualquier equipo con SSH es accesible — el agente aprende nueva sintaxis si le pegas la documentación del equipo en RULES.md.',
  },
  {
    q: '¿Se puede cancelar la suscripción?',
    a: 'Sí, en un click desde el panel de cuenta de Lemon Squeezy. Sin preguntas, sin llamadas de retención. Además tienes 14 días de garantía: si no te convence, solicitas el reembolso y Lemon Squeezy lo procesa como Merchant of Record.',
  },
  {
    q: '¿Por qué el código del agente está ofuscado?',
    a: 'Solo el módulo de validación de licencia está ofuscado — para dificultar el parcheo del sistema anti-piratería. El resto (workspace manager, tools, UI) es TypeScript legible y se puede auditar. El agente se ejecuta en tu máquina: necesitas poder ver qué hace.',
  },
  {
    q: '¿Qué modelos de IA usa?',
    a: 'El que tú quieras. El provider es openai-compatible, así que cualquier modelo de OpenRouter funciona: Qwen 3 (default), Llama 3.3, GPT-4, Claude, DeepSeek. Con Ollama local puedes correr Qwen, Llama, Mistral. Se cambia desde Settings.',
  },
  {
    q: '¿Hay soporte técnico?',
    a: 'Sí. Escribes a support@plenoagent.com y responde una persona del equipo. Para incidencias críticas (activación bloqueada, la app no arranca) tienes atención priorizada desde el primer día.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 md:py-32 border-t border-border-soft">
      <div className="container-pg relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <SectionHeader
              index="07"
              label="Preguntas"
              title={
                <>
                  Lo que{' '}
                  <span className="italic font-display text-ink-dim">siempre</span>{' '}
                  preguntan.
                </>
              }
            />
            <div className="mt-10 p-5 border border-border-soft bg-surface/40 font-mono text-[12px] text-ink-dim leading-relaxed">
              <div className="mono-label mb-2">¿NO ESTÁ TU DUDA?</div>
              <p>
                Escribe a{' '}
                <a href="mailto:support@plenoagent.com" className="text-phosphor hover:underline">
                  support@plenoagent.com
                </a>
                . Responde una persona del equipo.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-border-soft">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <div key={f.q} className="border-b border-border-soft">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group w-full flex items-start gap-6 py-6 text-left"
                    >
                      <span className="font-mono text-[11px] text-phosphor tracking-mid pt-1.5 shrink-0 w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-display text-[20px] md:text-[22px] leading-snug text-ink group-hover:text-phosphor transition-colors">
                        {f.q}
                      </span>
                      <span
                        className={`font-mono text-[18px] text-ink-dim transition-transform shrink-0 pt-1 ${
                          isOpen ? 'rotate-45 text-phosphor' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-14 pr-8 font-sans text-[14.5px] leading-relaxed text-ink-dim text-pretty">
                            {f.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
