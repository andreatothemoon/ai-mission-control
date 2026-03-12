import { motion } from "framer-motion";
import { GitPullRequest, Scale, FileCheck, AlertTriangle, Clock, Users, ShieldCheck, BookOpen } from "lucide-react";

const policyItems = [
  { name: "AI Model Deployment Policy", version: "v3.2", lastReview: "2026-02-28", status: "Approved", owner: "AI Ethics Board" },
  { name: "Data Retention Standard", version: "v2.1", lastReview: "2026-03-01", status: "Approved", owner: "Data Governance" },
  { name: "Customer Data Access Policy", version: "v4.0", lastReview: "2026-03-05", status: "Under Review", owner: "Compliance" },
  { name: "Incident Response Procedure", version: "v2.8", lastReview: "2026-02-15", status: "Approved", owner: "Security" },
  { name: "Third-Party Integration Policy", version: "v1.5", lastReview: "2026-03-10", status: "Draft", owner: "Engineering" },
];

const auditLog = [
  { time: "00:12:10", user: "System", action: "Policy v3.2 auto-approved after review period", severity: "info" as const },
  { time: "00:10:45", user: "J. Martinez", action: "Submitted Data Access Policy v4.0 for review", severity: "info" as const },
  { time: "00:09:20", user: "System", action: "Compliance check triggered for new model deployment", severity: "warning" as const },
  { time: "00:07:33", user: "A. Chen", action: "Approved Incident Response Procedure v2.8", severity: "info" as const },
  { time: "00:05:12", user: "System", action: "Risk assessment completed — 0 critical findings", severity: "success" as const },
  { time: "00:03:50", user: "K. Williams", action: "Updated Third-Party Integration Policy draft", severity: "info" as const },
];

const severityColors = {
  info: "bg-accent-cyan",
  warning: "bg-accent-yellow",
  success: "bg-accent-green",
};

const statusColors: Record<string, string> = {
  Approved: "text-accent-green",
  "Under Review": "text-accent-yellow",
  Draft: "text-foreground-secondary",
};

const approvalQueue = [
  { title: "Deploy AI Triage Model v2.3", requester: "Engineering", risk: "Medium", pending: "2d" },
  { title: "Expand data sharing with Partner X", requester: "Partnerships", risk: "High", pending: "4d" },
  { title: "Enable batch processing in production", requester: "Ops Team", risk: "Low", pending: "1d" },
];

const riskColors: Record<string, string> = {
  Low: "text-accent-green",
  Medium: "text-accent-yellow",
  High: "text-destructive",
};

export default function GovernanceView() {
  return (
    <div className="col-start-2 row-start-2 row-span-2 overflow-y-auto p-3 space-y-3">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: <FileCheck size={16} />, label: "Active Policies", value: "24" },
          { icon: <Scale size={16} />, label: "Compliance Score", value: "97.8%" },
          { icon: <AlertTriangle size={16} />, label: "Open Risks", value: "2" },
          { icon: <Clock size={16} />, label: "Pending Approvals", value: "3" },
        ].map((kpi) => (
          <motion.div
            key={kpi.label}
            className="bg-panel border border-divider rounded-md p-4 flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-foreground-secondary">{kpi.label}</span>
              <div className="text-accent-cyan">{kpi.icon}</div>
            </div>
            <span className="text-2xl font-mono font-semibold tabular-nums text-foreground">{kpi.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Policies + Audit Log */}
      <div className="grid grid-cols-2 gap-3 min-h-0">
        {/* Policy Register */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <BookOpen size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Policy Register
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {policyItems.map((policy, i) => (
              <motion.div
                key={policy.name}
                className="px-4 py-3 border-b border-divider last:border-b-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{policy.name}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${statusColors[policy.status]}`}>
                    {policy.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-mono text-foreground-secondary">{policy.version}</span>
                  <span className="text-[10px] text-foreground-secondary">•</span>
                  <span className="text-[10px] text-foreground-secondary">{policy.owner}</span>
                  <span className="text-[10px] text-foreground-secondary">•</span>
                  <span className="text-[10px] font-mono text-foreground-secondary">{policy.lastReview}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Audit Log */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <ShieldCheck size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Governance Audit Log
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {auditLog.map((item, i) => (
              <motion.div
                key={i}
                className="px-4 py-3 border-b border-divider last:border-b-0 flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${severityColors[item.severity]}`} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground leading-snug">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-foreground-secondary">{item.time}</span>
                    <span className="text-[10px] text-foreground-secondary">•</span>
                    <span className="text-[10px] text-accent-cyan">{item.user}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Approval Queue */}
      <motion.div
        className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
          <GitPullRequest size={14} className="text-accent-cyan" />
          <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
            Approval Queue
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-0">
          {approvalQueue.map((item, i) => (
            <div key={item.title} className="px-4 py-4 border-r border-divider last:border-r-0">
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              <div className="flex items-center gap-2 mt-2">
                <Users size={12} className="text-foreground-secondary" />
                <span className="text-[10px] text-foreground-secondary">{item.requester}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${riskColors[item.risk]}`}>
                  {item.risk} Risk
                </span>
                <span className="text-[10px] font-mono text-foreground-secondary">Pending {item.pending}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
