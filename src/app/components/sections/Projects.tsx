'use client'
import React, { useRef } from 'react'
import { motion, useInView, Variants } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
const Projects = () => {
    const ref = useRef(null)
    const isInView = useInView(ref,{
        once:true,
        margin:'-100px'
    })
     const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } 
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Your Projects Data
  const projects = [
    {
      title: "Project 1",
      description: "Description coming soon. This will highlight the core features and impact of the project.",
      image: "https://placehold.co/600x400/051424/00f0ff?text=Project+1",
      tags: ["Tech 1", "Tech 2"],
      github: "#",
      live: "#",
    },
    {
      title: "Project 2",
      description: "Description coming soon. This will highlight the core features and impact of the project.",
      image: "https://placehold.co/600x400/051424/b829dd?text=Project+2",
      tags: ["Tech 1", "Tech 2"],
      github: "#",
      live: "#",
    },
    {
      title: "Project 3",
      description: "Description coming soon. This will highlight the core features and impact of the project.",
      image: "https://placehold.co/600x400/051424/2962ff?text=Project+3",
      tags: ["Tech 1", "Tech 2"],
      github: "#",
      live: "#",
    },
  ];
  return (
    <section ref={ref} id="projects" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-primary-cyan font-mono text-sm tracking-widest uppercase mb-3 block">
              Featured Deployments
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What I've Built
            </h2>
          </div>
          <p className="text-gray-400 max-w-md md:text-right">
            A collection of projects I've built with modern solutions, focusing on performance, scalability, and clean architecture.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass rounded-2xl overflow-hidden group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-video bg-background">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary-cyan transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 rounded-full bg-primary-cyan/10 text-primary-cyan text-xs font-mono border border-primary-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  <motion.a 
                    href={project.github} 
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <Github size={16} />
                    Source Code
                  </motion.a>
                  <motion.a 
                    href={project.live} 
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-cyan transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
