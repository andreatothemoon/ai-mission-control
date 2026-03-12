import { motion } from "framer-motion";
import { specialistAgents, masterAgent, knowledgeNodes } from "@/data/networkData";

interface AgentNetworkProps {
  activeAgents: string[];
  activeKnowledge: string[];
  routeLabel: string;
}

// Layout: master center, specialists in ellipse around it, knowledge nodes below
const MASTER_POS = { x: 400, y: 200 };

// Place specialist agents in an arc
function getSpecialistPositions(count: number) {
  const positions: { x: number; y: number }[] = [];
  const radiusX = 320;
  const radiusY = 150;
  const startAngle = -Math.PI;
  const endAngle = 0;
  for (let i = 0; i < count; i++) {
    const angle = startAngle + ((endAngle - startAngle) * (i + 0.5)) / count;
    positions.push({
      x: MASTER_POS.x + radiusX * Math.cos(angle),
      y: MASTER_POS.y + radiusY * Math.sin(angle) - 20,
    });
  }
  return positions;
}

function getKnowledgePositions(count: number) {
  const spacing = 160;
  const totalWidth = (count - 1) * spacing;
  const startX = MASTER_POS.x - totalWidth / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: startX + i * spacing,
    y: MASTER_POS.y + 170,
  }));
}

const specialistPositions = getSpecialistPositions(specialistAgents.length);
const knowledgePositions = getKnowledgePositions(knowledgeNodes.length);

const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;

export default function AgentNetwork({ activeAgents, activeKnowledge, routeLabel }: AgentNetworkProps) {
  const masterActive = activeAgents.includes("MASTER_AGENT");

  return (
    <section className="col-start-2 row-start-3 bg-panel mx-3 rounded-md border border-divider overflow-hidden">
      <div className="px-4 py-2.5 border-b border-divider flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
          AI Agent Network
        </h2>
        {routeLabel && (
          <motion.span
            className="text-[10px] font-mono tracking-wider uppercase text-accent-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={routeLabel}
          >
            Active Route: {routeLabel}
          </motion.span>
        )}
      </div>

      <div className="flex items-center justify-center p-2">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full"
          style={{ maxHeight: 320 }}
        >
          {/* Connection lines: master → specialists */}
          {specialistPositions.map((pos, i) => {
            const agent = specialistAgents[i];
            const isActive = activeAgents.includes(agent.id);
            return (
              <motion.line
                key={`m-s-${agent.id}`}
                x1={MASTER_POS.x}
                y1={MASTER_POS.y}
                x2={pos.x}
                y2={pos.y}
                strokeWidth={1}
                animate={{
                  stroke: isActive
                    ? "hsl(187, 100%, 50%)"
                    : "hsla(220, 60%, 70%, 0.2)",
                  opacity: isActive ? 0.9 : 0.25,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}

          {/* Connection lines: master → knowledge */}
          {knowledgePositions.map((pos, i) => {
            const kn = knowledgeNodes[i];
            const isActive = activeKnowledge.includes(kn.id);
            return (
              <motion.line
                key={`m-k-${kn.id}`}
                x1={MASTER_POS.x}
                y1={MASTER_POS.y}
                x2={pos.x}
                y2={pos.y}
                strokeWidth={1}
                strokeDasharray="4 4"
                animate={{
                  stroke: isActive
                    ? "hsl(187, 100%, 50%)"
                    : "hsla(220, 60%, 70%, 0.15)",
                  opacity: isActive ? 0.8 : 0.15,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}

          {/* Master Agent node */}
          <MasterNode
            x={MASTER_POS.x}
            y={MASTER_POS.y}
            isActive={masterActive}
          />

          {/* Specialist Agent nodes */}
          {specialistPositions.map((pos, i) => {
            const agent = specialistAgents[i];
            return (
              <AgentNode
                key={agent.id}
                x={pos.x}
                y={pos.y}
                name={agent.name}
                isActive={activeAgents.includes(agent.id)}
              />
            );
          })}

          {/* Knowledge nodes */}
          {knowledgePositions.map((pos, i) => {
            const kn = knowledgeNodes[i];
            return (
              <KnowledgeNode
                key={kn.id}
                x={pos.x}
                y={pos.y}
                name={kn.name}
                isActive={activeKnowledge.includes(kn.id)}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function MasterNode({ x, y, isActive }: { x: number; y: number; isActive: boolean }) {
  return (
    <g>
      {/* Glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={32}
        fill="none"
        animate={{
          stroke: isActive ? "hsl(187, 100%, 50%)" : "hsla(187, 100%, 50%, 0.3)",
          strokeWidth: isActive ? 2 : 1,
          filter: isActive ? "drop-shadow(0 0 8px hsla(187,100%,50%,0.5))" : "none",
        }}
        transition={{ duration: 0.4 }}
      />
      {/* Breathing pulse */}
      <motion.circle
        cx={x}
        cy={y}
        r={32}
        fill="none"
        stroke="hsla(187, 100%, 50%, 0.15)"
        strokeWidth={1}
        animate={{ r: [32, 36, 32], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={x} cy={y} r={30} fill="hsl(223, 65%, 15%)" />
      <text
        x={x}
        y={y - 4}
        textAnchor="middle"
        className="fill-foreground text-[8px] font-semibold uppercase"
        style={{ letterSpacing: "0.08em" }}
      >
        MASTER
      </text>
      <text
        x={x}
        y={y + 8}
        textAnchor="middle"
        className="fill-foreground text-[8px] font-semibold uppercase"
        style={{ letterSpacing: "0.08em" }}
      >
        AGENT
      </text>
    </g>
  );
}

function AgentNode({ x, y, name, isActive }: { x: number; y: number; name: string; isActive: boolean }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={20}
        fill="hsl(223, 65%, 15%)"
        animate={{
          stroke: isActive ? "hsl(187, 100%, 50%)" : "hsla(220, 60%, 70%, 0.25)",
          strokeWidth: isActive ? 1.5 : 0.5,
          filter: isActive ? "drop-shadow(0 0 6px hsla(187,100%,50%,0.4))" : "none",
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Breathing */}
      <motion.circle
        cx={x}
        cy={y}
        r={20}
        fill="none"
        stroke="hsla(187, 100%, 50%, 0.1)"
        strokeWidth={0.5}
        animate={{ r: [20, 23, 20], opacity: [0.2, 0.05, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
      />
      <text
        x={x}
        y={y + 34}
        textAnchor="middle"
        className="text-[7px] font-medium uppercase"
        style={{ letterSpacing: "0.06em" }}
        fill={isActive ? "hsl(187, 100%, 50%)" : "hsl(228, 100%, 90%)"}
      >
        {name}
      </text>
    </g>
  );
}

function KnowledgeNode({ x, y, name, isActive }: { x: number; y: number; name: string; isActive: boolean }) {
  return (
    <g>
      <motion.rect
        x={x - 14}
        y={y - 14}
        width={28}
        height={28}
        rx={4}
        fill="hsl(223, 65%, 15%)"
        animate={{
          stroke: isActive ? "hsl(47, 100%, 65%)" : "hsla(220, 60%, 70%, 0.2)",
          strokeWidth: isActive ? 1.5 : 0.5,
          filter: isActive ? "drop-shadow(0 0 4px hsla(47,100%,65%,0.3))" : "none",
        }}
        transition={{ duration: 0.3 }}
      />
      <text
        x={x}
        y={y + 28}
        textAnchor="middle"
        className="text-[7px] font-medium uppercase"
        style={{ letterSpacing: "0.04em" }}
        fill={isActive ? "hsl(47, 100%, 65%)" : "hsl(228, 100%, 90%)"}
      >
        {name}
      </text>
    </g>
  );
}
