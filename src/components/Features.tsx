import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

type Feature = {
  num: string
  title: string
  body: string
  sample?: string
}

const features: Feature[] = [
  {
    num: '01',
    title: 'MikroTik nativo',
    body:
      'RouterOS por SSH con sshpass y credenciales del workspace. Sintaxis ROS entendida por el agente — nombres de interfaces, queues, firewall, scripts.',
    sample: '/interface monitor-traffic ether2',
  },
  {
    num: '02',
    title: 'OLT GPON',
    body:
      'Scripts Python pre-cargados para V-Sol, Huawei y ZTE. Reportes de señal RX/TX por ONU, clientes caídos, listas por sector.',
    sample: 'vsol_olt_signal_report.py --host …',
  },
  {
    num: '03',
    title: 'Workspace legible',
    body:
      'Una carpeta en tu disco que tú y la IA comparten. IDENTITY.md, RULES.md, credenciales, topología, reportes generados — todo visible, todo editable.',
    sample: 'workspace/.agent/RULES.md',
  },
  {
    num: '04',
    title: 'Sandbox Docker',
    body:
      'bash, python, ssh corren dentro del contenedor. El host nunca ejecuta código del modelo. Credenciales montadas solo en /workspace.',
    sample: 'docker exec net-agent …',
  },
  {
    num: '05',
    title: 'Un agente, una red',
    body:
      'Sin multi-tenant falso ni grupos anidados. Un técnico, un agente, un workspace. La conversación es larga y con memoria; las sesiones se persisten.',
    sample: 'single agent · dynamic',
  },
  {
    num: '06',
    title: 'Multi-provider',
    body:
      'OpenRouter en producción (Qwen, Llama, GPT, Claude), Ollama en local cuando quieres 100% offline. Se cambia desde Settings — no hay vendor lock-in.',
    sample: 'provider = openrouter | ollama',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 border-t border-border-soft bg-surface/20">
      <div className="container-pg relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeader
            index="04"
            label="Capacidades"
            title={
              <>
                Construido por gente que ha{' '}
                <span className="italic font-display text-ink-dim">
                  bajado al POP a las 3am.
                </span>
              </>
            }
            lede="Sin features para la foto. Cada capacidad existe porque alguien la necesitó en turno nocturno."
          />
          <div className="font-mono text-[11px] tracking-mid text-ink-faint shrink-0">
            06 / ESTABLES · 03 / BETA
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-soft border border-border-soft">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative bg-bg p-8 hover:bg-surface transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[11px] tracking-mid text-phosphor">
                  [{f.num}]
                </span>
                <span className="font-mono text-[9.5px] tracking-micro text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity">
                  ESTABLE
                </span>
              </div>

              <h3 className="font-display text-[24px] leading-tight text-ink mb-3">
                {f.title}
              </h3>

              <p className="font-sans text-[14px] leading-relaxed text-ink-dim mb-5">
                {f.body}
              </p>

              {f.sample && (
                <div className="pt-4 border-t border-border-soft">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-phosphor">$</span>
                    <span className="text-ink-dim truncate">{f.sample}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote / testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="mono-label mb-5">[NOTA / DISEÑO]</div>
          <blockquote className="font-display text-[24px] md:text-[30px] leading-snug text-ink text-balance">
            “El agente debe poder abrir la carpeta del workspace y{' '}
            <span className="italic text-phosphor">entenderla sola</span>.
            Si un humano también puede hacerlo,{' '}
            <span className="italic text-phosphor">mejor</span>.”
          </blockquote>
          <div className="mt-5 font-mono text-[11px] tracking-mid text-ink-faint">
            — IDENTITY.md / workspace default
          </div>
        </motion.div>
      </div>
    </section>
  )
}
