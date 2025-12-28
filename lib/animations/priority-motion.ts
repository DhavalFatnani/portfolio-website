/**
 * Priority Engine Motion Variants
 * Slow, deliberate, purposeful animations
 * No bounce, no playful easing
 */

import { Variants } from 'framer-motion'

/**
 * Slow, deliberate transition base
 */
const slowTransition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1], // Slow ease-out
}

const verySlowTransition = {
  duration: 2.0,
  ease: [0.16, 1, 0.3, 1],
}

/**
 * Slow fade in - for text reveals
 * Ensures full opacity for readability
 */
export const slowFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Very slow fade in - for important reveals
 */
export const verySlowFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: verySlowTransition,
  },
}

/**
 * Slow text reveal - character by character (simulated)
 */
export const textReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Slow slide up - for content that should appear from below
 */
export const slowSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: slowTransition,
  },
}

/**
 * Noise collapse - for STATE 0 -> STATE 1 transition
 */
export const noiseCollapse: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  collapsed: {
    opacity: 0.1,
    scale: 0.8,
    transition: {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Focus reveal - for priority intervention
 */
export const focusReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: verySlowTransition,
  },
}

/**
 * System instability -> stabilization
 * For STATE 3 scale visualization
 */
export const stabilize: Variants = {
  unstable: {
    x: [-2, 2, -1, 1, 0],
    opacity: [0.7, 0.9, 0.8, 0.95, 1],
    transition: {
      duration: 3.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  stable: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Ambient background drift
 * Subtle vertical motion to imply "system running calmly"
 * For STATE 2 - creates life without distracting from text
 */
export const ambientDrift: Variants = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: {
    y: [0, -2, 0],
    opacity: 0.03,
    transition: {
      duration: 8,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

/**
 * Scroll invitation - gravity-pull downward jump
 * Chevron falls down and is pulled by gravity - component handles reset to avoid drag up
 */
export const scrollInvitation: Variants = {
  hidden: {
    opacity: 0,
  },
  fall: {
    opacity: 0.5, // Lower contrast - noticeable but ignorable
    y: 12, // Falls down 12px - pulled by gravity
    transition: {
      duration: 0.5, // Quick fall - gravity accelerates it down
      ease: [0.4, 0, 0.8, 1], // Ease-out - accelerates downward like gravity
    },
  },
  reset: {
    opacity: 0.5,
    y: 0, // Instant reset to start position (handled by component)
    transition: {
      duration: 0, // Instant - no drag up
    },
  },
}

