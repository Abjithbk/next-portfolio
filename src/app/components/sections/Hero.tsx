'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LettersReveal from '../text-reveal'


const ROLES = ['Full-Stack Developer', 'AI/ML Enthusiast', 'B.Tech Student', 'Builder']

function Terminal() {
  const lines = [
    { p: '~/abjith', c: 'whoami', out: 'abjith b k — developer' },
    { p: '~/abjith', c: 'cat stack.txt', out: 'react · next · python · ai' },
    { p: '~/abjith', c: 'status', out: 'open to opportunities ✦' },
  ]
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-navy text-navy-foreground shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-navy-foreground/50">
          zsh — abjith
        </span>
      </div>
      <div className="space-y-2 p-5 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.45 }}
          >
            <div>
              <span className="text-primary">{l.p}</span>{' '}
              <span className="text-[#28c840]">$</span>{' '}
              <span className="text-navy-foreground">{l.c}</span>
            </div>
            <div className="text-navy-foreground/60">{l.out}</div>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block h-4 w-2 bg-primary align-middle"
        />
      </div>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 220])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-16 pt-28 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-sm"
          >
            <span className="h-px w-10 bg-primary" />
            Portfolio — 2026
          </motion.p>

          <h1 className="font-heading font-bold leading-[0.82] tracking-tighter">
            <span className="block text-[18vw] sm:text-[15vw] lg:text-[11.5vw]">
              <LettersReveal text="ABJITH" />
            </span>
            <span className="block text-[18vw] text-stroke sm:text-[15vw] lg:text-[11.5vw]">
              <LettersReveal text="B K" delay={0.25} />
            </span>
          </h1>

          <div className="mt-6 flex h-8 items-center font-mono text-base text-primary sm:text-xl">
            <span className="text-foreground">{'// '}</span>
            <span className="relative ml-2 inline-block">
              {ROLES.map((role, i) => (
                <motion.span
                  key={role}
                  className="absolute left-0 whitespace-nowrap"
                  initial={false}
                  animate={{
                    y: roleIndex === i ? 0 : 20,
                    opacity: roleIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {role}
                </motion.span>
              ))}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-sm text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I design and build interactive web experiences that blur the line
            between engineering and craft. Currently obsessed with AI, motion,
            and details most people miss.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#about"
        data-cursor
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <span className="relative flex h-12 w-7 justify-center rounded-full border border-border">
          <motion.span
            animate={{ y: [4, 18, 4], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="mt-1.5 h-2 w-2 rounded-full bg-primary"
          />
        </span>
      </a>
    </section>
  )
}