'use client'
import React from 'react'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/about'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/contact'
import { CodingActivity } from './components/sections/CodingActivity'
import { LeetCode } from './components/sections/leetcode'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CodingActivity />
      <LeetCode />
      <Contact />
    </main>
  )
}