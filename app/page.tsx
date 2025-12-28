import { PriorityEngine } from '@/components/priority-engine/PriorityEngine'
import { getCaseStudies } from '@/lib/content/load-case-studies'
import { parseCaseStudyContent } from '@/lib/content/parse-case-study'

/**
 * Priority Engine
 * State-based experience that demonstrates decision-making and prioritization
 */
export default async function Home() {
  // Load and parse case studies server-side for STATE 4
  const caseStudies = getCaseStudies()
  const parsedCaseStudies = caseStudies.map((cs) => ({
    slug: cs.slug,
    sections: parseCaseStudyContent(cs.content),
  }))

  return <PriorityEngine caseStudies={parsedCaseStudies} />
}

