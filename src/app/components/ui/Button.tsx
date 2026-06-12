'use client'
import React,{ReactNode} from 'react'
import {motion,useMotionValue,useSpring} from 'framer-motion'

interface ButtonProps {
    children : ReactNode
    variant?:"primary" | "secondary"|"outline";
    href?: string
    onClick?: () => void
}
const Button = ({
    children,
    variant = "primary",
    href,
    onClick,
}: ButtonProps) => {
    const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const baseStyles =
    "relative px-8 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-cyan to-primary-purple text-white shadow-lg shadow-primary-cyan/25 hover:shadow-primary-cyan/40",
    secondary:
      "bg-surface hover:bg-surface-hover text-white border border-border",
    outline:
      "border-2 border-primary-cyan text-primary-cyan hover:bg-primary-cyan/10",
  };

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variants[variant]}`}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left - rect.width / 2) / 2);
          y.set((e.clientY - rect.top - rect.height / 2) / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / 2);
        y.set((e.clientY - rect.top - rect.height / 2) / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  )
}

export default Button
