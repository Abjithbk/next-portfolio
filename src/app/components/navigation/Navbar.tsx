'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Magnetic } from '../sections/magnetic'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Activity', href: '#activity' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a
            href="#top"
            data-cursor
            className="font-mono text-sm font-semibold tracking-tight"
          >
            <span className="text-primary">{'>'}</span> abjith.bk
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-2 backdrop-blur-md md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor
                className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <Magnetic className="md:hidden">
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              data-cursor
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-card"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-foreground"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-foreground"
              />
            </button>
          </Magnetic>

          <Magnetic className="hidden md:block">
            <a
              href="#contact"
              data-cursor="text"
              data-cursor-label="Say hi"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform"
            >
              Let&apos;s talk
            </a>
          </Magnetic>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-navy px-8 text-navy-foreground md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="font-heading text-5xl font-bold tracking-tight"
              >
                {l.label}
              </motion.a>
            ))}
            <p className="mt-8 font-mono text-sm text-navy-foreground/60">
              abjithbk@gmail.com
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}