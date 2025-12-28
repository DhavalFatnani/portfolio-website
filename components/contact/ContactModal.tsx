'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Linkedin, Github, Twitter } from 'lucide-react'
import { getSiteSettings } from '@/lib/content/load-content'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { modalBackdrop, modalContent } from '@/lib/animations/motion-variants'
import { cn } from '@/lib/utils/cn'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * ContactModal Component
 * Animated contact modal with entry/exit animations
 * Content-driven from site-settings.json
 */
export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const settings = getSiteSettings()

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${settings.email}`,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    ...(settings.social.linkedin
      ? [
          {
            name: 'LinkedIn',
            icon: Linkedin,
            href: settings.social.linkedin,
            color: 'hover:text-blue-600 dark:hover:text-blue-400',
          },
        ]
      : []),
    ...(settings.social.github
      ? [
          {
            name: 'GitHub',
            icon: Github,
            href: settings.social.github,
            color: 'hover:text-gray-800 dark:hover:text-gray-200',
          },
        ]
      : []),
    ...(settings.social.twitter
      ? [
          {
            name: 'Twitter',
            icon: Twitter,
            href: settings.social.twitter,
            color: 'hover:text-blue-400 dark:hover:text-blue-400',
          },
        ]
      : []),
  ]

  // Close on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            onKeyDown={handleKeyDown}
          >
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-md"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle id="contact-modal-title">Get in Touch</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    aria-label="Close contact modal"
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {settings.siteDescription}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Let&apos;s connect and discuss how I can help with your product operations and systems challenges.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Connect with me:</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-lg border border-border',
                              'hover:bg-accent transition-colors',
                              link.color
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="text-sm font-medium">{link.name}</span>
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>

                  {/* Email CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        window.location.href = `mailto:${settings.email}`
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

