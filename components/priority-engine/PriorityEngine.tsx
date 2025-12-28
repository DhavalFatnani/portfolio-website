'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { State0EntryNoise } from './State0EntryNoise'
import { State1PriorityIntervention } from './State1PriorityIntervention'
import { State2Identity } from './State2Identity'
import { State3ScaleUnderPressure } from './State3ScaleUnderPressure'
import { State4DecisionRooms } from './State4DecisionRooms'
import { State5HowIThink } from './State5HowIThink'
import { State6TrustSignals } from './State6TrustSignals'
import { ContextAnchor } from './ContextAnchor'
import { State7TheInvitation } from './State7TheInvitation'
import type { CaseStudySections } from '@/lib/content/parse-case-study'

interface CaseStudyData {
  slug: string
  sections: CaseStudySections
}

interface PriorityEngineProps {
  caseStudies?: CaseStudyData[]
}

/**
 * Priority Engine
 * Main orchestrator for state-based experience
 * Controls progressive revelation of content
 */
export function PriorityEngine({ caseStudies = [] }: PriorityEngineProps) {
  const [state0Complete, setState0Complete] = useState(false)
  const [viewState, setViewState] = useState<number>(0)

  // STATE 0: Entry Noise (fixed position, covers screen initially)
  if (!state0Complete) {
    return (
      <State0EntryNoise
        onComplete={() => {
          setState0Complete(true)
          setViewState(1) // Immediately show STATE 1
        }}
      />
    )
  }

  // STATES 1-6: Progressive content (render after STATE 0 completes)
  return <PriorityEngineContent currentState={viewState} onStateChange={setViewState} caseStudies={caseStudies} />
}

/**
 * Priority Engine Content
 * Renders states 1-6 progressively
 */
function PriorityEngineContent({
  currentState,
  onStateChange,
  caseStudies,
}: {
  currentState: number
  onStateChange: (state: number) => void
  caseStudies: CaseStudyData[]
}) {
  // Auto-advance STATE 1 -> STATE 2 after a delay (let user read the thesis)
  useEffect(() => {
    if (currentState === 1) {
      const timer = setTimeout(() => {
        onStateChange(2)
      }, 3000) // Allow 3 seconds to read STATE 1
      return () => clearTimeout(timer)
    }
  }, [currentState, onStateChange])

  // Scroll-based state advancement for STATE 2+
  // STATE 3 begins to appear immediately on scroll - psychological reinforcement for curiosity
  // STATE 4 appears after STATE 3 is scrolled through
  useEffect(() => {
    if (currentState < 2) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const scrollProgress = scrollY / windowHeight

      // Immediate response to scroll - STATE 3 appears as soon as user scrolls
      // This makes scroll feel rewarding and responsive
      if (scrollProgress > 0.1 && currentState < 3) {
        onStateChange(3)
      }
      
      // STATE 4 appears after scrolling through STATE 3
      // User should have engaged with scale content before seeing decision rooms
      if (scrollProgress > 1.5 && currentState < 4 && caseStudies.length > 0) {
        onStateChange(4)
      }
      
      // STATE 5 appears after scrolling through STATE 4
      // User should have experienced decision rooms before seeing decision tensions
      if (scrollProgress > 2.5 && currentState < 5) {
        onStateChange(5)
      }
      
      // STATE 6 appears after scrolling through STATE 5
      // User should have engaged with decision tensions before seeing trust signals
      if (scrollProgress > 3.5 && currentState < 6) {
        onStateChange(6)
      }
      
      // Context Anchor appears after scrolling through STATE 6
      // Provides pattern-matching context before the invitation
      if (scrollProgress > 4.5 && currentState < 6.5) {
        onStateChange(6.5)
      }
      
      // STATE 7 appears after the context anchor
      // User now has clarity before seeing the invitation
      // The invitation feels like a natural conclusion, not a request
      if (scrollProgress > 5.5 && currentState < 7) {
        onStateChange(7)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentState, onStateChange, caseStudies.length])

  return (
    <main className="bg-black text-white">
      {currentState >= 1 && <State1PriorityIntervention />}
      {currentState >= 2 && <State2Identity />}
      {/* STATE 3 begins to fade/slide in immediately when scroll starts - feels rewarding */}
      {currentState >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <State3ScaleUnderPressure />
        </motion.div>
      )}
      
      {/* STATE 4: Decision Rooms - experience judgment and trade-offs */}
      {/* Motion feels like opening a file, not flipping slides - calm, confident, precise */}
      {currentState >= 4 && caseStudies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <State4DecisionRooms caseStudies={caseStudies} />
        </motion.div>
      )}
      
      {/* STATE 5: How I Think - expose internal decision logic */}
      {/* This is NOT a skills section - it's about decision tensions */}
      {/* Motion is restrained and tactile - adjusting a system, not playing with UI */}
      {currentState >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <State5HowIThink />
        </motion.div>
      )}
      
      {/* STATE 6: Trust Signals - quietly signal trust from leadership */}
      {/* This is NOT a testimonial section - it's about trust as a consequence of decisions */}
      {/* Trust signals fade in gently, positioned as footnotes - low contrast, small text */}
      {currentState >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <State6TrustSignals />
        </motion.div>
      )}
      
      {/* Context Anchor - quiet bridge between trust signals and invitation */}
      {/* Provides pattern-matching context without collapsing ambiguity */}
      {/* Answers "When would I actually pull this person into the room?" without adding roles/titles/skills */}
      {/* This is context, not a call to action - grounded, calm, clarifying */}
      {currentState >= 6.5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ContextAnchor />
        </motion.div>
      )}
      
      {/* STATE 7: The Invitation - natural conclusion, not a request */}
      {/* This is NOT a contact section - it's a door left open */}
      {/* Restraint is the message - calm, optional, confident */}
      {currentState >= 7 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <State7TheInvitation />
        </motion.div>
      )}
      {/* Spacer to ensure scroll works */}
      <div className="min-h-screen" />
    </main>
  )
}
