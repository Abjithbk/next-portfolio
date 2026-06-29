'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default')
  const [label, setLabel] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 28, stiffness: 400, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 28, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (target) {
        const kind = target.dataset.cursor
        setVariant(kind === 'text' ? 'text' : 'hover')
        setLabel(target.dataset.cursorLabel ?? '')
      } else {
        setVariant('default')
        setLabel('')
      }
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: variant === 'default' ? 14 : label ? 88 : 56,
        height: variant === 'default' ? 14 : label ? 88 : 56,
        backgroundColor:
          variant === 'default' ? 'var(--foreground)' : 'var(--primary)',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {label ? (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          {label}
        </span>
      ) : null}
    </motion.div>
  )
}