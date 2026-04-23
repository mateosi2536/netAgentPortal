import { ReactNode } from 'react'

type Props = {
  index: string
  label: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
}

export default function SectionHeader({ index, label, title, lede, align = 'left' }: Props) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start'
  return (
    <div className={`flex flex-col ${alignCls} gap-5 max-w-3xl`}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-phosphor tracking-mid">[{index}]</span>
        <span className="rule-dash w-10" />
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="font-display text-display-lg text-ink text-balance">
        {title}
      </h2>
      {lede && (
        <p className="font-sans text-ink-dim text-[17px] leading-relaxed max-w-2xl text-pretty">
          {lede}
        </p>
      )}
    </div>
  )
}
