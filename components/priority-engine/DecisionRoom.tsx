'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slowFadeIn, slowSlideUp } from '@/lib/animations/priority-motion'
import type { CaseStudySections } from '@/lib/content/parse-case-study'

/**
 * Decision Paths
 * User must choose one before content reveals
 */
export type DecisionPath = 'Speed' | 'Reliability' | 'Automation' | 'Control'

interface DecisionRoomProps {
  sections: CaseStudySections
  onComplete?: () => void
}

/**
 * Decision Room Component
 * 
 * This is NOT a case study article.
 * This is an experience of judgment and trade-offs.
 * 
 * User must choose a decision path before any content reveals.
 * Content reveals in layers: challenge → approach → outcome → learning
 * 
 * Motion feels like opening a file, not flipping slides.
 * Directional: top → bottom. Calm, confident, precise.
 */
export function DecisionRoom({ sections, onComplete }: DecisionRoomProps) {
  const [selectedPath, setSelectedPath] = useState<DecisionPath | null>(null)
  const [revealedLayers, setRevealedLayers] = useState<{
    challenge: boolean
    approach: boolean
    outcome: boolean
    learning: boolean
  }>({
    challenge: false,
    approach: false,
    outcome: false,
    learning: false,
  })

  const decisionPaths: DecisionPath[] = ['Speed', 'Reliability', 'Automation', 'Control']

  // Forcing a decision before revealing outcomes mirrors real trade-off moments
  // No content reveals automatically - user must commit to a path
  const handlePathSelect = (path: DecisionPath) => {
    if (selectedPath) return // Already selected
    setSelectedPath(path)
    // Reveal challenge immediately after selection
    setRevealedLayers((prev) => ({ ...prev, challenge: true }))
  }

  // Reveal next layer - triggered by scroll or continue interaction
  const revealNextLayer = () => {
    if (!selectedPath) return

    if (!revealedLayers.challenge) {
      setRevealedLayers((prev) => ({ ...prev, challenge: true }))
    } else if (!revealedLayers.approach) {
      setRevealedLayers((prev) => ({ ...prev, approach: true }))
    } else if (!revealedLayers.outcome) {
      setRevealedLayers((prev) => ({ ...prev, outcome: true }))
    } else if (!revealedLayers.learning) {
      setRevealedLayers((prev) => ({ ...prev, learning: true }))
      // All layers revealed - notify parent
      onComplete?.()
    }
  }

  // Auto-reveal next layer when previous is visible (with delay for reading rhythm)
  const handleLayerVisible = (layer: keyof typeof revealedLayers) => {
    if (layer === 'challenge' && revealedLayers.challenge && !revealedLayers.approach) {
      setTimeout(() => setRevealedLayers((prev) => ({ ...prev, approach: true })), 2000)
    } else if (layer === 'approach' && revealedLayers.approach && !revealedLayers.outcome) {
      setTimeout(() => setRevealedLayers((prev) => ({ ...prev, outcome: true })), 2000)
    } else if (layer === 'outcome' && revealedLayers.outcome && !revealedLayers.learning) {
      setTimeout(() => setRevealedLayers((prev) => ({ ...prev, learning: true })), 2000)
      setTimeout(() => onComplete?.(), 3000)
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative">
      <div className="max-w-4xl mx-auto w-full space-y-16">
        {/* Entry text - shown before decision */}
        {!selectedPath && (
          <motion.div
            variants={slowFadeIn}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <p className="text-white text-3xl md:text-4xl font-light">
              At this moment, everything couldn&apos;t be done.
            </p>
          </motion.div>
        )}

        {/* Decision paths - choices, not tabs */}
        {!selectedPath && (
          <motion.div
            variants={slowSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {decisionPaths.map((path) => (
              <button
                key={path}
                onClick={() => handlePathSelect(path)}
                className="px-6 py-4 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={`Choose ${path} as priority`}
              >
                <span className="text-lg font-light">{path}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Content reveal - one layer at a time */}
        <AnimatePresence mode="wait">
          {selectedPath && (
            <motion.div
              key="content-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {/* Challenge */}
              <AnimatePresence>
                {revealedLayers.challenge && (
                  <motion.div
                    key="challenge"
                    variants={slowSlideUp}
                    initial="hidden"
                    animate="visible"
                    onAnimationComplete={() => handleLayerVisible('challenge')}
                    className="space-y-4"
                  >
                    <h3 className="text-white/50 text-sm uppercase tracking-wider font-light">
                      Challenge
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                      {sections.challenge}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Approach */}
              <AnimatePresence>
                {revealedLayers.approach && (
                  <motion.div
                    key="approach"
                    variants={slowSlideUp}
                    initial="hidden"
                    animate="visible"
                    onAnimationComplete={() => handleLayerVisible('approach')}
                    className="space-y-4"
                  >
                    <h3 className="text-white/50 text-sm uppercase tracking-wider font-light">
                      Approach
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                      {sections.approach}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Outcome */}
              <AnimatePresence>
                {revealedLayers.outcome && (
                  <motion.div
                    key="outcome"
                    variants={slowSlideUp}
                    initial="hidden"
                    animate="visible"
                    onAnimationComplete={() => handleLayerVisible('outcome')}
                    className="space-y-4"
                  >
                    <h3 className="text-white/50 text-sm uppercase tracking-wider font-light">
                      Outcome
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                      {sections.outcome}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Learning */}
              <AnimatePresence>
                {revealedLayers.learning && (
                  <motion.div
                    key="learning"
                    variants={slowSlideUp}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <h3 className="text-white/50 text-sm uppercase tracking-wider font-light">
                      Learning
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line">
                      {sections.learning}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

