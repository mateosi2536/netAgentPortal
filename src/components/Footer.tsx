export default function Footer() {
  return (
    <footer className="relative border-t border-border-soft bg-bg overflow-hidden">
      {/* Big wordmark */}
      <div className="container-pg pt-20 pb-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="mono-label mb-4">[FIN / DOCUMENTO]</div>
            <h2 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] text-ink tracking-tight">
              pleno
              <span className="text-phosphor">.</span>
              <span className="italic text-ink-dim">agent</span>
            </h2>
            <div className="mt-4 font-mono text-[12px] text-ink-dim tracking-mid max-w-md">
              El administrador de red que ya vive en el bolsillo del técnico.
            </div>
          </div>

          <a
            href="#pricing"
            className="btn-primary shrink-0"
          >
            Comprar licencia
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Columns */}
      <div className="container-pg pt-10 pb-10 border-t border-border-soft">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-[12.5px]">
          <Col title="Producto">
            <FLink href="#demo">Demo</FLink>
            <FLink href="#pipeline">Pipeline</FLink>
            <FLink href="#features">Features</FLink>
            <FLink href="#stack">Stack</FLink>
            <FLink href="#pricing">Precio</FLink>
            <FLink href="#faq">FAQ</FLink>
            <FLink href="https://github.com/mateosi2536/PlenoAgentUpdates/releases">Changelog</FLink>
          </Col>
          <Col title="Contacto">
            <FLink href="mailto:support@plenoagent.com">support@plenoagent.com</FLink>
            <FLink href="https://plenoagent.lemonsqueezy.com/checkout/buy/c481173d-d97a-4083-ba7e-4b844351d506">
              Comprar licencia
            </FLink>
          </Col>
          <Col title="Legal">
            <FLink href="/terms.html">Términos de Servicio</FLink>
            <FLink href="/privacy.html">Política de Privacidad</FLink>
            <FLink href="/terms.html">Reembolsos</FLink>
            <span className="text-ink-faint text-[10.5px] leading-relaxed mt-2 opacity-70">
              Pagos procesados por Lemon Squeezy.
            </span>
          </Col>
        </div>
      </div>

      {/* Status ticker */}
      <div className="border-t border-border-soft bg-surface/30 overflow-hidden">
        <div className="container-pg py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[10.5px] tracking-mid text-ink-faint">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse-dot" />
              <span className="text-ink-dim">PLENO AGENT</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">agente de red por WhatsApp</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© Pleno Labs</span>
            <span>·</span>
            <span>plenoagent.com</span>
          </div>
        </div>
      </div>

      {/* Bottom phosphor line */}
      <div className="h-px bg-gradient-to-r from-transparent via-phosphor/40 to-transparent" />
    </footer>
  )
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="mono-label mb-1">{title}</div>
      {children}
    </div>
  )
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-ink-dim hover:text-phosphor transition-colors flex items-center gap-1.5 break-all"
    >
      <span className="text-phosphor/0 group-hover:text-phosphor transition-colors">›</span>
      {children}
    </a>
  )
}
