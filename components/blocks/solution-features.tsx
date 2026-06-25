import { motion } from "motion/react";
import { SolutionDashboard } from "@/components/ui/solution-dashboard";

export function SolutionFeatures() {
  return (
    <section id="platform" className="bg-background py-20 text-foreground md:py-32">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Everything your risk team needs in one platform.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Monitor decisions, validate models, investigate alerts, generate regulatory evidence, and
            maintain continuous oversight from a single workspace.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <SolutionDashboard />
        </motion.div>
      </div>
    </section>
  );
}
