/**
 * Server-side case studies loading
 * Uses Node.js fs module - must only be imported in server components
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { CaseStudy } from './types'

/**
 * Load all case studies from MDX files
 * Reads MDX files from content/case-studies/ directory
 * Server-side only - do not import in client components
 */
export function getCaseStudies(): CaseStudy[] {
  const caseStudiesDirectory = join(process.cwd(), 'content', 'case-studies')
  
  try {
    const fileNames = readdirSync(caseStudiesDirectory)
    const mdxFiles = fileNames.filter((name) => name.endsWith('.mdx'))

    const caseStudies = mdxFiles.map((fileName) => {
      const fullPath = join(caseStudiesDirectory, fileName)
      const fileContents = readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        frontmatter: {
          title: data.title || '',
          slug: data.slug || fileName.replace('.mdx', ''),
          date: data.date || '',
          category: data.category || '',
          thumbnail: data.thumbnail || '',
          excerpt: data.excerpt || '',
          tags: data.tags || [],
        },
        content,
        slug: data.slug || fileName.replace('.mdx', ''),
      } as CaseStudy
    })

    // Sort by date, newest first
    return caseStudies.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error loading case studies:', error)
    return []
  }
}

/**
 * Load a single case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const caseStudies = getCaseStudies()
  return caseStudies.find(cs => cs.slug === slug) || null
}

/**
 * Get all case study slugs
 */
export function getCaseStudySlugs(): string[] {
  const caseStudies = getCaseStudies()
  return caseStudies.map(cs => cs.slug)
}

