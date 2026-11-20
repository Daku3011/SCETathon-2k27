export interface Criterion {
  id: string;
  title: string;
  shortLabel: string;
  weight: number; // percentage (0 - 100)
  color: string; // hex color code
  contrastTextColor?: string;
  description: string;
  guidance: string[];
}

export const evaluationCriteria: Criterion[] = [
  {
    id: "innovation",
    title: "Innovation & Originality",
    shortLabel: "Innovation",
    weight: 25,
    color: "#D7FF54", // Bright Lime
    contrastTextColor: "#111210",
    description:
      "A clear original contribution, thoughtful problem framing, and a reason the engineering approach meaningfully improves on existing solutions.",
    guidance: [
      "A clear original contribution distinguishing the build from off-the-shelf templates and tutorials.",
      "Thoughtful problem framing addressing root systemic bottlenecks rather than surface symptoms.",
      "Demonstrated advancement and measurable improvement over existing market or open-source solutions.",
    ],
  },
  {
    id: "technical",
    title: "Technical Depth & Feasibility",
    shortLabel: "Technical Depth",
    weight: 25,
    color: "#B7D948", // Lime Olive
    contrastTextColor: "#111210",
    description:
      "Sound system architecture, appropriate technology choices, robust implementation, and an articulate explanation of engineering feasibility and trade-offs.",
    guidance: [
      "Robust system architecture with clear modularity, clean interfaces, and reliable data pipelines.",
      "Appropriate technology choices aligned with performance, compute, hardware, and power constraints.",
      "Realistic explanation of engineering feasibility, security posture, and recognized trade-offs.",
    ],
  },
  {
    id: "impact",
    title: "Practical Impact & Usefulness",
    shortLabel: "Practical Impact",
    weight: 20,
    color: "#91AD3C", // Olive Green
    contrastTextColor: "#111210",
    description:
      "An identifiable user or industry need, credible quantifiable benefits, and deliberate consideration of real-world adoption, cost, and deployment friction.",
    guidance: [
      "Identifiable user base, industry sector, or civic domain with an acute, validated pain point.",
      "Credible, quantifiable benefits in operational efficiency, sustainability, safety, or utility.",
      "Pragmatic awareness of real-world deployment challenges, cost structures, and adoption friction.",
    ],
  },
  {
    id: "prototype",
    title: "Completeness of Working Prototype",
    shortLabel: "Working Prototype",
    weight: 20,
    color: "#687E2B", // Forest Olive
    contrastTextColor: "#F2F0E8",
    description:
      "A functioning core user journey, tightly integrated components, and verifiable evidence that the primary build use-case actually executes under live evaluation.",
    guidance: [
      "Live execution of the primary end-to-end user journey during the 24-hour evaluation review.",
      "Functional integration across software UI, backend services, or physical hardware sensors.",
      "Verifiable proof that core capabilities work on live inputs rather than hardcoded mockups.",
    ],
  },
  {
    id: "pitch",
    title: "Pitch Clarity & Demonstration",
    shortLabel: "Pitch Clarity",
    weight: 10,
    color: "#43531E", // Deep Moss Olive
    contrastTextColor: "#F2F0E8",
    description:
      "A crisp problem-to-solution narrative, a focused live technical demonstration, and direct, technically grounded answers to jury inquiries.",
    guidance: [
      "Concise 3-minute problem-to-solution narrative articulating value and technical execution.",
      "Focused live demonstration highlighting real capabilities without defensive slide-only presentations.",
      "Direct, technically grounded responses to jury inquiries regarding architecture, data, and roadmap.",
    ],
  },
];

/**
 * Validates that all criteria weights sum to exactly 100%.
 */
export function validateWeights(list: Criterion[] = evaluationCriteria): {
  valid: boolean;
  total: number;
} {
  const total = list.reduce((sum, item) => sum + item.weight, 0);
  const valid = total === 100;
  if (!valid && typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    console.warn(`[Evaluation] Criteria weights sum to ${total}%, expected 100%.`);
  }
  return { valid, total };
}

// Immediate runtime check
validateWeights();
