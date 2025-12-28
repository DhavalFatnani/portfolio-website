'use client'

import { motion } from 'framer-motion'
import { useIntersection } from '@/hooks/use-intersection'
import { getMetricsContent } from '@/lib/content/load-content'
import { Card, CardContent } from '@/components/ui/Card'
import { staggerContainer, staggerItem, fadeInScale } from '@/lib/animations/motion-variants'
import { useState, useEffect } from 'react'
import { Rocket, TrendingUp, Users, Server } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  'trending-up': TrendingUp,
  users: Users,
  server: Server,
}

interface AnimatedCounterProps {
  value: string
  duration?: number
}

/**
 * AnimatedCounter Component
 * Animates numeric values from 0 to target value
 */
function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const suffix = value.replace(/[0-9.]/g, '')

  useEffect(() => {
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = numericValue * easeOutQuart
      setDisplayValue(currentValue.toFixed(0) + suffix)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }
    animate()
  }, [value, numericValue, suffix, duration])

  return <span>{displayValue}</span>
}

/**
 * MetricsSnapshot Component
 * Displays animated metric cards with icons
 * Content-driven from metrics.json
 */
export function MetricsSnapshot() {
  const content = getMetricsContent()
  const { ref, isIntersecting } = useIntersection({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="metrics" ref={ref} className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-muted-foreground text-lg">
            {content.description}
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {content.metrics.map((metric, index) => {
            const Icon = iconMap[metric.icon] || Server
            return (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      variants={fadeInScale}
                      className="flex justify-center mb-4"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold mb-2"
                      variants={fadeInScale}
                    >
                      {isIntersecting && <AnimatedCounter value={metric.value} />}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{metric.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

