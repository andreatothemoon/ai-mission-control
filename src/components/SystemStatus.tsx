import { DemoScenario } from "@/data/demoResponses";

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
  scenarios: DemoScenario[];
  onSelectScenario: (scenario: DemoScenario) => void;
  isGenerating: boolean;
}

export default function SystemStatus({ scenarios, onSelectScenario, isGenerating }: SystemStatusProps) {
  return (
    <footer className="col-start-2 row-start-5 bg-panel mx-3 mb-3 mt-2 rounded-md border border-divider">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <StatusIndicator label="Governance Status" value="Active" />
          <StatusIndicator label="Audit Logging" value="Enabled" />
          <StatusIndicator label="Human Oversight" value="Verified" />
          <StatusIndicator label="Approved Models" value="Validated" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-foreground-secondary mr-2">Demo Scenarios:</span>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              disabled={isGenerating}
              className="text-[11px] uppercase font-semibold tracking-wider bg-foreground/5 hover:bg-foreground/10 text-foreground-secondary hover:text-foreground px-3 py-1.5 rounded-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-divider"
            >
              Scenario {sc.id}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
