'use client'

import { useState, useEffect } from 'react'

export type PriorityEngineState = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * Priority Engine State Management
 * Controls progressive revelation of content
 * States transition based on scroll depth and time
 */
export function usePriorityEngine() {
  const [currentState, setCurrentState] = useState<PriorityEngineState>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Scroll-based state advancement (only for states 1+)
  useEffect(() => {
    if (!isLoaded || currentState < 1) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const scrollProgress = scrollY / windowHeight

      // STATE 1 -> STATE 2: After initial scroll
      if (scrollProgress > 0.1 && currentState < 2) {
        setCurrentState(2)
      }
      // STATE 2 -> STATE 3: Further scroll
      else if (scrollProgress > 0.4 && currentState < 3) {
        setCurrentState(3)
      }
      // STATE 3 -> STATE 4: Continue progression
      else if (scrollProgress > 0.7 && currentState < 4) {
        setCurrentState(4)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentState, isLoaded])

  const advanceState = () => {
    if (currentState < 6) {
      setCurrentState((prev) => (prev + 1) as PriorityEngineState)
    }
  }

  return {
    currentState,
    advanceState,
    isLoaded,
  }
}

