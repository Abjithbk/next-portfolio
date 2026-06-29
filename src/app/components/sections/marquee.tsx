'use client'

const ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'Framer Motion',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Design Systems',
  'AI Agents',
  'Motion',
]

export function Marquee({
  reverse = false,
  duration = '32s',
}: {
  reverse?: boolean
  duration?: string
}) {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="flex overflow-hidden border-y border-foreground bg-foreground py-4 text-background">
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        style={{
          ['--marquee-duration' as string]: duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-heading text-2xl font-semibold uppercase tracking-tight sm:text-4xl">
              {item}
            </span>
            <span className="text-primary text-2xl sm:text-4xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}