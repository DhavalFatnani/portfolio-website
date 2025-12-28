'use client'

import { motion } from 'framer-motion'
import { useIntersection } from '@/hooks/use-intersection'
import { slideUp } from '@/lib/animations/motion-variants'

/**
 * ContactSection Component
 * Contact section placeholder that triggers the contact modal
 * This section is used as an anchor for smooth scrolling
 */
export function ContactSection() {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.3, triggerOnce: false })

  return (
    <section id="contact" ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={slideUp}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to scale your product operations or build better systems? Let&apos;s connect.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

