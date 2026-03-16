import { motion } from "framer-motion";

export default function MissionHeader() {
  return (
    <motion.div
      className="text-center pt-6 pb-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-cyan">
        Mission
      </h2>
      <p className="text-sm font-medium tracking-[0.06em] text-foreground-secondary mt-1.5">
        AI-Augmented Product Development
      </p>
    </motion.div>
  );
}
