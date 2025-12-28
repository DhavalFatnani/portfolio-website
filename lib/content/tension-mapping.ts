/**
 * Decision Tension Mapping
 * Transforms skills content into decision tensions
 * This is NOT a skills list - it's about internal decision logic
 */

export interface DecisionTension {
  id: string
  left: string
  right: string
  insight: string
  example: string
}

/**
 * Decision Tensions
 * Every important decision is a tension, not a checklist
 * These reflect real trade-offs from lived experience
 */
export const DECISION_TENSIONS: DecisionTension[] = [
  {
    id: 'speed-stability',
    left: 'Speed',
    right: 'Stability',
    insight: 'Speed wins early. Stability decides survival.',
    example: 'Moving fast to launch, then slowing to systemize the bottlenecks that actually matter.',
  },
  {
    id: 'automation-judgment',
    left: 'Automation',
    right: 'Human judgment',
    insight: 'Automation helps until judgment is required.',
    example: 'Automated workflows for routine tasks, but keeping humans in the loop where decisions create real impact.',
  },
  {
    id: 'scale-control',
    left: 'Scale',
    right: 'Control',
    insight: 'Scale demands systems. Control demands visibility.',
    example: 'Building processes that work at 10x, while maintaining clear signals for when to intervene.',
  },
  {
    id: 'precision-momentum',
    left: 'Precision',
    right: 'Momentum',
    insight: 'Precision without momentum is paralysis. Momentum without precision is waste.',
    example: 'Making good-enough decisions quickly, then refining based on what actually matters.',
  },
]

/**
 * Get all decision tensions
 */
export function getDecisionTensions(): DecisionTension[] {
  return DECISION_TENSIONS
}

