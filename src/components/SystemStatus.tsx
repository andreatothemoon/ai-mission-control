interface StatusIndicatorProps {
  label: string;
  value: string;
}

const StatusIndicator = ({ label, value }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <div
      className="w-2 h-2 rounded-full bg-accent-green flex-shrink-0"
      style={{ boxShadow: "0 0 6px hsl(150, 100%, 45%)" }}
    />
    <div>
      <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-foreground-secondary">{label}</span>
      <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-accent-green ml-2">{value}</span>
    </div>
  </div>
);

interface SystemStatusProps {
  isGenerating: boolean;
}

export default function SystemStatus({ isGenerating }: SystemStatusProps) {
  return (
    <footer className="col-start-2 row-start-4 bg-panel mx-3 mb-3 mt-2 rounded-md border border-divider">
      <div className="p-4 flex items-center gap-6">
        <StatusIndicator label="Governance Status" value="Active" />
        <StatusIndicator label="Audit Logging" value="Enabled" />
        <StatusIndicator label="Human Oversight" value="Verified" />
        <StatusIndicator label="Approved Models" value="Validated" />
      </div>
    </footer>
  );
}
