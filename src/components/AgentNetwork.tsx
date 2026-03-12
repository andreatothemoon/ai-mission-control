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
    className="w-10 h-px"
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
  ];

  const masterActive = activeAgents.includes("MASTER_AGENT");

  return (
    <section className="bg-panel m-3 rounded-md border border-divider overflow-hidden">
      <div className="px-4 py-2.5 border-b border-divider">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">Agent Network</h2>
      </div>
      <div className="p-5 flex flex-col items-center gap-4">
        <AgentNode
          name="MASTER AGENT"
          description="Routes and orchestrates all agent tasks"
          isActive={masterActive}
        />
        <ConnectionLine active={masterActive} />
        <div className="grid grid-cols-2 gap-3">
          {agents.map((agent) => (
            <AgentNode
              key={agent.id}
              name={agent.name}
              description={agent.description}
              isActive={activeAgents.includes(agent.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
