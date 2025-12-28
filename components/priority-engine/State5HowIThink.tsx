'use client'

import { motion } from 'framer-motion'
import { slowFadeIn, slowSlideUp } from '@/lib/animations/priority-motion'
import { getDecisionTensions } from '@/lib/content/tension-mapping'
import { DecisionTension } from './DecisionTension'

/**
 * STATE 5: How I Think
 * 
 * This is NOT a skills section.
 * This is NOT a framework list.
 * This is NOT educational content.
 * 
 * This state exists to expose internal decision logic.
 * Every important decision is a tension, not a checklist.
 * 
 * Content reveals only after intentional interaction.
 * Motion is restrained and tactile - adjusting a system, not playing with UI.
 */
export function State5HowIThink() {
  const tensions = getDecisionTensions()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative">
      <div className="max-w-4xl mx-auto w-full space-y-20">
        {/* Entry text - single line */}
        <motion.div
          variants={slowFadeIn}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-white text-3xl md:text-4xl font-light">
            How I decide when trade-offs are real.
          </p>
        </motion.div>

        {/* Decision tensions - interactive elements, not buttons */}
        <motion.div
          variants={slowSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="space-y-16"
        >
          {tensions.map((tension) => (
            <DecisionTension key={tension.id} tension={tension} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

