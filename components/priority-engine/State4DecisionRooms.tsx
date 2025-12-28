'use client'

import { useState, useEffect } from 'react'
import { DecisionRoom } from './DecisionRoom'
import type { CaseStudySections } from '@/lib/content/parse-case-study'

interface CaseStudyData {
  slug: string
  sections: CaseStudySections
}

interface State4DecisionRoomsProps {
  caseStudies: CaseStudyData[]
}

/**
 * STATE 4: Decision Rooms
 * 
 * This is NOT a case study list.
 * This is NOT a blog.
 * This is NOT an article reader.
 * 
 * This state exists to let users EXPERIENCE judgment and trade-offs.
 * Each case study is a moment where &quot;Everything couldn&apos;t be done.&quot;
 * User must choose a priority before seeing outcomes.
 * 
 * Content reveals in layers: challenge → approach → outcome → learning
 * Motion feels like opening a file, not flipping slides.
 * Directional: top → bottom. Calm, confident, precise.
 */
export function State4DecisionRooms({ caseStudies }: State4DecisionRoomsProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [completedRooms, setCompletedRooms] = useState<Set<number>>(new Set())

  // Handle completion of a Decision Room
  const handleRoomComplete = () => {
    setCompletedRooms((prev) => new Set(prev).add(currentRoomIndex))
    
    // After a brief pause, allow scroll to next room
    // The UI should feel complete - let the insight sit
    setTimeout(() => {
      // User can scroll to see next room, or it auto-advances after delay
      if (currentRoomIndex < caseStudies.length - 1) {
        // Auto-advance after 3 seconds of completion
        setTimeout(() => {
          setCurrentRoomIndex((prev) => prev + 1)
        }, 3000)
      }
    }, 2000)
  }

  // Scroll-based navigation to next room (optional - user can scroll naturally)
  useEffect(() => {
    const handleScroll = () => {
      if (completedRooms.has(currentRoomIndex) && currentRoomIndex < caseStudies.length - 1) {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const currentRoomBottom = (currentRoomIndex + 1) * windowHeight
        
        // If scrolled past current room, show next
        if (scrollY > currentRoomBottom * 0.7) {
          setCurrentRoomIndex((prev) => Math.min(prev + 1, caseStudies.length - 1))
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentRoomIndex, completedRooms, caseStudies.length])

  if (caseStudies.length === 0) {
    return null
  }

  return (
    <>
      {/* Render all rooms up to current index + 1 (show next room when current completes) */}
      {caseStudies.slice(0, currentRoomIndex + 1).map((caseStudy, index) => (
        <DecisionRoom
          key={caseStudy.slug}
          sections={caseStudy.sections}
          onComplete={index === currentRoomIndex ? handleRoomComplete : undefined}
        />
      ))}
    </>
  )
}

