import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

const included = [
  'Licencia activa para 1 equipo (HWID)',
  'Actualizaciones continuas — cada release',
  'MikroTik + OLT GPON + scripts Python',
  'OpenRouter (BYOK) u Ollama local',
  'Sandbox Docker incluido',
  'Workspace ilimitado · sesiones ilimitadas',
  'Soporte por email · SLA 48h hábiles',
  'Garantía 14 días — sin preguntas',
]

const notIncluded = [
  'Tokens de IA — los pagas a tu proveedor (OpenRouter)',
  'Equipo físico del POP (obviamente)',
  'Tu café de las 3 am',
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 border-t border-border-soft overflow-hidden">
      {/* Glow behind card */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(159,239,0,0.08) 0%, transparent 55%)',
        }}
      />
      <div className="container-pg relative">
        <SectionHeader
          index="04"
          label="Precio"
          align="center"
          title={
            <>
              Un solo plan.{' '}
              <span className="italic font-display text-ink-dim">
                Cancelable cuando quieras.
              </span>
            </>
          }
          lede="Sin tiers inflados, sin 'contactar ventas'. El producto es el producto. Pagas mes a mes vía Lemon Squeezy — impuestos y facturación global incluidos."
        />

        <div className="mt-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Floating tag */}
            <div className="absolute -top-3 left-6 bg-bg px-2 z-10">
              <span className="font-mono text-[10px] tracking-micro text-phosphor">
                [PLENO / PRO]
              </span>
            </div>

            <div className="tick-corner card ring-phosphor bg-surface/60 p-8 md:p-10">
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-6 pb-8 border-b border-border-soft">
                <div>
                  <h3 className="font-display text-[40px] md:text-[52px] leading-none text-ink">
                    Pleno<span className="text-phosphor">.</span>Agent
                  </h3>
                  <div className="mt-2 font-mono text-[12px] text-ink-dim tracking-mid">
                    suscripción mensual · licencia por HWID
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="font-display text-[64px] leading-none text-ink">
                      $90
                    </span>
                    <span className="font-mono text-[13px] text-ink-dim">/ mes</span>
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] text-ink-faint tracking-mid">
                    USD · impuestos según región (Lemon Squeezy)
                  </div>
                </div>
              </div>

              {/* Included */}
              <div className="pt-8 pb-6 grid md:grid-cols-2 gap-x-10 gap-y-3">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3 font-sans text-[13.5px] text-ink">
                    <span className="text-phosphor font-mono text-[14px] leading-none mt-1 shrink-0">
                      +
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Not included */}
              <div className="pt-4 pb-8 grid md:grid-cols-2 gap-x-10 gap-y-2 border-t border-border-soft">
                <div className="mono-label mb-1 md:col-span-2">NO INCLUIDO</div>
                {notIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-3 font-sans text-[12.5px] text-ink-faint">
                    <span className="text-ink-faint font-mono text-[14px] leading-none mt-1 shrink-0">
                      –
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-border-soft flex flex-wrap items-center gap-4">
                <a
                  href="https://plenoagent.lemonsqueezy.com/checkout/buy/c481173d-d97a-4083-ba7e-4b844351d506"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 sm:flex-initial justify-center"
                >
                  Comprar con Lemon Squeezy
                  <span>→</span>
                </a>
                <a href="#faq" className="btn-link">
                  ¿Cómo funciona la licencia?
                </a>
              </div>

              {/* Fine print */}
              <div className="mt-6 pt-6 border-t border-border-soft grid sm:grid-cols-3 gap-4 font-mono text-[10.5px] text-ink-faint">
                <div>
                  <div className="text-ink-dim mb-1">PAGOS</div>
                  Stripe · PayPal · SEPA · cards globales
                </div>
                <div>
                  <div className="text-ink-dim mb-1">ACTIVACIÓN</div>
                  License Key + HWID · automático
                </div>
                <div>
                  <div className="text-ink-dim mb-1">CANCELACIÓN</div>
                  Un click · sin preguntas · efecto inmediato
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
