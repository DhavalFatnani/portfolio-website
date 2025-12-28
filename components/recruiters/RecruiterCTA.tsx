'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { getSiteSettings } from '@/lib/content/load-content'
import { Button } from '@/components/ui/Button'
import { pulse, fadeIn } from '@/lib/animations/motion-variants'
import { cn } from '@/lib/utils/cn'

/**
 * RecruiterCTA Component
 * Sticky animated CTA for recruiters
 * Content-driven from site-settings.json
 */
export function RecruiterCTA() {
  const settings = getSiteSettings()
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (!settings.recruiterCTA.enabled) return

    // Show CTA after user scrolls past hero section
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [settings.recruiterCTA.enabled])

  const scrollToContact = () => {
    // Dispatch custom event to open contact modal
    window.dispatchEvent(new Event('openContact'))
    setIsMinimized(true)
  }

  if (!settings.recruiterCTA.enabled || !isVisible) {
    return null
  }

  return (
    <motion.div
      initial="hidden"
      animate={isMinimized ? 'hidden' : 'visible'}
      variants={fadeIn}
      className={cn(
        'fixed bottom-4 right-4 z-50',
        'max-w-sm'
      )}
    >
      <motion.div
        variants={pulse}
        animate="visible"
        className="bg-card border border-border rounded-lg shadow-2xl p-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1">
              {settings.recruiterCTA.text}
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              {settings.recruiterCTA.description}
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={scrollToContact}
                className="flex-1"
              >
                Let&apos;s Talk
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="p-2"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

