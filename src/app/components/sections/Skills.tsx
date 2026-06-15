'use client'
import React from 'react'
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
const Skills = () => {
    const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Define typed variants to prevent TypeScript errors
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } 
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Your Tech Stack Data
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 60 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Python / FastAPI", level: 90 },
        { name: "Node.js / Express", level: 75 },
        { name: "REST APIs", level: 85 },
      ],
    },
    {
      title: "Database & Cloud",
      skills: [
        { name: "PostgreSQL", level: 95 },
        { name: "MongoDB", level: 90 },
        { name: "Vercel", level: 87 },
        { name: "Docker", level: 80 },
      ],
    },
    {
      title: "Tools & Automation",
      skills: [
        { name: "Git / GitHub", level: 95 },
        { name: "Playwright / Patchright", level: 89 },
        { name: "Render", level: 85 },
        { name: "Figma", level: 70 },
      ],
    },
  ];
  return (
    <section ref={ref} id='skills' className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className="text-primary-cyan font-mono text-sm tracking-widest uppercase mb-3 block">
            Technical Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            My Toolkit
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Specialized toolkit for modern software development. 
            Continuously learning and adapting to new technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              variants={cardVariants}
              className="glass rounded-2xl p-6 md:p-8 hover:border-primary-cyan/20 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-primary-cyan" />
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-primary-cyan">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar Track */}
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      {/* Animated Progress Bar Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          ease: "easeOut", 
                          delay: 0.2 + (skillIndex * 0.1) 
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
