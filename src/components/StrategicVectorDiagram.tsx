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
    <div className="border border-divider rounded-md px-5 py-3 bg-panel min-w-[200px]">
      <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground">
        {label}
      </div>
      <p className="text-[10px] leading-relaxed text-foreground-secondary mt-1.5 max-w-[220px]">
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
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-secondary">
          Strategic Acceleration Vector
        </span>
      </motion.div>

      {/* Diagram container */}
      <div className="relative flex flex-col items-center gap-0">
        {/* Top axis: Expand Capabilities */}
        <AxisNode
          label="Expand Capabilities"
          description="AI enables teams to perform advanced work that previously required specialist expertise."
          delay={0.3}
        />

        {/* Vertical line top */}
        <motion.div
          className="w-px h-10 bg-accent-cyan/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Middle row: Move Faster — PRODUCT IMPACT — (space for symmetry) */}
        <div className="flex items-center gap-0">
          {/* Left axis: Move Faster */}
          <AxisNode
            label="Move Faster"
            description="AI accelerates research, documentation, engineering, and operational analysis."
            delay={0.35}
          />

          {/* Horizontal line left */}
          <motion.div
            className="h-px w-10 bg-accent-cyan/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Center node */}
          <motion.div
            className="border border-accent-cyan/40 rounded-md px-6 py-4 bg-panel relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-md bg-accent-cyan/5" />
            <div className="relative text-sm font-semibold tracking-[0.12em] uppercase text-accent-cyan">
              Product Impact
            </div>
          </motion.div>

          {/* Horizontal line right (invisible spacer for symmetry, or we can leave open) */}
          <motion.div
            className="h-px w-10 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Empty spacer to balance left node */}
          <div className="min-w-[200px]" />
        </div>

        {/* Vertical line bottom */}
        <motion.div
          className="w-px h-10 bg-accent-cyan/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Bottom axis: Operate Safely */}
        <AxisNode
          label="Operate Safely"
          description="Governance and oversight ensure AI is used responsibly in a regulated environment."
          delay={0.4}
        />
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
