'use client'

import { motion } from 'framer-motion'
import { slowSlideUp } from '@/lib/animations/priority-motion'

/**
 * Context Anchor Component
 * 
 * Provides pattern-matching context without collapsing ambiguity.
 * Answers "When would I actually pull this person into the room?"
 * without adding roles, titles, skills, or explanations.
 * 
 * This is context, not a call to action.
 * Grounded, calm, clarifying - not persuasive.
 */
export function ContextAnchor() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          variants={slowSlideUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Line 1 - slightly emphasized, but not bold-heavy */}
          <p className="text-white/90 text-2xl md:text-3xl font-light">
            This is usually where I show up:
          </p>

          {/* Lines below - normal weight, spaced, no bullets */}
          {/* DO NOT rewrite this copy. DO NOT add punctuation or icons. DO NOT convert to a list UI. */}
          <div className="text-white/70 text-lg md:text-xl font-light leading-relaxed space-y-4 mt-12">
            <p>When things are moving fast, but thinking needs to slow down</p>
            <p>When decisions need to be calculated before chaos compounds</p>
            <p>When growth is inevitable — but direction still needs to be chosen</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

