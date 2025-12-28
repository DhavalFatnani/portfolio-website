'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/hero/HeroSection'
import { MetricsSnapshot } from '@/components/metrics/MetricsSnapshot'
import { CaseStudiesList } from '@/components/case-studies/CaseStudiesList'
import { SkillsGrid } from '@/components/skills/SkillsGrid'
import { ContactSection } from '@/components/contact/ContactSection'
import { ContactModal } from '@/components/contact/ContactModal'
import { RecruiterCTA } from '@/components/recruiters/RecruiterCTA'
import type { CaseStudy } from '@/lib/content/types'

interface HomeClientProps {
  caseStudies: CaseStudy[]
}

/**
 * Home Client Component
 * Client-side component that handles interactivity
 */
export function HomeClient({ caseStudies }: HomeClientProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // Handle hash navigation to open contact modal
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setIsContactModalOpen(true)
      }
    }

    // Check initial hash
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)

    // Listen for custom events from RecruiterCTA
    const handleOpenContact = () => {
      setIsContactModalOpen(true)
    }
    window.addEventListener('openContact', handleOpenContact)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('openContact', handleOpenContact)
    }
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection />
      <MetricsSnapshot />
      <CaseStudiesList caseStudies={caseStudies} />
      <SkillsGrid />
      <ContactSection />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false)
          // Remove hash from URL when closing
          if (window.location.hash === '#contact') {
            window.history.pushState('', document.title, window.location.pathname)
          }
        }}
      />
      <RecruiterCTA />
    </main>
  )
}

