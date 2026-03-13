import { useState, useEffect } from "react";

interface TelemetryItemProps {
  label: string;
  value: string;
  accent?: boolean;
}

const TelemetryItem = ({ label, value, accent }: TelemetryItemProps) => (
  <div className="text-center px-4">
    <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-foreground-secondary">{label}</div>
    <div className={`text-base font-semibold tabular-nums font-mono ${accent ? "text-accent-green" : "text-foreground"}`}>
      {value}
    </div>
  </div>
);

interface TelemetryBarProps {
  isGenerating: boolean;
}

function useSessionTimer() {
  const getElapsed = () => {
    const now = new Date();
    return now.getMinutes() * 60 + now.getSeconds();
  };

  const [elapsed, setElapsed] = useState(getElapsed);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  return `00:${mm}:${ss}`;
}

export default function TelemetryBar({ isGenerating }: TelemetryBarProps) {
  const [activeTasks, setActiveTasks] = useState(0);
  const sessionTime = useSessionTimer();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTasks(Math.floor(Math.random() * 7));
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="col-span-2 flex items-center justify-between px-6 border-b border-divider bg-panel/50">
      <div className="flex items-center gap-6">
        <TelemetryItem label="System Phase" value="DEMONSTRATION" />
        <div className="w-px h-8 bg-divider" />
        <TelemetryItem label="AI Operations Mode" value="ASSISTIVE" />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-foreground-secondary">Session Timer</div>
        <span className="text-2xl font-mono tabular-nums font-semibold text-foreground">{sessionTime}</span>
      </div>

      <div className="flex items-center gap-6">
        <TelemetryItem label="Agents Online" value="10" />
        <div className="w-px h-8 bg-divider" />
        <TelemetryItem label="Active Tasks" value={String(activeTasks)} />
        <div className="w-px h-8 bg-divider" />
        <TelemetryItem label="Knowledge Sources" value="100+" />
      </div>
    </header>
  );
}
