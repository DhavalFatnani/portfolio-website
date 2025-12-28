/**
 * TypeScript types for content files
 * Ensures type safety when loading and using content
 */

export interface HeroContent {
  headline: string
  subheadline: string
  description: string
  cta: {
    primary: {
      text: string
      href: string
    }
    secondary: {
      text: string
      href: string
    }
  }
  scrollIndicator: {
    text: string
    enabled: boolean
  }
}

export interface Metric {
  value: string
  label: string
  description: string
  icon: string
}

export interface MetricsContent {
  title: string
  description: string
  metrics: Metric[]
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  description: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface ThinkingFramework {
  name: string
  description: string
}

export interface SkillsContent {
  title: string
  description: string
  categories: SkillCategory[]
  thinking: {
    title: string
    frameworks: ThinkingFramework[]
  }
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export interface FoundersContent {
  title: string
  description: string
  testimonials: Testimonial[]
  stats: {
    projects: string
    companies: string
    years: string
  }
}

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
  email?: string
}

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export interface RecruiterCTAConfig {
  enabled: boolean
  text: string
  description: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  author: string
  email: string
  social: SocialLinks
  theme: {
    defaultMode: 'light' | 'dark' | 'system'
    enableManualToggle: boolean
  }
  seo: SEOConfig
  recruiterCTA: RecruiterCTAConfig
}

export interface CaseStudyFrontmatter {
  title: string
  slug: string
  date: string
  category: string
  thumbnail?: string
  excerpt: string
  tags: string[]
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter
  content: string
  slug: string
}

