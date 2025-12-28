'use client'

import { motion } from 'framer-motion'
import { slowFadeIn } from '@/lib/animations/priority-motion'
import type { Testimonial } from '@/lib/content/types'

interface TrustFootnoteProps {
  testimonial: Testimonial
  delay?: number
}

/**
 * Trust Footnote Component
 * 
 * This is NOT a testimonial card or quote block.
 * This is a quiet trust signal rendered as a footnote-style element.
 * 
 * Trust appears only after judgment is demonstrated.
 * Small text, low contrast, positioned subtly.
 * No decoration, no emphasis, no enthusiasm.
 */
export function TrustFootnote({ testimonial, delay = 0 }: TrustFootnoteProps) {
  return (
    <motion.div
      variants={slowFadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-white/30 text-xs md:text-sm font-light leading-relaxed"
    >
      {/* Footnote style - minimal, low contrast, no decoration */}
      {/* Use actual quote from founders.json - DO NOT invent copy */}
      {/* Neutral tone, not promotional - trust appears as consequence, not praise */}
      <span className="italic">{testimonial.quote}</span>
      <br />
      <span className="not-italic">
        — {testimonial.author}, {testimonial.role}
      </span>
    </motion.div>
  )
}

