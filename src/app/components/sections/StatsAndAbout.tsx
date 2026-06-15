'use client';
import React, { useRef } from 'react'
import { motion, useInView,Variants } from "framer-motion";
import { Code2, Palette, GraduationCap } from "lucide-react";
const StatsAndAbout = () => {
    const ref = useRef(null);
    const isInView = useInView(ref,{
        once:true,
        margin:'-100px'
    });
    const stats = [
    { count: "15", label: "Projects Completed" },
    { count: "12", label: "Tech Stack Mastery" },
    { count: "500+", label: "Active Commits" },
    { count: "24", label: "Commits a Week" },
  ];

  const cards = [
    {
      title: "Full Stack Development",
      description:
        "Building scalable web applications using Next.js, React, and Node.js with a focus on clean architecture and performance.",
      icon: Code2,
      color: "text-primary-cyan",
      bg: "bg-primary-cyan/10",
    },
    {
      title: "AI/ML Exploration",
      description:
        "Integrating machine learning models and AI-driven features into web applications to create smarter, data-driven user experiences.",
      icon: Palette,
      color: "text-primary-purple",
      bg: "bg-primary-purple/10",
    },
  ];

  
  const fadeUp:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section ref={ref} id='about' className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- STATS ROW --- */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="glass rounded-2xl p-6 text-center hover:border-primary-cyan/30 transition-colors"
            >
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.count}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-mono">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- ABOUT & BENTO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="text-primary-cyan font-mono text-sm tracking-widest uppercase mb-2 block">
                Engineering with Precision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Building the digital infrastructure of tomorrow.
              </h2>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              I am a B.Tech student at the College of Engineering Chengannur, driven by the intersection of full-stack development and AI/ML. My journey is focused on building high-performance digital experiences while continuously expanding my knowledge in machine learning and data-driven solutions.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl glass w-fit">
              <GraduationCap className="text-primary-cyan" size={20} />
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">Bachelor of Software Engineering</span>
                <span className="text-gray-500 text-xs font-mono">Expected Graduation: 2027</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bento Cards */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-4"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="glass rounded-2xl p-6 flex gap-4 items-start group cursor-default"
              >
                <div className={`p-3 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                  <card.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default StatsAndAbout
