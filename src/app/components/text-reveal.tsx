'use client';
import React from 'react'
import {motion} from 'framer-motion'

interface LettersRevealProps {
    text:string
    delay?: number
}

interface WordsRevealProps {
    text:string 
    delay?:number
}
const LettersReveal = ({text,delay = 0}: LettersRevealProps) => {
  return (
    <span className="inline-block">
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

export default LettersReveal

export const WordsReveal = ({text,delay = 0}:WordsRevealProps) => {
const words = text.split(' ')
  
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
