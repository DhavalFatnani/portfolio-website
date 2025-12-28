'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { slowFadeIn, slowSlideUp } from '@/lib/animations/priority-motion'
import { getFoundersContent } from '@/lib/content/load-content'
import { TrustFootnote } from './TrustFootnote'

/**
 * STATE 6: Trust Signals
 * 
 * This is NOT a testimonial section.
 * This is NOT social proof.
 * This is NOT a quote wall.
 * 
 * This state exists to quietly signal trust from leadership.
 * Trust should appear as a consequence of decisions — not as praise.
 * 
 * Trust signals fade in gently, positioned as footnotes.
 * Low contrast, small text, no decoration.
 * These should feel like "something you notice if you're paying attention."
 */
export function State6TrustSignals() {
  const content = getFoundersContent()
  const [showSignals, setShowSignals] = useState(false)

  // Entry text appears first, then trust signals reveal after a pause
  // Trust appears only after judgment is demonstrated
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignals(true)
    }, 2000) // Pause after entry text, then reveal signals

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative">
      <div className="max-w-4xl mx-auto w-full space-y-16">
        {/* Entry text - single, understated line */}
        <motion.div
          variants={slowFadeIn}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-white/70 text-2xl md:text-3xl font-light">
            Some decisions are not made alone.
          </p>
        </motion.div>

        {/* Trust signals - rendered as footnotes */}
        {/* Small text, low contrast, positioned subtly - feels optional but meaningful */}
        {showSignals && (
          <motion.div
            variants={slowSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            {content.testimonials.map((testimonial, index) => (
              <TrustFootnote
                key={`${testimonial.author}-${index}`}
                testimonial={testimonial}
                delay={index * 0.3} // Stagger reveals gently
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

