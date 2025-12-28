/**
 * Parse case study MDX content into structured sections
 * Extracts Challenge, Approach, Results, Key Learnings
 * Used for Decision Rooms - NOT for rendering full articles
 */

export interface CaseStudySections {
  challenge: string
  approach: string
  outcome: string
  learning: string
}

/**
 * Parse markdown content into structured sections
 * Looks for ## headings: Challenge, Approach, Results, Key Learnings
 */
export function parseCaseStudyContent(content: string): CaseStudySections {
  // Remove frontmatter if present (should already be removed, but safety check)
  const cleanContent = content.replace(/^---[\s\S]*?---\n/, '')

  // Extract sections using markdown heading patterns
  const challengeMatch = cleanContent.match(/##\s+Challenge\s*\n([\s\S]*?)(?=##|$)/i)
  const approachMatch = cleanContent.match(/##\s+Approach\s*\n([\s\S]*?)(?=##|$)/i)
  const resultsMatch = cleanContent.match(/##\s+Results?\s*\n([\s\S]*?)(?=##|$)/i)
  const learningMatch = cleanContent.match(/##\s+Key\s+Learnings?\s*\n([\s\S]*?)(?=##|$)/i)

  // Clean extracted text - remove markdown formatting but preserve structure
  const cleanText = (text: string): string => {
    return text
      .trim()
      // Remove markdown list markers but keep content
      .replace(/^[-*+]\s+/gm, '')
      // Remove markdown bold/italic but keep text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      // Remove markdown links but keep text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      // Remove numbered list markers
      .replace(/^\d+\.\s+/gm, '')
      // Clean up extra whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  return {
    challenge: cleanText(challengeMatch?.[1] || ''),
    approach: cleanText(approachMatch?.[1] || ''),
    outcome: cleanText(resultsMatch?.[1] || ''),
    learning: cleanText(learningMatch?.[1] || ''),
  }
}

