import { useEffect, useState } from 'react'
import Logo from './ui/Logo'
import { useLatestRelease } from '../hooks/useLatestRelease'

const links = [
  { href: '#demo', label: 'Demo' },
  { href: '#use-cases', label: 'Casos' },
  { href: '#pricing', label: 'Precio' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  const { downloadUrl } = useLatestRelease()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-border-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-pg flex h-14 items-center justify-between">
        <a href="#" className="group flex items-center gap-2.5 text-ink">
          <Logo size={22} />
          <span className="font-mono text-[13px] tracking-mid">
            pleno<span className="text-phosphor">.</span>agent
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-3 py-1.5 font-mono text-[12px] tracking-mid text-ink-dim hover:text-ink transition-colors"
            >
              <span className="text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">
                ›{' '}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {downloadUrl && (
            <a
              href={downloadUrl}
              className="hidden md:inline-flex font-mono text-[11px] text-ink-dim hover:text-phosphor transition-colors uppercase tracking-mid"
            >
              Descargar
            </a>
          )}
          <a
            href="#pricing"
            className="hidden sm:inline-flex items-center gap-2 bg-phosphor text-bg font-mono text-[12px] uppercase tracking-mid px-4 py-2 hover:bg-phosphor-glow transition-colors"
          >
            Comprar
            <span className="text-bg/70">→</span>
          </a>
        </div>
      </div>
    </header>
  )
}

