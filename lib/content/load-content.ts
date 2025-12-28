/**
 * Content loading utilities
 * Loads JSON content files with type safety
 * Note: For MDX case studies, use load-case-studies.ts (server-side only)
 */

import type {
  HeroContent,
  MetricsContent,
  SkillsContent,
  FoundersContent,
  SiteSettings,
} from './types'

// Import JSON content files
import heroContent from '@/content/hero.json'
import metricsContent from '@/content/metrics.json'
import skillsContent from '@/content/skills.json'
import foundersContent from '@/content/founders.json'
import siteSettings from '@/content/site-settings.json'

/**
 * Load hero content
 */
export function getHeroContent(): HeroContent {
  return heroContent as HeroContent
}

/**
 * Load metrics content
 */
export function getMetricsContent(): MetricsContent {
  return metricsContent as MetricsContent
}

/**
 * Load skills content
 */
export function getSkillsContent(): SkillsContent {
  return skillsContent as SkillsContent
}

/**
 * Load founders content
 */
export function getFoundersContent(): FoundersContent {
  return foundersContent as FoundersContent
}

/**
 * Load site settings
 */
export function getSiteSettings(): SiteSettings {
  return siteSettings as SiteSettings
}

