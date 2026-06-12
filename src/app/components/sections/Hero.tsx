'use client';
import React from 'react'
import { motion,Variants } from "framer-motion";
import { ArrowRight, Code2, Cpu, Database, Github, Linkedin, Twitter } from "lucide-react";
import Button from "../ui/Button";
import Image from 'next/image';
const Hero = () => {
    const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- LEFT COLUMN: TEXT CONTENT --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-cyan">
              <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse" />
              Available for 2026
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
          >
            Crafting the{" "}
            <span className="gradient-text">Future</span>
            <br />
            of Web Engineering
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Full Stack Developer & Software Engineering Student specializing in building
            high-performance, scalable digital experiences with modern tech stacks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <Button variant="primary" href="#projects">
              View My Work
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" href="#contact">
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 rounded-full glass text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: 3D CHARACTER & FLOATING UI --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Main Character Image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-lg"
          >
            <Image
              src="/image.png"
              alt="Futuristic Web Engineer"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              priority
            />
          </motion.div>

          {/* Floating UI Badges */}
          {/* Top Left Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-10 left-0 md:left-10 glass-strong rounded-xl p-3 flex items-center gap-3 z-20"
          >
            <div className="p-2 rounded-lg bg-primary-cyan/20 text-primary-cyan">
              <Code2 size={20} />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-gray-400 font-mono">Frontend</p>
              <p className="text-sm font-bold text-white">React / Next.js</p>
            </div>
          </motion.div>

          {/* Bottom Right Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-20 right-0 md:right-10 glass-strong rounded-xl p-3 flex items-center gap-3 z-20"
          >
            <div className="p-2 rounded-lg bg-primary-purple/20 text-primary-purple">
              <Database size={20} />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-gray-400 font-mono">Backend</p>
              <p className="text-sm font-bold text-white">Node / Python</p>
            </div>
          </motion.div>

          {/* Top Right Small Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute top-20 right-10 md:right-20 glass rounded-full p-2 z-20"
          >
            <Cpu size={18} className="text-primary-cyan" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary-cyan" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
