'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'
import { slowFadeIn, noiseCollapse } from '@/lib/animations/priority-motion'

interface State0EntryNoiseProps {
  onComplete: () => void
}

/**
 * STATE 0: Entry Noise
 * Signal fragments represent pre-cognitive chaos before prioritization.
 * Creates felt pressure through recognizable but unreadable fragments.
 * This state is about FELT CHAOS, not metrics.
 */

// Signal fragment pool - recognizable but incomplete, unlabeled, non-interpretable
// Mixed types ensure fragments feel familiar but don't invite analysis
const FRAGMENT_POOL = {
  // Partial metric fragments (NO UNITS) - incomplete numbers that hint at measurement
  metrics: ['98.7', '~500', 'x3', '-12%', '+?', '≈', '0.8', 'x2.5', '↓', '↑', '~1k', '99.2'],
  
  // Status fragments - system states that signal uncertainty
  status: ['pending', 'blocked', 'retrying', 'delayed', 'escalated', 'queued', 'waiting', 'stuck'],
  
  // System artifacts - technical fragments that feel operational
  system: ['syncing…', 'timeout', 'queue ↑', 're-index', 'merge conflict', 'cache miss', '429', '503'],
  
  // Human pressure cues - fragments that signal urgency without specificity
  pressure: ['urgent', 'follow up', 'need decision', 'waiting', 'pushed', 'asap', 'review', 'approve'],
  
  // Temporal distortion cues - time-related fragments that feel uncertain
  temporal: ['ETA ?', 'T+3', 'now → later', 'yesterday', 'overdue', 'soon', 'T-2', '? days'],
}

/**
 * Generate a shuffled, mixed pool of fragments
 * Ensures no clustering of similar types
 */
function generateFragmentPool(): string[] {
  const allFragments: string[] = []
  
  // Collect all fragments from each category
  Object.values(FRAGMENT_POOL).forEach((category) => {
    allFragments.push(...category)
  })
  
  // Shuffle to mix types
  const shuffled = [...allFragments]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

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

  // Generate signal fragment noise elements only once on client (after mount)
  // Fragments are recognizable but incomplete - they create pressure, not curiosity
  const noiseElements = useMemo(() => {
    if (!isMounted) {
      return []
    }
    
    // Use fewer fragments for subtlety - not dense
    const fragmentCount = 40
    const fragmentPool = generateFragmentPool()
    
    const elements = Array.from({ length: fragmentCount }).map((_, i) => {
      // Cycle through shuffled pool to ensure variety
      const fragment = fragmentPool[i % fragmentPool.length]
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        // Staggered pop-up delays - quick succession for chaos (0s to 1.5s)
        popupDelay: ((i * 30) + Math.random() * 40) / 1000, // Each fragment appears 30-70ms after previous
        value: fragment, // Signal fragment string
        // Floating motion - gentle drifting, independent speeds
        floatX: (Math.random() - 0.5) * 12, // Reduced for gentler drift
        floatY: (Math.random() - 0.5) * 12,
        floatDuration: 3 + Math.random() * 3, // Slower, more ambient motion (3-6s)
      }
    })
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
      {/* Signal fragment noise - recognizable but unreadable chaos */}
      <motion.div
        className="absolute inset-0"
        variants={noiseCollapse}
        initial="initial"
        animate={isCollapsing ? 'collapsed' : 'initial'}
      >
        {/* Signal fragments - gentle floating, low opacity, no blinking */}
        {/* These fragments drift away when clarity emerges (STATE 1) */}
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
                  opacity: 0.4, // Lower opacity for subtlety - creates pressure, not panic
                  x: el.floatX,
                  y: el.floatY,
                }}
                transition={{
                  scale: {
                    duration: 0.4,
                    delay: el.popupDelay,
                    ease: [0.16, 1, 0.3, 1], // Smooth ease - no snap
                  },
                  opacity: {
                    duration: 0.4,
                    delay: el.popupDelay,
                    ease: 'easeOut',
                  },
                  // Gentle floating - ambient drift, no blinking or pulsing
                  x: {
                    duration: el.floatDuration,
                    delay: el.popupDelay + 0.4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut', // Smooth, not linear - more natural
                  },
                  y: {
                    duration: el.floatDuration * 1.15, // Slight parallax variation
                    delay: el.popupDelay + 0.4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
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

