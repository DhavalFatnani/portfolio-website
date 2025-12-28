'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { focusReveal, slowFadeIn, scrollInvitation } from '@/lib/animations/priority-motion'

/**
 * STATE 1: Priority Intervention
 * Background noise collapses into focused area
 * Reveals the core thesis
 */
export function State1PriorityIntervention() {
  const [showScrollCue, setShowScrollCue] = useState(false)
  const [scrollCueDismissed, setScrollCueDismissed] = useState(false)
  const [chevronState, setChevronState] = useState<'reset' | 'fall'>('reset')

  // Show scroll cue after both texts have appeared (1.5s delay for second text + animation time)
  useEffect(() => {
    const cueTimer = setTimeout(() => {
      setShowScrollCue(true)
      setChevronState('reset') // Start at reset position, then fall
      // Start first fall after brief delay
      const firstFallTimer = setTimeout(() => {
        setChevronState('fall')
      }, 100)
      return () => clearTimeout(firstFallTimer)
    }, 3500) // 1.5s delay + ~2s animation time
    return () => clearTimeout(cueTimer)
  }, [])

  // Handle chevron animation cycle - falls down, then resets instantly (no drag up)
  // Cycle: reset (instant jump to top) -> fall (animate down) -> pause -> reset (instant) -> repeat
  // Using key prop to force remount on reset ensures instant jump without drag up

  // Dismiss scroll cue on any scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showScrollCue && !scrollCueDismissed) {
        setScrollCueDismissed(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showScrollCue, scrollCueDismissed])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-black relative overflow-hidden">
      {/* Focused area - single point of attention */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={focusReveal}
        initial="hidden"
        animate="visible"
      >
        {/* Subtle focus indicator */}
        <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Thesis text */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          variants={slowFadeIn}
          initial="hidden"
          animate="visible"
          className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8"
        >
          Priorities decide speed and direction.
        </motion.h1>

        <motion.p
          variants={slowFadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
          className="text-white/60 text-xl md:text-2xl font-light"
        >
          I work at this moment.
        </motion.p>
      </div>

      {/* Scroll invitation - gravity-pull downward jump */}
      {/* Chevron jumps down and is pulled by gravity - never dragged back up */}
      {/* Stops immediately once user scrolls even 1px - single chevron, low contrast, subtle */}
      {showScrollCue && !scrollCueDismissed && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
          variants={scrollInvitation}
          initial="hidden"
          animate={chevronState}
          key={chevronState === 'reset' ? 'reset-cycle' : 'fall-cycle'} // Force remount on reset for instant jump
          onAnimationComplete={() => {
            if (chevronState === 'fall' && !scrollCueDismissed) {
              // After fall completes, wait briefly then reset instantly (jump back)
              setTimeout(() => {
                setChevronState('reset')
                // Start next fall after brief pause
                setTimeout(() => {
                  setChevronState('fall')
                }, 150)
              }, 800) // Pause at bottom before reset and next fall
            }
          }}
        >
          {/* Downward arrow/chevron - one chevron only, no stacking */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white/50"
          >
            <path
              d="M10 4L10 16M10 16L4 10M10 16L16 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </section>
  )
}

