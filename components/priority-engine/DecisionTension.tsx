'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slowFadeIn, slowSlideUp } from '@/lib/animations/priority-motion'
import type { DecisionTension } from '@/lib/content/tension-mapping'

interface DecisionTensionProps {
  tension: DecisionTension
}

/**
 * Decision Tension Component
 * 
 * This is NOT a skill badge or framework card.
 * This is an interactive tension that exposes internal decision logic.
 * 
 * Tensions force reflection before revealing judgment.
 * Interaction must feel intentional, not playful.
 * Motion is restrained and tactile - think "adjusting a system", not "playing with UI".
 */
export function DecisionTension({ tension }: DecisionTensionProps) {
  const [isInteracted, setIsInteracted] = useState(false)
  const [position, setPosition] = useState(50) // 0-100, center at 50
  const trackRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef<boolean>(false)

  // Nothing reveals until user interacts - click or drag only, no hover
  const handleInteraction = () => {
    if (!isInteracted) {
      setIsInteracted(true)
    }
  }

  // Handle mouse down on handle
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    e.preventDefault()
    isDragging.current = true
    handleInteraction()
    
    const updatePosition = (clientX: number) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const relativeX = clientX - rect.left
      const newPosition = (relativeX / rect.width) * 100
      const clampedPosition = Math.max(0, Math.min(100, newPosition))
      setPosition(clampedPosition)
    }

    updatePosition(e.clientX)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return
      updatePosition(moveEvent.clientX)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle slider drag or click
  const handlePositionChange = (newPosition: number) => {
    const clampedPosition = Math.max(0, Math.min(100, newPosition))
    handleInteraction()
    setPosition(clampedPosition)
  }

  // Calculate position from client X coordinate relative to track
  const getPositionFromClientX = (clientX: number): number => {
    if (!trackRef.current) return position
    const rect = trackRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    return Math.max(0, Math.min(100, percentage))
  }

  return (
    <div className="space-y-8">
      {/* Tension slider - primary UI */}
      <div className="space-y-4">
        {/* Labels */}
        <div className="flex justify-between text-sm text-white/40 font-light">
          <span>{tension.left}</span>
          <span>{tension.right}</span>
        </div>

        {/* Slider track */}
        <div ref={trackRef} className="relative">
          {/* Track background */}
          <div className="h-1 bg-white/10 rounded-full" />
          
          {/* Active track (filled portion) */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-white/30 rounded-full"
            style={{
              width: `${position}%`,
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Slider handle - using native mouse events to avoid Framer Motion transform conflicts */}
          <motion.div
            ref={handleRef}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full cursor-grab active:cursor-grabbing z-10"
            style={{
              left: `calc(${position}% - 8px)`,
            }}
            onMouseDown={handleMouseDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            aria-label={`Slider handle for ${tension.left} vs ${tension.right}`}
          />

          {/* Clickable track area */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={(e) => {
              const newPosition = getPositionFromClientX(e.clientX)
              handlePositionChange(newPosition)
            }}
            role="slider"
            aria-label={`Adjust ${tension.left} vs ${tension.right}`}
            aria-valuenow={position}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') handlePositionChange(position - 5)
              if (e.key === 'ArrowRight') handlePositionChange(position + 5)
            }}
          />
        </div>
      </div>

      {/* Content reveal - only after interaction */}
      <AnimatePresence>
        {isInteracted && (
          <motion.div
            key="content-reveal"
            variants={slowSlideUp}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Insight - one short line */}
            <p className="text-white/90 text-lg md:text-xl font-light">
              {tension.insight}
            </p>

            {/* Example - one lived micro-example, real and grounded */}
            <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
              {tension.example}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

