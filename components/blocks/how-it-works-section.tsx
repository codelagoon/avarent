"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Connect your lending platform.",
    description:
      "Integrate with your existing underwriting workflow without replacing your models.",
  },
  {
    number: "02",
    title: "Monitor every decision.",
    description:
      "Avarent evaluates fairness, explainability, model drift, and regulatory metrics continuously.",
  },
  {
    number: "03",
    title: "Prepare for examinations automatically.",
    description:
      "Every alert, investigation, and explanation becomes searchable audit evidence.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-background text-foreground px-4 py-20 md:py-32">
      <div className="mx-auto max-w-[var(--max-w-container)]">
        <motion.h2
          className="mx-auto mb-14 max-w-3xl text-center text-3xl font-semibold tracking-tight md:mb-16 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          From lending decision to regulatory evidence in seconds.
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block" aria-hidden />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background font-mono text-sm text-muted-foreground md:mx-0">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:max-w-none">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
