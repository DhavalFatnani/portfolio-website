'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { getHeroContent } from '@/lib/content/load-content'
import { AnimatedHeadline } from '@/components/ui/AnimatedHeadline'
import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations/motion-variants'

/**
 * HeroSection Component
 * Main hero section with animated headline, CTAs, and theme toggle
 * Content-driven from hero.json
 */
export function HeroSection() {
  const content = getHeroContent()

  const scrollToSection = (href: string) => {
    if (href === '#contact') {
      // Dispatch custom event to open contact modal
      window.dispatchEvent(new Event('openContact'))
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Theme Toggle - Top Right */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10"
      >
        <ThemeToggle />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        {/* Headline */}
        <motion.div variants={slideUp}>
          <AnimatedHeadline
            text={content.headline}
            as="h1"
            className="mb-4"
          />
        </motion.div>

        {/* Subheadline with Gradient */}
        <motion.div variants={slideUp}>
          <GradientText
            text={content.subheadline}
            gradient="default"
            as="h2"
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-6"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={slideUp}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {content.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={slideUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection(content.cta.primary.href)}
            className="group"
          >
            {content.cta.primary.text}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection(content.cta.secondary.href)}
          >
            {content.cta.secondary.text}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {content.scrollIndicator.enabled && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">
            {content.scrollIndicator.text}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

