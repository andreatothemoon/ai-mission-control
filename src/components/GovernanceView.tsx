import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Shield,
  Eye,
  FileCheck,
  ChevronDown,
  ArrowDown,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */

const agents = [
  { name: "CASSandra Agent", purpose: "Customer analytics & sentiment analysis", owner: "Customer Insights", risk: "Low", status: "Active" },
  { name: "AstraOps Agent", purpose: "Operational processes & SOP guidance", owner: "Operations", risk: "Medium", status: "Active" },
  { name: "COBS Voyager Agent", purpose: "Customer outcome tracking & reporting", owner: "Customer Success", risk: "Low", status: "Active" },
  { name: "Product Spaceship Agent", purpose: "Product specs & documentation generation", owner: "Product", risk: "Low", status: "Active" },
  { name: "Asteroids Incident Agent", purpose: "Incident triage & intelligence", owner: "Engineering", risk: "High", status: "Active" },
  { name: "Insight Satellite Network", purpose: "Data insights & MI reporting", owner: "Data & Analytics", risk: "Medium", status: "Active" },
  { name: "Observatory Agent", purpose: "Competitor research & market analysis", owner: "Strategy", risk: "Low", status: "Active" },
  { name: "Mars Fund Agent", purpose: "Investment & asset analysis", owner: "Finance", risk: "High", status: "Review Required" },
  { name: "Launchpad Agent", purpose: "Content writing & communications", owner: "Marketing", risk: "Low", status: "Active" },
  { name: "Compliance Agent", purpose: "Consumer Duty and regulatory analysis", owner: "Risk & Compliance", risk: "Medium", status: "Active" },
  { name: "Master Agent", purpose: "Routes and orchestrates all agent tasks", owner: "Platform", risk: "Medium", status: "Active" },
];

const useCases = [
  { useCase: "Consumer Duty analysis", area: "Risk & Compliance", capability: "Regulatory NLP", risk: "Medium", approval: "Approved", lastReview: "2026-03-01" },
  { useCase: "Operations process guidance", area: "Operations", capability: "SOP retrieval", risk: "Low", approval: "Approved", lastReview: "2026-02-28" },
  { useCase: "Incident triage", area: "Engineering", capability: "Classification model", risk: "High", approval: "Approved", lastReview: "2026-03-05" },
  { useCase: "Product specification generation", area: "Product", capability: "Document generation", risk: "Low", approval: "Approved", lastReview: "2026-02-20" },
  { useCase: "Customer sentiment scoring", area: "Customer Insights", capability: "Sentiment analysis", risk: "Medium", approval: "Approved", lastReview: "2026-03-08" },
  { useCase: "Investment risk modelling", area: "Finance", capability: "Predictive analytics", risk: "High", approval: "Under Review", lastReview: "2026-03-10" },
  { useCase: "Competitor benchmarking", area: "Strategy", capability: "Web analysis", risk: "Low", approval: "Approved", lastReview: "2026-02-15" },
  { useCase: "Content personalisation", area: "Marketing", capability: "Generative AI", risk: "Medium", approval: "Under Review", lastReview: "2026-03-09" },
  { useCase: "MI dashboard automation", area: "Data & Analytics", capability: "Data pipelines", risk: "Low", approval: "Approved", lastReview: "2026-02-25" },
  { useCase: "Customer outcome prediction", area: "Customer Success", capability: "Predictive model", risk: "Medium", approval: "Under Review", lastReview: "2026-03-07" },
  { useCase: "Automated policy drafting", area: "Risk & Compliance", capability: "Document generation", risk: "High", approval: "Restricted", lastReview: "2026-03-11" },
];

const operatingModelNodes = [
  { title: "AI Strategy", desc: "Defines the vision, priorities, and investment approach for AI across the organisation." },
  { title: "AI Governance", desc: "Defines policies, controls, and risk oversight for all AI systems." },
  { title: "AI Development", desc: "Builds agents and AI capabilities using approved frameworks." },
  { title: "AI Deployment", desc: "Manages release, integration, and production readiness of AI systems." },
  { title: "AI Monitoring", desc: "Ensures safe operation and compliance through ongoing oversight." },
];

/* ─── Helpers ────────────────────────────────────────────────── */

const statusColor: Record<string, string> = {
  Active: "bg-accent-green",
  "Review Required": "bg-accent-yellow",
  Inactive: "bg-muted",
};

const statusTextColor: Record<string, string> = {
  Active: "text-accent-green",
  "Review Required": "text-accent-yellow",
  Inactive: "text-foreground-secondary",
};

const approvalColor: Record<string, string> = {
  Approved: "text-accent-green",
  "Under Review": "text-accent-yellow",
  Restricted: "text-destructive",
};

const riskColor: Record<string, string> = {
  Low: "text-accent-green",
  Medium: "text-accent-yellow",
  High: "text-destructive",
};

const allAreas = ["All", ...Array.from(new Set(useCases.map((u) => u.area)))];
const allApprovals = ["All", "Approved", "Under Review", "Restricted"];

/* ─── Component ──────────────────────────────────────────────── */

export default function GovernanceView() {
  const [areaFilter, setAreaFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");

  const filteredCases = useCases.filter((u) => {
    if (areaFilter !== "All" && u.area !== areaFilter) return false;
    if (approvalFilter !== "All" && u.approval !== approvalFilter) return false;
    return true;
  });

  const activeCount = agents.filter((a) => a.status === "Active").length;
  const approvedCount = useCases.filter((u) => u.approval === "Approved").length;
  const reviewCount = useCases.filter((u) => u.approval === "Under Review").length;

  return (
    <div className="col-start-2 row-start-2 row-span-2 overflow-y-auto flex flex-col gap-4 p-4">
      {/* ── Governance Telemetry Strip ── */}
      <div className="flex items-center justify-between bg-panel border border-divider rounded-md px-5 py-3">
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent-cyan">
          AI Governance Command Center
        </span>
        <div className="flex items-center gap-8">
          {[
            { label: "Registered Agents", value: String(agents.length) },
            { label: "Active Use Cases", value: String(approvedCount) },
            { label: "Under Review", value: String(reviewCount) },
            { label: "Governance Status", value: "NOMINAL", accent: true },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span className="text-[10px] font-medium tracking-[0.06em] uppercase text-foreground-secondary">
                {t.label}
              </span>
              <span
                className={`text-sm font-mono font-semibold tabular-nums ${
                  t.accent ? "text-accent-green" : "text-foreground"
                }`}
              >
                {t.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Operating Model ── */}
      <motion.div
        className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="px-5 py-3 border-b border-divider flex items-center gap-2 shrink-0">
          <Shield size={14} className="text-accent-cyan" />
          <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
            AI Operating Model
          </h2>
        </div>
        <div className="flex items-center justify-center py-6 px-6">
          <div className="flex items-center gap-0 w-full">
            {operatingModelNodes.map((node, i) => (
              <div key={node.title} className="flex items-center flex-1 min-w-0">
                <motion.div
                  className="w-full bg-background/40 border border-divider rounded-md px-4 py-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 * i }}
                >
                  <div className="text-sm font-semibold text-accent-cyan uppercase tracking-[0.06em]">
                    {node.title}
                  </div>
                  <p className="text-[11px] text-foreground-secondary mt-1 leading-relaxed">
                    {node.desc}
                  </p>
                </motion.div>
                {i < operatingModelNodes.length - 1 && (
                  <div className="flex items-center px-1 shrink-0">
                    <div className="w-4 h-px bg-accent-cyan/40" />
                    <ChevronDown size={12} className="text-accent-cyan/60 -rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Catalogue + Use Case Register ── */}
      <div className="grid grid-cols-2 gap-4 min-h-0 flex-1">
        {/* AI Agent Catalogue */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="px-5 py-3 border-b border-divider flex items-center gap-2 shrink-0">
            <Bot size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              AI Agent Catalogue
            </h2>
            <span className="ml-auto text-[10px] font-mono text-foreground-secondary">
              {activeCount} active
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 auto-rows-min">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                className="bg-background/40 border border-divider rounded-md p-4 flex flex-col gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.03 * i }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {agent.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${statusColor[agent.status]}`}
                      style={{
                        boxShadow:
                          agent.status === "Active"
                            ? "0 0 6px hsl(var(--accent-green))"
                            : undefined,
                      }}
                    />
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${statusTextColor[agent.status]}`}
                    >
                      {agent.status}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-foreground-secondary leading-relaxed">
                  {agent.purpose}
                </p>
                <div className="flex items-center gap-3 mt-auto pt-1">
                  <span className="text-[10px] text-foreground-secondary">
                    {agent.owner}
                  </span>
                  <span className="text-[10px] text-foreground-secondary">•</span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${riskColor[agent.risk]}`}
                  >
                    {agent.risk} Risk
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Use Case Register */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-5 py-3 border-b border-divider flex items-center gap-2 shrink-0">
            <FileCheck size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              AI Use Case Register
            </h2>
          </div>

          {/* Filters */}
          <div className="px-5 py-2.5 border-b border-divider flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-secondary">
                Area
              </span>
              <div className="relative">
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="appearance-none bg-panel border border-divider text-[11px] text-foreground pl-2 pr-6 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan [&>option]:bg-panel [&>option]:text-foreground"
                >
                  {allAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={10}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-secondary">
                Status
              </span>
              <div className="relative">
                <select
                  value={approvalFilter}
                  onChange={(e) => setApprovalFilter(e.target.value)}
                  className="appearance-none bg-background/40 border border-divider text-[11px] text-foreground pl-2 pr-6 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                >
                  {allApprovals.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={10}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-panel z-10">
                <tr className="border-b border-divider">
                  {["Use Case", "Business Area", "AI Capability", "Risk", "Status", "Last Review"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-2 text-[10px] font-semibold tracking-[0.08em] uppercase text-foreground-secondary"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((uc, i) => (
                  <motion.tr
                    key={uc.useCase}
                    className="border-b border-divider last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.02 * i }}
                  >
                    <td className="px-4 py-2.5 text-sm text-foreground">{uc.useCase}</td>
                    <td className="px-4 py-2.5 text-[11px] text-foreground-secondary">{uc.area}</td>
                    <td className="px-4 py-2.5 text-[11px] text-foreground-secondary">{uc.capability}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${riskColor[uc.risk]}`}>
                        {uc.risk}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${approvalColor[uc.approval]}`}>
                        {uc.approval}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-foreground-secondary">
                      {uc.lastReview}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
