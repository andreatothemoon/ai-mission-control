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

export default function TelemetryBar({ isGenerating }: TelemetryBarProps) {
  return (
    <header className="col-span-2 flex items-center justify-between px-6 border-b border-divider bg-panel/50">
      <div className="flex items-center gap-6">
        <TelemetryItem label="System Phase" value="DEMONSTRATION" />
        <div className="w-px h-8 bg-divider" />
        <TelemetryItem label="AI Operations Mode" value="ASSISTIVE" />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-foreground-secondary">Session Timer</div>
        <span className="text-2xl font-mono tabular-nums font-semibold text-foreground">00:12:45</span>
      </div>

      <div className="flex items-center gap-6">
        <TelemetryItem label="Agents Online" value="10" />
        <div className="w-px h-8 bg-divider" />
        <TelemetryItem label="Active Tasks" value={isGenerating ? "1" : "0"} />
        <div className="w-px h-8 bg-divider" />
        <TelemetryItem label="Knowledge Sources" value="100+" />
      </div>
    </header>
  );
}
