type Props = {
  size?: number
  className?: string
  /** Color of the bubble outline. Defaults to currentColor so parent can set it. */
  stroke?: string
  /** Color of the prompt + cursor. Defaults to phosphor green. */
  accent?: string
  /** Stroke width in SVG units (viewBox 0 0 32 32). */
  width?: number
}

/**
 * Pleno Agent logomark.
 * Angular chat bubble with a terminal prompt (>_) inside.
 * Meaning: command line, inside a conversation.
 */
export default function Logo({
  size = 24,
  className,
  stroke = 'currentColor',
  accent = '#9fef00',
  width = 1.8,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Angular chat bubble with pointed tail at bottom-left */}
      <path
        d="M 4 5 L 28 5 L 28 22 L 14 22 L 8 28 L 10 22 L 4 22 Z"
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      {/* > prompt caret */}
      <path
        d="M 10 10.5 L 14 13.5 L 10 16.5"
        stroke={accent}
        strokeWidth={width}
        strokeLinecap="square"
        fill="none"
      />
      {/* Cursor block */}
      <rect x="17" y="11.5" width="5" height="4" fill={accent} />
    </svg>
  )
}
