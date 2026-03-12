import { motion } from "framer-motion";
import { Rocket, GitBranch, Gauge, TestTube, Boxes, Timer, ArrowUpRight, CheckCircle2 } from "lucide-react";

const sprintData = [
  { name: "Sprint 42", velocity: 87, planned: 90, status: "active" as const },
  { name: "Sprint 41", velocity: 92, planned: 85, status: "done" as const },
  { name: "Sprint 40", velocity: 78, planned: 80, status: "done" as const },
  { name: "Sprint 39", velocity: 84, planned: 82, status: "done" as const },
];

const pipelineStages = [
  { name: "Build", status: "passed", duration: "2m 14s" },
  { name: "Unit Tests", status: "passed", duration: "4m 32s" },
  { name: "Integration", status: "passed", duration: "6m 08s" },
  { name: "Security Scan", status: "passed", duration: "1m 45s" },
  { name: "Staging Deploy", status: "running", duration: "—" },
  { name: "E2E Tests", status: "pending", duration: "—" },
];

const stageColors: Record<string, string> = {
  passed: "bg-accent-green",
  running: "bg-accent-yellow",
  pending: "bg-foreground/20",
};

const featureFlags = [
  { name: "2FA Authentication", env: "Production", enabled: true, rollout: "100%" },
  { name: "New Dashboard UI", env: "Staging", enabled: true, rollout: "25%" },
  { name: "AI Auto-Triage", env: "Canary", enabled: true, rollout: "5%" },
  { name: "Batch Processing v2", env: "Development", enabled: false, rollout: "0%" },
];

export default function EngineeringAccel() {
  return (
    <div className="col-start-2 row-start-2 row-span-2 overflow-y-auto p-3 space-y-3">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: <Gauge size={16} />, label: "Deploy Frequency", value: "18/wk", change: "+3" },
          { icon: <Timer size={16} />, label: "Lead Time", value: "1.4d", change: "-0.6d" },
          { icon: <ArrowUpRight size={16} />, label: "Change Fail Rate", value: "2.1%", change: "-0.8%" },
          { icon: <Rocket size={16} />, label: "MTTR", value: "23m", change: "-12m" },
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
            <div className="flex items-end gap-2">
              <span className="text-2xl font-mono font-semibold tabular-nums text-foreground">{kpi.value}</span>
              <span className="text-[11px] font-semibold mb-0.5 text-accent-green">{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CI/CD Pipeline + Sprint Velocity */}
      <div className="grid grid-cols-2 gap-3 min-h-0">
        {/* CI/CD Pipeline */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <GitBranch size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              CI/CD Pipeline — main
            </h2>
          </div>
          <div className="p-5 space-y-3 flex-1">
            {pipelineStages.map((stage, i) => (
              <motion.div
                key={stage.name}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stageColors[stage.status]}`}
                  style={stage.status === "running" ? { boxShadow: "0 0 8px hsl(var(--accent-yellow) / 0.5)" } : {}}
                />
                <span className="text-sm text-foreground flex-1">{stage.name}</span>
                <span className="text-[11px] font-mono text-foreground-secondary">{stage.duration}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                  stage.status === "passed" ? "text-accent-green" : stage.status === "running" ? "text-accent-yellow" : "text-foreground-secondary"
                }`}>
                  {stage.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sprint Velocity */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <Boxes size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Sprint Velocity
            </h2>
          </div>
          <div className="p-5 space-y-4 flex-1">
            {sprintData.map((sprint, i) => (
              <motion.div
                key={sprint.name}
                className="space-y-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{sprint.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tabular-nums text-foreground">{sprint.velocity}</span>
                    <span className="text-[10px] text-foreground-secondary">/ {sprint.planned} pts</span>
                    {sprint.status === "active" && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-yellow">Active</span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sprint.status === "active" ? "hsl(var(--accent-yellow))" : "hsl(var(--accent-cyan))" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((sprint.velocity / sprint.planned) * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * i }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Feature Flags + Test Coverage */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <TestTube size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Feature Flags
            </h2>
          </div>
          <div className="flex-1">
            {featureFlags.map((flag, i) => (
              <div key={flag.name} className="px-4 py-3 border-b border-divider last:border-b-0 flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground">{flag.name}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-foreground-secondary mt-0.5">{flag.env}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tabular-nums text-foreground-secondary">{flag.rollout}</span>
                  <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${flag.enabled ? "bg-accent-green/30" : "bg-muted"}`}>
                    <div className={`w-3 h-3 rounded-full transition-all ${flag.enabled ? "bg-accent-green translate-x-3.5" : "bg-foreground-secondary translate-x-0"}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-panel border border-divider rounded-md p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={14} className="text-accent-green" />
            <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Test Coverage
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { suite: "Unit Tests", coverage: 94, total: 1247, passed: 1243 },
              { suite: "Integration", coverage: 87, total: 342, passed: 338 },
              { suite: "E2E", coverage: 72, total: 89, passed: 86 },
              { suite: "Security", coverage: 96, total: 156, passed: 156 },
            ].map((test) => (
              <div key={test.suite} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-foreground-secondary">{test.suite}</span>
                  <span className="text-xs font-mono tabular-nums text-foreground">
                    {test.passed}/{test.total} <span className="text-foreground-secondary">({test.coverage}%)</span>
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${test.coverage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
