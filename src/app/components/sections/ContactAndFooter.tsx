'use client'
import React, { useRef, useState } from 'react'
import {motion,useInView,Variants} from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Send, ArrowUpRight, Calendar } from "lucide-react";
const ContactAndFooter = () => {
    const ref = useRef(null)
    const isInView = useInView(ref,{
        once:true,
        margin:'-100px'
    });
    const [email,setEmail] = useState("")
    const [message, setMessage] = useState("");
    // Define typed variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Timeline Data
  const timeline = [
    {
      year: "2022",
      title: "The Python Awakening",
      description: "Started my journey with Python. Built my first automation scripts and fell in love with backend logic.",
    },
    {
      year: "2023",
      title: "Full Stack Deep Dive",
      description: "Expanded into React and Node.js. Built my first full-stack applications and learned database design.",
    },
    {
      year: "2024",
      title: "Enterprise Ready",
      description: "Focused on TypeScript, Next.js, and Cloud architecture. Built scalable solutions for real-world problems.",
    },
    {
      year: "2026",
      title: "Next.js & Beyond",
      description: "Pushing the boundaries of UI/UX, 3D web experiences, and AI integration in modern applications.",
    },
  ];
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <section ref={ref} id="contact" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- GROWTH TIMELINE --- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <span className="text-primary-cyan font-mono text-sm tracking-widest uppercase mb-3 block">
              Growth Timeline
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              My Journey So Far
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-cyan via-primary-purple to-transparent md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot on the line */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] md:-translate-x-1/2 z-10" />
                
                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="glass rounded-2xl p-6 hover:border-primary-cyan/30 transition-colors">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Calendar size={14} className="text-primary-cyan" />
                      <span className="text-primary-cyan font-mono text-sm">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- CONTACT FORM --- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
            <span className="text-primary-purple font-mono text-sm tracking-widest uppercase mb-3 block">
              Start a Conversation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">YOUR NAME</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan transition-all placeholder-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">YOUR EMAIL</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan transition-all placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">MESSAGE</label>
                <textarea 
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-cyan focus:ring-1 focus:ring-primary-cyan transition-all placeholder-gray-600 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex justify-center pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple text-white font-medium shadow-lg shadow-primary-cyan/25 hover:shadow-primary-cyan/40 transition-shadow"
                >
                  Send Message
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* --- FOOTER --- */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-mono gradient-text mb-2">ARCHITECT.IO</h3>
            <p className="text-gray-500 text-sm">
              © 2026 Architect.io. Built with Next.js, Framer Motion & Three.js.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Mail, href: "mailto:hello@example.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ y: -3, scale: 1.1 }}
                className="p-3 rounded-full glass text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          <motion.a 
            href="#top" 
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: 3 }}
          >
            Back to top
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.footer>
      </div>
    </section>
  )
}

export default ContactAndFooter
