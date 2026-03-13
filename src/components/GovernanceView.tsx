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

const layers = {
  governance: {
    label: "Governance",
    items: ["Agent Catalogue", "Use Case Register", "Risk Controls"],
    accent: "accent-yellow",
  },
  aiExecution: {
    label: "AI Execution Layer",
    nodes: [
      { title: "Idea", bullets: ["Product opportunity", "User problem", "Operational need"] },
      { title: "AI Analysis", bullets: ["Research support", "Regulatory context", "Specification generation"] },
      { title: "AI-Assisted Build", bullets: ["AI-assisted coding", "Test generation", "Documentation creation"] },
      { title: "Product Delivery", bullets: ["Engineering build", "Operational readiness", "Release"] },
    ],
    accent: "accent-cyan",
  },
  humanAccountability: {
    label: "Human Validation & Decision",
    items: ["Product judgement", "Engineering validation", "Manual QA"],
    accent: "foreground",
  },
  monitoring: {
    label: "Monitoring & Feedback",
    items: ["Operational monitoring", "Compliance oversight", "Continuous improvement"],
    accent: "accent-green",
  },
};



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
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden shrink-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="px-5 py-3 border-b border-divider shrink-0 flex items-center justify-between">
            <div>
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
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[9px] font-semibold tracking-[0.1em] uppercase text-foreground-secondary/50">
                Operating Mode
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-foreground-secondary">
                  AI-FIRST • HUMAN ACCOUNTABLE
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-6 py-4 gap-0">
            {/* ── Governance Layer ── */}
            <motion.div
              className="flex flex-col items-center gap-2 pb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-accent-yellow">
                {layers.governance.label}
              </span>
              <div className="flex items-center gap-3">
                {layers.governance.items.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-1.5 border border-accent-yellow/25 rounded-sm bg-accent-yellow/5 text-[11px] text-accent-yellow/80 font-medium tracking-wide"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-20">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-4 w-px bg-accent-yellow/20" />
                ))}
              </div>
            </motion.div>

            <div className="w-full h-px bg-divider" />

            {/* ── AI Execution Layer ── */}
            <motion.div
              className="flex flex-col items-center gap-3 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-accent-cyan">
                {layers.aiExecution.label}
              </span>
              <div className="flex items-start justify-center gap-0">
                {layers.aiExecution.nodes.map((node, i) => (
                  <div key={node.title} className="flex items-start">
                    <div className="w-[180px] border border-accent-cyan/20 rounded-sm bg-accent-cyan/5 px-4 py-3 flex flex-col items-center">
                      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-accent-cyan mb-2">
                        {node.title}
                      </span>
                      <div className="flex flex-col gap-1 w-full">
                        {node.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-1.5">
                            <span className="text-foreground-secondary/40 text-[9px] mt-[3px]">•</span>
                            <span className="text-[11px] text-foreground-secondary/70 leading-snug">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {i < layers.aiExecution.nodes.length - 1 && (
                      <div className="flex items-center h-[28px] mt-[10px]">
                        <div className="w-4 h-px bg-accent-cyan/20" />
                        <ArrowDown size={8} className="text-accent-cyan/30 rotate-[-90deg] -mx-0.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="w-full h-px bg-divider" />

            {/* ── Human Accountability Layer ── */}
            <motion.div
              className="flex flex-col items-center gap-2 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-foreground-secondary">
                {layers.humanAccountability.label}
              </span>
              <div className="flex items-center gap-4">
                {layers.humanAccountability.items.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-1.5 border border-foreground/15 rounded-sm bg-foreground/5 text-[11px] text-foreground/80 font-medium tracking-wide"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="w-full h-px bg-divider" />

            {/* ── Monitoring & Feedback Layer ── */}
            <motion.div
              className="flex flex-col items-center gap-2 pt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-accent-green">
                {layers.monitoring.label}
              </span>
              <div className="flex items-center gap-4">
                {layers.monitoring.items.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-1.5 border border-accent-green/20 rounded-sm bg-accent-green/5 text-[11px] text-accent-green/70 font-medium tracking-wide"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="bg-panel border border-divider rounded-md overflow-hidden shrink-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-5 py-2.5 flex items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <FileCheck size={14} className="text-accent-cyan" />
              <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
                Resources
              </h2>
            </div>
            <div className="w-px h-4 bg-divider" />
            <div className="flex items-center gap-4">
              {[
                { label: "AI Use Case Register", href: "#" },
                { label: "AI Operating Model", href: "#" },
                { label: "AI Agent Catalogue", href: "#" },
                { label: "Current Pilots", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-accent-cyan hover:text-foreground transition-colors tracking-wide group"
                >
                  <Eye size={10} className="text-foreground-secondary group-hover:text-accent-cyan transition-colors" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
