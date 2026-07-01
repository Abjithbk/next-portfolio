'use client'

import { useEffect,useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import axios from 'axios'
import { ExternalLink } from 'lucide-react'
import { WordsReveal } from '../text-reveal'

type DifficultyStats = {
  solved: number
  total: number
  submissions: number
}

type LeetCodeData = {
  username: string
  totalSolved: number
  easy: DifficultyStats
  medium: DifficultyStats
  hard: DifficultyStats
}

function ProgressBar({ solved, total, color }: { solved: number; total: number; color: string }) {
    const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref,{ once: true, margin: '-10%' })
  const percentage = total > 0 ? (solved / total) * 100 : 0

  return (
    <div ref={ref} className="mt-3">
      <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{solved} solved</span>
        <span>{total} total</span>
      </div>
    </div>
  )
}

function DifficultyCard({ title, stats, color, textColor }: { title: string; stats: DifficultyStats; color: string; textColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className={`font-heading text-2xl font-bold tracking-tight ${textColor}`}>
          {title}
        </h3>
        <span className="font-mono text-xs text-muted-foreground">
          {stats.submissions} subs
        </span>
      </div>
      <ProgressBar solved={stats.solved} total={stats.total} color={color} />
    </motion.div>
  )
}

export function LeetCode() {
  const [data, setData] = useState<LeetCodeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/leetcode')
        setData(res.data)
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return null // Or a skeleton loader

  if (!data) {
    return (
      <section className="py-24 text-center text-muted-foreground">
        Could not load LeetCode stats.
      </section>
    )
  }

  return (
    <section
      id="leetcode"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Left Side: Typography */}
        <div className="lg:col-span-5">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            (05) — Problem Solving
          </p>
          <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tighter text-foreground sm:text-6xl">
            <WordsReveal text="Cracking the" />
            <br />
            <span className="text-primary">
              <WordsReveal text="code." delay={0.2} />
            </span>
          </h2>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Sharpening my algorithmic thinking and data structure mastery. 
            Consistency is key.
          </p>
          
          <div className="mt-10 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-heading text-6xl font-bold tracking-tighter text-foreground sm:text-7xl">
                {data.totalSolved}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Total Solved
              </span>
            </div>
            <a
              href={`https://leetcode.com/${data.username}/`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              View Profile <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Side: Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-7">
          <DifficultyCard 
            title="Easy" 
            stats={data.easy} 
            color="bg-[#00b8a3]" // LeetCode Green
            textColor="text-[#00b8a3]" 
          />
          <DifficultyCard 
            title="Medium" 
            stats={data.medium} 
            color="bg-[#ffb11a]" // LeetCode Yellow/Orange
            textColor="text-[#ffb11a]" 
          />
          <DifficultyCard 
            title="Hard" 
            stats={data.hard} 
            color="bg-[#ef4743]" // LeetCode Red
            textColor="text-[#ef4743]" 
          />
        </div>
      </div>
    </section>
  )
}