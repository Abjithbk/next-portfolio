'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const EMOJIS = ['✦', '◆', '●', '▲', '★', '⬢']

export function KonamiEgg() {
  const [active, setActive] = useState(false)
  const [particles, setParticles] = useState<
    { id: number; x: number; symbol: string; delay: number }[]
  >([])

  useEffect(() => {
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === SEQUENCE[pos]) {
        pos++
        if (pos === SEQUENCE.length) {
          pos = 0
          trigger()
        }
      } else {
        pos = key === SEQUENCE[0] ? 1 : 0
      }
    }
    const trigger = () => {
      setParticles(
        Array.from({ length: 60 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          symbol: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          delay: Math.random() * 0.4,
        })),
      )
      setActive(true)
      setTimeout(() => setActive(false), 3500)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center overflow-hidden"
        >
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: '110vh', opacity: 1, rotate: 0 }}
              animate={{ y: '-20vh', opacity: 0, rotate: 360 }}
              transition={{ duration: 3, delay: p.delay, ease: 'easeOut' }}
              style={{ left: `${p.x}%` }}
              className="absolute text-3xl text-primary"
            >
              {p.symbol}
            </motion.span>
          ))}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="rounded-2xl border-2 border-primary bg-navy px-8 py-6 text-center text-navy-foreground shadow-2xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Konami unlocked
            </p>
            <p className="mt-2 font-heading text-3xl font-bold tracking-tight">
              You found it. ✦
            </p>
            <p className="mt-1 text-sm text-navy-foreground/60">
              Curiosity is the best engineering trait.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}