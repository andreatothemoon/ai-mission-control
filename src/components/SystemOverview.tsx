import { motion } from "framer-motion";
import { Activity, Cpu, Database, Shield, TrendingUp, Users, Zap, Clock } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const MetricCard = ({ icon, label, value, change, positive }: MetricCardProps) => (
  <motion.div
    className="bg-panel border border-divider rounded-md p-4 flex flex-col gap-3"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-foreground-secondary">{label}</span>
      <div className="text-accent-cyan">{icon}</div>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-mono font-semibold tabular-nums text-foreground">{value}</span>
      {change && (
        <span className={`text-[11px] font-semibold mb-0.5 ${positive ? "text-accent-green" : "text-destructive"}`}>
          {change}
        </span>
      )}
    </div>
  </motion.div>
);

const resourceData = [
  { label: "CPU Usage", value: 34, color: "var(--accent-cyan)" },
  { label: "Memory", value: 62, color: "var(--accent-yellow)" },
  { label: "Storage", value: 47, color: "var(--accent-green)" },
  { label: "Network I/O", value: 23, color: "var(--accent-cyan)" },
];

const activityItems = [
  { time: "00:12:32", event: "Compliance Agent completed Consumer Duty review", type: "success" as const },
  { time: "00:11:45", event: "Master Agent routed pension transfer query to OPS Agent", type: "info" as const },
  { time: "00:10:18", event: "Incident Agent flagged potential security anomaly", type: "warning" as const },
  { time: "00:09:54", event: "Knowledge Base sync completed — 12 new documents indexed", type: "success" as const },
  { time: "00:08:30", event: "Product Spaceship Agent updated feature specifications", type: "info" as const },
  { time: "00:07:12", event: "Observatory Agent delivered competitor analysis report", type: "success" as const },
  { time: "00:05:45", event: "System health check passed — all agents nominal", type: "success" as const },
];

const typeColors = {
  success: "bg-accent-green",
  info: "bg-accent-cyan",
  warning: "bg-accent-yellow",
};

export default function SystemOverview() {
  return (
    <div className="col-start-2 row-start-2 row-span-2 overflow-y-auto p-3 space-y-3">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard icon={<Zap size={16} />} label="Tasks Completed" value="847" change="+12.3%" positive />
        <MetricCard icon={<Users size={16} />} label="Queries Processed" value="2,341" change="+8.7%" positive />
        <MetricCard icon={<TrendingUp size={16} />} label="Accuracy Rate" value="99.2%" change="+0.4%" positive />
        <MetricCard icon={<Clock size={16} />} label="Avg Response Time" value="1.2s" change="-0.3s" positive />
      </div>

      {/* Two-column: Resource Monitor + Activity Feed */}
      <div className="grid grid-cols-2 gap-3 min-h-0">
        {/* Resource Monitor */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <Cpu size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Resource Monitor
            </h2>
          </div>
          <div className="p-5 space-y-5 flex-1">
            {resourceData.map((res) => (
              <div key={res.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-foreground-secondary">
                    {res.label}
                  </span>
                  <span className="text-xs font-mono font-semibold tabular-nums text-foreground">{res.value}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: `hsl(${res.color})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${res.value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}

            {/* Agent Performance */}
            <div className="pt-3 border-t border-divider space-y-3">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-accent-cyan" />
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
                  Agent Performance
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Uptime", value: "99.97%" },
                  { label: "Queue Depth", value: "3" },
                  { label: "Error Rate", value: "0.02%" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-mono font-semibold tabular-nums text-foreground">{stat.value}</div>
                    <div className="text-[10px] font-medium tracking-[0.06em] uppercase text-foreground-secondary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          className="bg-panel border border-divider rounded-md flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
            <Activity size={14} className="text-accent-cyan" />
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Activity Feed
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activityItems.map((item, i) => (
              <motion.div
                key={i}
                className="px-4 py-3 border-b border-divider last:border-b-0 flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${typeColors[item.type]}`} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground leading-snug">{item.event}</p>
                  <span className="text-[10px] font-mono text-foreground-secondary mt-1 block">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom: Data Sources + System Integrity */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="bg-panel border border-divider rounded-md p-4 col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Database size={14} className="text-accent-cyan" />
            <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              Connected Data Sources
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "Knowledge Base", docs: "2,847", status: "Synced" },
              { name: "GitHub", docs: "1,203", status: "Synced" },
              { name: "Atlassian", docs: "956", status: "Synced" },
              { name: "Policy Vault", docs: "341", status: "Synced" },
            ].map((source) => (
              <div key={source.name} className="bg-background rounded-sm border border-divider p-3">
                <div className="text-xs font-semibold text-foreground">{source.name}</div>
                <div className="text-lg font-mono font-semibold tabular-nums text-foreground mt-1">{source.docs}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-accent-green">{source.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-panel border border-divider rounded-md p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield size={14} className="text-accent-green" />
            <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
              System Integrity
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Governance", status: "ACTIVE" },
              { label: "Audit Trail", status: "RECORDING" },
              { label: "Data Encryption", status: "AES-256" },
              { label: "Access Control", status: "ENFORCED" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-foreground-secondary">
                  {item.label}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-accent-green">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
