'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/theme/use-theme'
import { Button } from '@/components/ui/Button'
import { fadeInScale } from '@/lib/animations/motion-variants'

/**
 * ThemeToggle Component
 * Button to toggle between light and dark themes
 * Supports system preference detection and manual toggle
 */
export function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme()

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" aria-label="Toggle theme" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInScale}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  )
}

