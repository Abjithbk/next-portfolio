'use client'

import { useState } from 'react'
import { Mail, ArrowUpRight, Download, Send } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import LettersReveal from '../text-reveal'
import { Magnetic } from './magnetic'

type IconProps = { className?: string }

function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57v-2.02c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.85.12 3.15.77.83 1.23 1.88 1.23 3.17 0 4.53-2.8 5.53-5.48 5.82.43.36.81 1.08.81 2.18v3.23c0 .32.21.69.82.57A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'GitHub', handle: '@abjithbk', href: 'https://github.com/Abjithbk', Icon: GithubIcon },
  { label: 'LinkedIn', handle: 'in/abjithbk', href: 'https://linkedin.com/in/abjithbk', Icon: LinkedinIcon },
  { label: 'Twitter / X', handle: '@abjithbk', href: 'https://twitter.com/abjithbk', Icon: TwitterIcon },
  { label: 'Email', handle: 'abjithbk@gmail.com', href: 'mailto:abjithbk@gmail.com', Icon: Mail },
]

function ChatForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address so I can reply.")
      return
    }

    setIsSubmitting(true)

    try {
      // 2. Send to API (Web3Forms)
      const response = await axios.post('/api/contact', {
        name: name || "Visitor",
        email: email,
        message: message,
      })

      if (response.data.success) {
        toast.success("Message sent! I'll get back to you soon.")
        setName('')
        setEmail('')
        setMessage('')
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-5 sm:p-7"
    >
      <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
          A
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">Abjith B K</p>
          <p className="font-mono text-[11px] text-primary">● online — replies fast</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name Question */}
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
          Hey! Thanks for stopping by. What&apos;s your name?
        </div>
        <div>
          <label htmlFor="name" className="sr-only">Your name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Type your name…"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Email Question */}
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
          Nice to meet you{name ? `, ${name}` : ''}! What&apos;s your email so I can reply?
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Your email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Message Question */}
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
          Great. What can I help you build?
        </div>
        <div>
          <label htmlFor="message" className="sr-only">Your message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            placeholder="Tell me about your idea…"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <Magnetic className="mt-5 inline-block">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
          <Send className="h-4 w-4" />
        </button>
      </Magnetic>
    </form>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-navy py-24 text-navy-foreground md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-10" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          (05) — Contact
        </p>
        <h2 className="font-heading text-[20vw] font-bold leading-[0.82] tracking-tighter sm:text-[16vw] lg:text-[13vw]">
          <LettersReveal text="LET'S" />
          <br />
          <span className="text-primary">
            <LettersReveal text="TALK" delay={0.2} />
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-navy-foreground/70">
              Got a project, a role, or just want to nerd out about motion and
              AI? Drop me a line — I read everything.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {SOCIALS.map(({ label, handle, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 bg-navy p-5 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>
                      <span className="block text-sm font-semibold">{label}</span>
                      <span className="block font-mono text-xs opacity-60">
                        {handle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>

            <Magnetic className="mt-8 inline-block">
              <a
                href="/resume.pdf" 
                download
                className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold"
              >
                <span className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
                <Download className="relative h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                <span className="relative">Download resume</span>
              </a>
            </Magnetic>
          </div>

          <ChatForm />
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-xs text-navy-foreground/50 sm:flex-row">
          <span>© 2026 Abjith B K — built from scratch, not a template.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-colors hover:text-primary"
          >
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  )
}