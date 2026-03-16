import { motion } from "framer-motion";

interface AxisNodeProps {
  label: string;
  description: string;
  delay: number;
  className?: string;
}

const AxisNode = ({ label, description, delay, className }: AxisNodeProps) => (
  <motion.div
    className={`flex flex-col items-center text-center ${className}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className="border border-divider rounded-md px-5 py-4 bg-panel w-[220px]">
      <div className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
        {label}
      </div>
      <p className="text-[11px] leading-relaxed text-foreground-secondary mt-1.5">
        {description}
      </p>
    </div>
  </motion.div>
);

export default function StrategicVectorDiagram() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
      {/* Section label */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-secondary">
          Strategic Acceleration Vector
        </span>
      </motion.div>

      {/* Center node: Product Impact — top-center */}
      <motion.div
        className="border border-accent-cyan/40 rounded-md px-8 py-4 bg-panel relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="absolute inset-0 rounded-md bg-accent-cyan/5" />
        <div className="relative text-sm font-semibold tracking-[0.12em] uppercase text-accent-cyan">
          Product Impact
        </div>
      </motion.div>

      {/* Single vertical line from Product Impact down */}
      <motion.div
        className="w-px h-12 bg-accent-cyan/30"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        style={{ transformOrigin: "top" }}
      />

      {/* Horizontal connector bar */}
      <motion.div
        className="h-px w-full max-w-[500px] bg-accent-cyan/30 -mt-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      />

      {/* Three axis nodes in a row */}
      <div className="flex items-start justify-center w-full max-w-[750px] gap-4 mt-0">
        <div className="flex-1 flex flex-col items-center">
          <motion.div
            className="w-px h-6 bg-accent-cyan/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />
          <AxisNode
            label="Move Faster"
            description="AI accelerates research, documentation, engineering, and operational analysis."
            delay={0.5}
          />
        </div>
        <div className="flex-1 flex flex-col items-center">
          <motion.div
            className="w-px h-6 bg-accent-cyan/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            style={{ transformOrigin: "top" }}
          />
          <AxisNode
            label="Expand Capabilities"
            description="AI enables teams to perform advanced work that previously required specialist expertise."
            delay={0.55}
          />
        </div>
        <div className="flex-1 flex flex-col items-center">
          <motion.div
            className="w-px h-6 bg-accent-cyan/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            style={{ transformOrigin: "top" }}
          />
          <AxisNode
            label="Operate Safely"
            description="Governance and oversight ensure AI is used responsibly in a regulated environment."
            delay={0.6}
          />
        </div>
      </div>

      {/* Supporting text */}
      <motion.p
        className="text-[11px] text-foreground-secondary/60 text-center mt-10 max-w-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        AI accelerates product development while humans remain accountable and governance ensures safe operation.
      </motion.p>
    </div>
  );
}
