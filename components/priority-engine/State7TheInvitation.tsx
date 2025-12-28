'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slowFadeIn, slowSlideUp } from '@/lib/animations/priority-motion'
import { getSiteSettings } from '@/lib/content/load-content'

/**
 * STATE 7: Final Invitation
 * 
 * This is NOT a contact section.
 * This is NOT a pitch.
 * This is NOT urgency-driven.
 * 
 * CTA appears only after judgment, trust, and context are established.
 * The invitation should answer: "Is it appropriate for me to reach out?"
 * NOT: "Please contact me" or "Hire me"
 * 
 * One invitation. One place. One moment.
 * Must feel inevitable, not persuasive. Appropriate, not needy. Senior.
 */
export function State7TheInvitation() {
  const siteSettings = getSiteSettings()
  const [showAffordance, setShowAffordance] = useState(false)

  // Reveal affordance after short pause (1.5-2s) OR on user intent
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAffordance(true)
    }, 1750) // 1.75s pause - between 1.5-2s range
    return () => clearTimeout(timer)
  }, [])

  // Extract email prefix for subtle reveal (e.g., "dhaval@...")
  const emailPrefix = siteSettings.email.split('@')[0]
  const emailDomain = siteSettings.email.split('@')[1] || ''

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative">
      <div className="max-w-4xl mx-auto w-full text-center space-y-8">
        {/* Primary CTA copy - locked, DO NOT rewrite */}
        <motion.div
          variants={slowFadeIn}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <p className="text-white/80 text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
            If your company needs direction — not noise — we should talk.
          </p>

          {/* Secondary affordance - revealed after pause OR on hover/tap/focus */}
          {/* Minimal affordance - subtle email reveal */}
          {/* No button styling, no bright colors, no borders, no background blocks */}
          {/* Must feel optional, not demanded - a door left open */}
          <div className="mt-16 min-h-[2rem]">
            <AnimatePresence mode="wait">
              {showAffordance ? (
                <motion.div
                  key="affordance"
                  variants={slowSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/40 text-base md:text-lg font-light"
                >
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="hover:text-white/60 transition-colors duration-300 cursor-pointer inline-block"
                    onClick={(e) => {
                      // Ensure mailto link opens email client
                      e.preventDefault()
                      e.stopPropagation()
                      window.location.href = `mailto:${siteSettings.email}`
                    }}
                  >
                    {emailPrefix}@...
                  </a>
                </motion.div>
              ) : (
                <div
                  key="trigger"
                  className="cursor-pointer"
                  onMouseEnter={() => setShowAffordance(true)}
                  onFocus={() => setShowAffordance(true)}
                  onClick={() => setShowAffordance(true)}
                  tabIndex={0}
                  role="button"
                  aria-label="Reveal contact"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

