'use client'

import { motion } from 'framer-motion'
import { useIntersection } from '@/hooks/use-intersection'
import { ArrowRight, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { staggerContainer, staggerItem, slideUp } from '@/lib/animations/motion-variants'
import type { CaseStudy } from '@/lib/content/types'

interface CaseStudiesListProps {
  caseStudies: CaseStudy[]
}

/**
 * CaseStudiesList Component
 * Displays scroll-revealed case study cards
 * Content-driven from MDX files in content/case-studies/
 */
export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.1, triggerOnce: false })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <section id="case-studies" ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={slideUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-muted-foreground text-lg">
            Real projects, real impact
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        {caseStudies.length > 0 ? (
          <motion.div
            initial="hidden"
            animate={isIntersecting ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {caseStudies.map((study) => (
              <motion.div key={study.slug} variants={staggerItem}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                          {study.frontmatter.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(study.frontmatter.date)}</span>
                          <span>•</span>
                          <span>{study.frontmatter.category}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {study.frontmatter.excerpt}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full group/btn"
                      onClick={() => {
                        // Navigate to case study detail page
                        console.log(`Navigate to case study: ${study.slug}`)
                      }}
                    >
                      Read Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate={isIntersecting ? 'visible' : 'hidden'}
            variants={slideUp}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No case studies found.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

