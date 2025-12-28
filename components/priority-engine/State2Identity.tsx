'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { textReveal, slowSlideUp, ambientDrift } from '@/lib/animations/priority-motion'
import { getHeroContent } from '@/lib/content/load-content'

/**
 * STATE 2: Identity (NO TITLES)
 * Content from hero.json
 * Reveal name using text-reveal animation, then description after delay
 * Render ONLY headline and description. DO NOT render roles, labels, CTAs
 */
export function State2Identity() {
  const content = getHeroContent()
  const [isVisible, setIsVisible] = useState(false)

  // Trigger animation when component mounts (controlled by Priority Engine state)
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-black relative overflow-hidden">
      {/* Ambient background motion - slow vertical drift to imply system running calmly */}
      {/* Motion is behind text, does not distract - creates life without noise */}
      <motion.div
        className="absolute inset-0"
        variants={ambientDrift}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content container - text remains stable while background drifts */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        {/* Name reveal - text-reveal animation */}
        <motion.div
          variants={textReveal}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            {content.headline}
          </h1>
        </motion.div>

        {/* Description reveal - after delay */}
        <motion.div
          variants={slowSlideUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          transition={{ delay: 1.5 }}
        >
          <p className="text-white/70 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
            {content.description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

