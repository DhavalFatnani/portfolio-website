'use client'

import { motion } from 'framer-motion'
import { useIntersection } from '@/hooks/use-intersection'
import { getSkillsContent } from '@/lib/content/load-content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { staggerContainer, staggerItem, slideUp, hoverScale } from '@/lib/animations/motion-variants'
import { cn } from '@/lib/utils/cn'

const levelColors = {
  beginner: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  intermediate: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  advanced: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
  expert: 'bg-green-500/20 text-green-600 dark:text-green-400',
}

/**
 * SkillsGrid Component
 * Interactive skills grid with hover effects
 * Content-driven from skills.json
 */
export function SkillsGrid() {
  const content = getSkillsContent()
  const { ref, isIntersecting } = useIntersection({ threshold: 0.1, triggerOnce: false })

  return (
    <section id="skills" ref={ref} className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={slideUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-muted-foreground text-lg">{content.description}</p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-12"
        >
          {content.categories.map((category, categoryIndex) => (
            <motion.div key={category.name} variants={staggerItem}>
              <h3 className="text-2xl font-semibold mb-6">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={staggerItem}
                    whileHover={hoverScale}
                    className="cursor-pointer"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{skill.name}</CardTitle>
                          <span
                            className={cn(
                              'px-2 py-1 text-xs rounded-full font-medium',
                              levelColors[skill.level]
                            )}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Thinking Frameworks */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={slideUp}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {content.thinking.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.thinking.frameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                variants={staggerItem}
                whileHover={hoverScale}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{framework.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {framework.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

