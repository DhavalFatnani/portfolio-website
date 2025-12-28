/**
 * Framer Motion animation variants
 * Reusable animation presets for consistent motion throughout the site
 */

import { Variants } from 'framer-motion'

/**
 * Base animation settings
 */
const baseTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
}

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: baseTransition,
  },
}

/**
 * Fade in with scale
 */
export const fadeInScale: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
}

/**
 * Slide up animation
 */
export const slideUp: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
}

/**
 * Slide down animation
 */
export const slideDown: Variants = {
  hidden: { 
    opacity: 0,
    y: -20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
}

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0,
    x: -20,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
}

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0,
    x: 20,
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
}

/**
 * Stagger container for children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
}

/**
 * Stagger item for use within stagger container
 */
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
}

/**
 * Scale animation
 */
export const scale: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: baseTransition,
  },
}

/**
 * Modal/Overlay animation
 */
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const modalContent: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
}

/**
 * Pulse animation for CTAs
 */
export const pulse: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Hover scale animation
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
}

/**
 * Tap scale animation
 */
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 },
}

