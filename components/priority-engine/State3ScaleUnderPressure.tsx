'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { stabilize, slowFadeIn, slowSlideUp } from '@/lib/animations/priority-motion'
import { getMetricsContent } from '@/lib/content/load-content'

/**
 * STATE 3: Scale Under Pressure
 * Animated system graph showing instability -> stabilization
 * Only reveals the 500+ orders metric after stabilization
 * Motion becomes more directional and energetic - implies progress
 */
export function State3ScaleUnderPressure() {
  const content = getMetricsContent()
  const scaleMetric = content.metrics.find(m => m.value.includes('500+'))
  const [isStable, setIsStable] = useState(false)
  const [showText, setShowText] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-based motion for directional momentum
  // Use simple scroll listener for more reliable motion response
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress: 0 when section enters viewport (top at bottom), 1 when section leaves (bottom at top)
      // This creates smooth motion as user scrolls through the section
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const sectionHeight = rect.height
      
      // Progress from 0 to 1 as section scrolls through viewport
      // 0: section top at viewport bottom, 1: section bottom at viewport top
      const scrollRange = windowHeight + sectionHeight
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / scrollRange))
      
      // Map progress to yOffset: 0 at start, -40px at end (upward movement)
      const yOffset = scrollProgress * -40
      setScrollOffset(yOffset)
    }

    // Calculate initial offset and set up scroll listener
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Stabilize after animation
    const timer = setTimeout(() => {
      setIsStable(true)
      // Show text after stabilization
      setTimeout(() => setShowText(true), 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Generate graph points
  const graphPoints = Array.from({ length: 50 }).map((_, i) => ({
    x: (i / 50) * 100,
    y: 50 + (Math.sin(i / 5) * 20) + (i / 50) * 30,
    intensity: Math.random() * 0.5 + 0.5,
  }))


  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative overflow-hidden">
      {/* System graph visualization - responds to scroll for directional momentum */}
      {/* Motion answers "what should I do next?" - implies progress, not decoration */}
      {/* Positioned to leave space for text below without creating empty pause */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ top: '25%' }}
        animate={{ y: scrollOffset }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="w-full max-w-4xl h-96 relative">
          {/* Graph background - subtle opacity variation */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-30"
          >
            {/* Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Graph line - shows instability then stabilization */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            variants={stabilize}
            initial="unstable"
            animate={isStable ? 'stable' : 'unstable'}
          >
            <motion.polyline
              points={graphPoints.map(p => `${p.x},${100 - p.y}`).join(' ')}
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={0.6}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Stabilization point */}
            {isStable && (
              <motion.circle
                cx="95%"
                cy="20%"
                r="4"
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.svg>
        </div>
      </motion.div>

      {/* Text reveals - only after stabilization */}
      {/* Removed large mt-96 margin to prevent empty visual pause after text appears */}
      {/* Text positioned to maintain visual balance without creating dead space */}
      {/* Ensures the moment the scale message finishes, the page feels "ready to move" - no dead space */}
      {showText && scaleMetric && (
        <div className="relative z-10 text-center max-w-3xl mx-auto mt-auto mb-24">
          <motion.p
            variants={slowFadeIn}
            initial="hidden"
            animate="visible"
            className="text-white text-3xl md:text-4xl font-light mb-6"
          >
            From first order to {scaleMetric.value} orders/day
          </motion.p>

          <motion.p
            variants={slowSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
            className="text-white/60 text-xl md:text-2xl font-light"
          >
            Not by moving faster — but by choosing better first.
          </motion.p>
        </div>
      )}
    </section>
  )
}

