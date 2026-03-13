import { motion } from "framer-motion";
import { timelinePhases } from "@/data/scenarioData";

interface MissionTimelineProps {
  completedPhases: number[];  // indices of completed/active phases
  activePhase: number;        // currently highlighted phase index (-1 = none)
}

export default function MissionTimeline({ completedPhases, activePhase }: MissionTimelineProps) {
  const currentPhaseName = activePhase >= 0 ? timelinePhases[activePhase] : null;

  return (
    <section className="col-start-2 row-start-2 bg-panel mx-3 mb-1 rounded-md border border-divider overflow-hidden">
      <div className="px-4 py-2.5 border-b border-divider flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
          AI Mission Timeline
        </h2>
        <span className="text-[10px] font-mono tracking-wider uppercase text-foreground-secondary">
          AI-assisted product delivery lifecycle
        </span>
      </div>

      <div className="px-8 py-5">
        {/* Timeline bar */}
        <div className="flex items-center justify-between relative">
          {timelinePhases.map((phase, i) => {
            const isCompleted = completedPhases.includes(i);
            const isCurrent = i === activePhase;
            const isLast = i === timelinePhases.length - 1;

            return (
              <div key={phase} className="flex items-center flex-1 last:flex-none">
                {/* Node + label */}
                <div className="flex flex-col items-center relative z-10">
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                      scale: isCurrent ? [1, 1.15, 1] : 1,
                    }}
                    transition={
                      isCurrent
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }
                    }
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full border"
                      animate={{
                        borderColor: isCurrent
                          ? "hsl(47, 100%, 65%)"
                          : isCompleted
                          ? "hsl(187, 100%, 50%)"
                          : "hsla(220, 60%, 70%, 0.3)",
                        backgroundColor: isCurrent
                          ? "hsl(47, 100%, 65%)"
                          : isCompleted
                          ? "hsl(187, 100%, 50%)"
                          : "transparent",
                        boxShadow: isCurrent
                          ? "0 0 10px hsla(47, 100%, 65%, 0.5)"
                          : isCompleted
                          ? "0 0 6px hsla(187, 100%, 50%, 0.3)"
                          : "none",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Inner dot for completed */}
                    {isCompleted && !isCurrent && (
                      <motion.div
                        className="absolute w-1.5 h-1.5 rounded-full bg-panel"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.div>
                  <motion.span
                    className="mt-2.5 text-[10px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap"
                    animate={{
                      color: isCurrent
                        ? "hsl(47, 100%, 65%)"
                        : isCompleted
                        ? "hsl(0, 0%, 100%)"
                        : "hsl(228, 100%, 90%)",
                      opacity: isCurrent || isCompleted ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {phase}
                  </motion.span>
                </div>

                {/* Connecting line */}
                {!isLast && (
                  <div className="flex-1 h-px mx-3 relative">
                    <div className="absolute inset-0 bg-foreground/10" />
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      animate={{
                        width: completedPhases.includes(i + 1) || activePhase > i
                          ? "100%"
                          : "0%",
                        backgroundColor:
                          activePhase > i
                            ? "hsl(187, 100%, 50%)"
                            : "hsla(220, 60%, 70%, 0.2)",
                      }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      style={{ height: 1 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
