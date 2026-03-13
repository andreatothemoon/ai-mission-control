export interface ScenarioRoute {
  agentPath: string[];        // IDs for the network route
  knowledgePath: string[];    // knowledge node IDs to light up
  timelinePhases: number[];   // indices of timeline phases to activate (0-4)
  activePhase: number;        // current highlighted phase index
}

export const timelinePhases = [
  "IDEA",
  "COMPLIANCE REVIEW",
  "DESIGN",
  "ENGINEERING",
  "RELEASE",
] as const;

// Maps scenario id → route config
export const scenarioRoutes: Record<number, ScenarioRoute> = {
  1: {
    // Operational failure
    agentPath: ["MASTER_AGENT", "ASTRAOPS_AGENT"],
    knowledgePath: ["KNOWLEDGE_BASE"],
    timelinePhases: [0, 1, 2],
    activePhase: 2,
  },
  2: {
    // Consumer Duty compliance
    agentPath: ["MASTER_AGENT", "CASSANDRA_AGENT", "COBS_VOYAGER_AGENT"],
    knowledgePath: ["POLICIES", "KNOWLEDGE_BASE"],
    timelinePhases: [0, 1],
    activePhase: 1,
  },
  3: {
    // Product spec generation
    agentPath: ["MASTER_AGENT", "PRODUCT_SPACESHIP_AGENT"],
    knowledgePath: ["GITHUB", "KNOWLEDGE_BASE"],
    timelinePhases: [0, 1, 2, 3],
    activePhase: 3,
  },
};
