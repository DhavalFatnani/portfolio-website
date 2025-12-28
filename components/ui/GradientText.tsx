'use client'

import { cn } from '@/lib/utils/cn'

interface GradientTextProps {
  text: string
  className?: string
  gradient?: 'default' | 'purple' | 'blue' | 'pink'
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * GradientText Component
 * Displays text with gradient background
 * Based on Magic UI gradient text patterns
 */
export function GradientText({
  text,
  className = '',
  gradient = 'default',
  as: Component = 'span',
}: GradientTextProps) {
  const gradientClasses = {
    default: 'bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent',
    purple: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-blue-400',
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400',
    pink: 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-rose-400',
  }

  return (
    <Component className={cn('inline-block', gradientClasses[gradient], className)}>
      {text}
    </Component>
  )
}

