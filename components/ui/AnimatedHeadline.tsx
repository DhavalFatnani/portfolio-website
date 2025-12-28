'use client'

import { motion } from 'framer-motion'
import { fadeIn, slideUp } from '@/lib/animations/motion-variants'

interface AnimatedHeadlineProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * AnimatedHeadline Component
 * Displays text with fade-in and slide-up animation
 * Based on Magic UI animated text patterns
 */
export function AnimatedHeadline({
  text,
  className = '',
  delay = 0,
  as: Component = 'h1',
}: AnimatedHeadlineProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUp}
      transition={{ delay }}
      className={className}
    >
      <Component className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {text}
      </Component>
    </motion.div>
  )
}

