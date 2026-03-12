import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface CommandDisplayProps {
  prompt: string;
  response: string;
  isGenerating: boolean;
  activityStep: string;
}

export default function CommandDisplay({ prompt, response, isGenerating, activityStep }: CommandDisplayProps) {
  return (
    <section className="col-start-2 row-start-2 bg-panel m-3 rounded-md border border-divider flex flex-col overflow-hidden">
      <div className="px-4 py-2.5 border-b border-divider flex items-center gap-2">
        <Terminal size={14} className="text-accent-cyan" />
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-foreground-secondary">
          Live AI Command Interface
        </h2>
      </div>

      <div className="flex-1 p-5 overflow-y-auto font-mono text-sm space-y-4">
        {/* User prompt */}
        <div>
          <span className="text-[11px] tracking-[0.08em] uppercase text-foreground-secondary">User:</span>
          <p className="mt-1 text-foreground whitespace-pre-wrap leading-relaxed">{prompt}</p>
        </div>

        <div className="border-t border-dashed border-divider" />

        {/* System response */}
        <div>
          <span className="text-[11px] tracking-[0.08em] uppercase text-foreground-secondary">System:</span>

          {isGenerating && !response && (
            <div className="mt-3 flex items-center gap-3">
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
              <motion.span
                className="text-xs text-accent-cyan uppercase tracking-wider"
                key={activityStep}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activityStep}
              </motion.span>
            </div>
          )}

          <AnimatePresence>
            {response && (
              <motion.pre
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-2 text-foreground whitespace-pre-wrap leading-relaxed text-sm"
              >
                {response}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-3 border-t border-divider">
        <div className="bg-background border border-divider rounded-md px-4 py-2.5 text-foreground-secondary text-sm font-mono">
          Ask the system...
        </div>
      </div>
    </section>
  );
}
