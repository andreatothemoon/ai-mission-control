import { motion } from "framer-motion";

export default function OperatingModeIndicator() {
  return (
    <motion.div
      className="border-t border-divider px-6 py-3 flex items-center justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-foreground-secondary">
        Operating Mode
      </span>
      <div className="w-px h-3 bg-divider" />
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-accent-green">
          AI-First • Human Accountable
        </span>
      </div>
    </motion.div>
  );
}
