import { LayoutDashboard, Share2, Rocket, GitPullRequest } from "lucide-react";
import React from "react";

export type ActiveView = "overview" | "network" | "engineering" | "governance";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-md w-full text-left transition-all duration-200 text-sm font-medium ${
      active
        ? "text-foreground bg-foreground/5 shadow-[inset_2px_0_0_0_hsl(var(--accent-cyan))]"
        : "text-foreground-secondary hover:text-foreground hover:bg-foreground/5"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface NavigationRailProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export default function NavigationRail({ activeView, onViewChange }: NavigationRailProps) {
  return (
    <nav className="col-start-1 row-start-2 row-span-3 border-r border-divider p-3 flex flex-col gap-1">
      <div className="mb-4 px-3">
        <h1 className="text-xs font-semibold tracking-[0.1em] uppercase text-foreground-secondary">AI Command Center</h1>
      </div>
      <NavItem icon={<LayoutDashboard size={18} />} label="System Overview" active={activeView === "overview"} onClick={() => onViewChange("overview")} />
      <NavItem icon={<Share2 size={18} />} label="Agent Network" active={activeView === "network"} onClick={() => onViewChange("network")} />
      <NavItem icon={<Rocket size={18} />} label="Engineering Accel." active={activeView === "engineering"} onClick={() => onViewChange("engineering")} />
      <NavItem icon={<GitPullRequest size={18} />} label="Governance" active={activeView === "governance"} onClick={() => onViewChange("governance")} />
    </nav>
  );
}
