export interface AgentNodeData {
  id: string;
  name: string;
  description: string;
}

export const masterAgent: AgentNodeData = {
  id: "MASTER_AGENT",
  name: "MASTER AGENT",
  description: "Routes and orchestrates all agent tasks",
};

export const specialistAgents: AgentNodeData[] = [
  { id: "CASSANDRA_AGENT", name: "CASSandra Agent", description: "Customer analytics & sentiment" },
  { id: "ASTRAOPS_AGENT", name: "AstraOps Agent", description: "Operational processes & SOPs" },
  { id: "COBS_VOYAGER_AGENT", name: "COBS Voyager Agent", description: "Customer outcome tracking" },
  { id: "PRODUCT_SPACESHIP_AGENT", name: "Product Spaceship Agent", description: "Product specs & documentation" },
  { id: "ASTEROIDS_INCIDENT_AGENT", name: "Asteroids Incident Agent", description: "Incident intelligence" },
  { id: "INSIGHT_SATELLITE_AGENT", name: "Insight Satellite Network", description: "Data insights & reporting" },
  { id: "OBSERVATORY_AGENT", name: "Observatory Agent", description: "Competitor research" },
  { id: "MARS_FUND_AGENT", name: "Mars Fund Agent", description: "Investments & assets" },
  { id: "LAUNCHPAD_AGENT", name: "Launchpad Agent", description: "Content writing" },
];

export interface KnowledgeNodeData {
  id: string;
  name: string;
}

export const knowledgeNodes: KnowledgeNodeData[] = [
  { id: "KNOWLEDGE_BASE", name: "Knowledge Base" },
  { id: "GITHUB", name: "GitHub" },
  { id: "ATLASSIAN", name: "Atlassian" },
  { id: "POLICIES", name: "Policies" },
];
