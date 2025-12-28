'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'
import { slowFadeIn, noiseCollapse } from '@/lib/animations/priority-motion'

interface State0EntryNoiseProps {
  onComplete: () => void
}

/**
 * STATE 0: Entry Noise
 * Creates tension and realism through chaotic background motion
 * Hardcoded text reveals the core problem
 */
export function State0EntryNoise({ onComplete }: State0EntryNoiseProps) {
  const [showFirstText, setShowFirstText] = useState(false)
  const [showSecondText, setShowSecondText] = useState(false)
  const [isCollapsing, setIsCollapsing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const hasCompletedRef = useRef(false) // Prevent double completion

  // Only render noise elements after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // First text after initial load - give time for noise to be visible
    const timer1 = setTimeout(() => {
      setShowFirstText(true)
    }, 1000)
    
    // Second text after pause
    const timer2 = setTimeout(() => {
      setShowSecondText(true)
    }, 3000)
    
    // Start collapse animation after text is shown
    const timer3 = setTimeout(() => {
      setIsCollapsing(true)
    }, 5500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // Generate random noise elements only once on client (after mount)
  // Store random values in the object so they don't change on re-render
  const noiseElements = useMemo(() => {
    if (!isMounted) {
      return []
    }
    const elements = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      // Staggered pop-up delays - quick succession for chaos (0s to 1.5s)
      popupDelay: ((i * 30) + Math.random() * 40) / 1000, // Convert ms to seconds: each number appears 30-70ms after previous
      value: Math.floor(Math.random() * 10000).toString().padStart(4, '0'), // Store the number string
      // Floating motion - stored values for consistent animation
      floatX: (Math.random() - 0.5) * 15, // Larger movement for more chaos
      floatY: (Math.random() - 0.5) * 15,
      floatDuration: 1.5 + Math.random() * 1.5, // Quick floating motion (1.5-3s)
    }))
    return elements
  }, [isMounted])
  

  // Call onComplete after fade animation completes
  useEffect(() => {
    if (isCollapsing && !hasCompletedRef.current) {
      // Fade animation is 2s, so wait 2s + small buffer
      const completeTimer = setTimeout(() => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true
          onComplete()
        }
      }, 2200) // 2s fade duration + 200ms buffer
      return () => clearTimeout(completeTimer)
    }
  }, [isCollapsing, onComplete])


  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={isCollapsing ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Chaotic background noise */}
      <motion.div
        className="absolute inset-0"
        variants={noiseCollapse}
        initial="initial"
        animate={isCollapsing ? 'collapsed' : 'initial'}
      >
        {/* System-like elements - numbers pop up and float (chaotic appearance) */}
        {isMounted && noiseElements.length > 0 && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {noiseElements.map((el) => (
              <motion.div
                key={el.id}
                className="absolute text-white text-xs font-mono whitespace-nowrap"
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 0.8,
                  x: el.floatX,
                  y: el.floatY,
                }}
                transition={{
                  scale: {
                    duration: 0.5,
                    delay: el.popupDelay,
                    ease: [0.34, 1.56, 0.64, 1], // Overshoot ease for pop effect
                  },
                  opacity: {
                    duration: 0.3,
                    delay: el.popupDelay,
                    ease: 'easeOut',
                  },
                  x: {
                    duration: el.floatDuration,
                    delay: el.popupDelay + 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear',
                  },
                  y: {
                    duration: el.floatDuration * 1.15,
                    delay: el.popupDelay + 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear',
                  },
                }}
              >
                {el.value}
              </motion.div>
            ))}
          </div>
        )}

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i * 100) / 20 + '%'}
              x2="100%"
              y2={(i * 100) / 20 + '%'}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i * 100) / 20 + '%'}
              y1="0"
              x2={(i * 100) / 20 + '%'}
              y2="100%"
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* Text reveals */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <motion.p
          variants={slowFadeIn}
          initial="hidden"
          animate={showFirstText ? 'visible' : 'hidden'}
          className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide drop-shadow-lg"
        >
          Everything feels important.
        </motion.p>

        <motion.p
          variants={slowFadeIn}
          initial="hidden"
          animate={showSecondText ? 'visible' : 'hidden'}
          className="text-white/70 text-xl md:text-2xl lg:text-3xl font-light tracking-wide mt-8 drop-shadow-lg"
        >
          That&apos;s the problem.
        </motion.p>
      </div>
    </motion.div>
  )
}

