import { motion } from "framer-motion";

interface AgentNodeProps {
  name: string;
  description: string;
  isActive: boolean;
}

const AgentNode = ({ name, description, isActive }: AgentNodeProps) => (
  <motion.div
    className="border rounded-md p-3 w-44 bg-background"
    animate={{
      borderColor: isActive ? "hsl(47, 100%, 65%)" : "hsl(0, 0%, 100%, 0.1)",
      boxShadow: isActive
        ? "0 0 14px 0px hsla(47, 100%, 65%, 0.4)"
        : "0 0 0px 0px hsla(47, 100%, 65%, 0)",
    }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <h3 className={`font-semibold text-xs uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-accent-yellow" : "text-foreground"}`}>
      {name}
    </h3>
    <p className="text-[11px] text-foreground-secondary mt-1 leading-snug">{description}</p>
  </motion.div>
);

const ConnectionLine = ({ active }: { active: boolean }) => (
  <motion.div
    className="h-6 w-px"
    animate={{ backgroundColor: active ? "hsl(47, 100%, 65%)" : "hsl(0, 0%, 100%, 0.1)" }}
    transition={{ duration: 0.3 }}
  />
);

interface AgentNetworkProps {
  activeAgents: string[];
}

export default function AgentNetwork({ activeAgents }: AgentNetworkProps) {
  const agents = [
    { id: "OPS_AGENT", name: "OPS AGENT", description: "Operational processes and SOPs" },
    { id: "COMPLIANCE_AGENT", name: "COMPLIANCE AGENT", description: "Regulatory and Consumer Duty analysis" },
    { id: "PRODUCT_AGENT", name: "PRODUCT AGENT", description: "Product specifications and documentation" },
    { id: "INCIDENT_AGENT", name: "INCIDENT AGENT", description: "Operational incident intelligence" },
    { id: "CASS_AGENT", name: "CASS AGENT", description: "Client assets and custody rules" },
    { id: "INSIGHTS_AGENT", name: "INSIGHTS AGENT", description: "Data insights and reporting" },
    { id: "FUND_AGENT", name: "FUND AGENT", description: "Investments and fund assets" },
    { id: "COMPETITOR_ANALYSIS_AGENT", name: "COMPETITOR ANALYSIS AGENT", description: "Competitor research and benchmarking" },
    { id: "CONTENT_WRITING_AGENT", name: "CONTENT WRITING AGENT", description: "Content creation and copywriting" },
  ];

  const masterActive = activeAgents.includes("MASTER_AGENT");

  return (
    <section className="bg-panel m-3 rounded-md border border-divider overflow-hidden flex flex-col min-h-0">
      <div className="px-4 py-2.5 border-b border-divider shrink-0">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">Agent Network</h2>
      </div>
      <div className="p-4 flex flex-col items-center gap-3 overflow-y-auto min-h-0">
        <AgentNode
          name="MASTER AGENT"
          description="Routes and orchestrates all agent tasks"
          isActive={masterActive}
        />
        <ConnectionLine active={masterActive} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {agents.map((agent) => (
            <AgentNode
              key={agent.id}
              name={agent.name}
              description={agent.description}
              isActive={activeAgents.includes(agent.id)}
            />
          ))}
        </div>

        {/* Knowledge Sources */}
        <div className="w-full mt-3 pt-3 border-t border-dashed border-divider">
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-foreground-secondary mb-2 block">Knowledge Sources</span>
          <div className="flex flex-wrap gap-2">
            {["SOPs", "Product Specs", "Regulations", "Data Feeds", "Platforms", "Guidelines", "Factsheets", "Databases"].map((source) => (
              <div
                key={source}
                className="text-[11px] font-medium tracking-wider uppercase text-foreground-secondary bg-foreground/5 border border-divider rounded-sm px-3 py-1.5"
              >
                {source}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
