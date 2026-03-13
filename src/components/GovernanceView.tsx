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
  { name: "Asteroids Incident Agent", purpose: "Incident triage & intelligence", owner: "Engineering", risk: "High", status: "In Development" },
  { name: "Insight Satellite Network", purpose: "Data insights & MI reporting", owner: "Data & Analytics", risk: "Medium", status: "In Development" },
  { name: "Observatory Agent", purpose: "Competitor research & market analysis", owner: "Strategy", risk: "Low", status: "In Development" },
  { name: "Mars Fund Agent", purpose: "Investment & asset analysis", owner: "Finance", risk: "High", status: "Active" },
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

const pipelineNodes = [
  { title: "Idea", bullets: ["Product opportunity", "User problem", "Operational need"], accent: "text-foreground", border: "border-foreground/20" },
  { title: "AI Analysis", bullets: ["Research support", "Regulatory context", "Spec generation"], accent: "text-accent-cyan", border: "border-accent-cyan/30" },
  { title: "Human Decision", bullets: ["Product judgement", "Engineering validation", "Risk oversight"], accent: "text-foreground", border: "border-foreground/20" },
  { title: "Delivery", bullets: ["Engineering build", "Operational readiness", "Product release"], accent: "text-accent-cyan", border: "border-accent-cyan/30" },
  { title: "Monitoring", bullets: ["Operational monitoring", "Compliance oversight", "Continuous improvement"], accent: "text-accent-green", border: "border-accent-green/30" },
];

const governanceItems = ["Agent Catalogue", "Use Case Register", "Risk Controls"];

/* ─── Helpers ────────────────────────────────────────────────── */

const statusColor: Record<string, string> = {
  Active: "bg-accent-green",
  "In Development": "bg-accent-yellow",
  Inactive: "bg-muted",
};

const statusTextColor: Record<string, string> = {
  Active: "text-accent-green",
  "In Development": "text-accent-yellow",
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

      {/* ── Operating Model + Use Case Register ── */}
      <div className="flex flex-col gap-4 min-h-0 flex-1">
        {/* Operating Model */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="px-5 py-3 border-b border-divider shrink-0">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-accent-cyan" />
              <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
                Operating Model
              </h2>
            </div>
            <p className="text-[10px] text-foreground-secondary/60 mt-1 tracking-wide">
              AI-first product development in a regulated environment
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center px-5 py-4 gap-4">
            {/* Governance Layer */}
            <motion.div
              className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-accent-yellow">
                Governance
              </span>
              <div className="flex items-center gap-2">
                {governanceItems.map((item) => (
                  <div
                    key={item}
                    className="px-2.5 py-1 border border-accent-yellow/25 rounded-sm bg-accent-yellow/5 text-[9px] text-accent-yellow/80 font-medium tracking-wide"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-16">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-3 w-px bg-accent-yellow/20" />
                ))}
              </div>
            </motion.div>

            {/* Pipeline Flow */}
            <div className="flex items-start justify-center gap-0">
              {pipelineNodes.map((node, i) => (
                <div key={node.title} className="flex items-start">
                  <motion.div
                    className={`w-[110px] border ${node.border} rounded-sm bg-background/30 px-2.5 py-2.5 flex flex-col items-center`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i + 0.2 }}
                  >
                    <span className={`text-[9px] font-semibold tracking-[0.08em] uppercase ${node.accent} mb-1.5`}>
                      {node.title}
                    </span>
                    <div className="flex flex-col gap-0.5 w-full">
                      {node.bullets.map((b) => (
                        <div key={b} className="flex items-start gap-1">
                          <span className="text-foreground-secondary/40 text-[7px] mt-[2px]">•</span>
                          <span className="text-[8px] text-foreground-secondary/70 leading-tight">{b}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  {i < pipelineNodes.length - 1 && (
                    <div className="flex items-center h-[24px] mt-[8px]">
                      <div className="w-3 h-px bg-foreground/15" />
                      <ArrowDown size={7} className="text-foreground/25 rotate-[-90deg] -mx-0.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
                  className="appearance-none bg-panel border border-divider text-[11px] text-foreground pl-2 pr-6 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan [&>option]:bg-panel [&>option]:text-foreground"
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
