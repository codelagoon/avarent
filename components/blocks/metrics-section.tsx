"use client";

import { motion } from "motion/react";

const metrics = [
  { value: "<500 ms", label: "Average monitoring latency" },
  { value: "Continuous", label: "Decision coverage" },
  { value: "Real-Time", label: "Bias detection" },
  { value: "Exam Ready", label: "Audit evidence" },
];

export function MetricsSection() {
  return (
    <section className="bg-[#0A0A0A] px-4 py-20 text-white md:py-32">
      <div className="mx-auto max-w-[var(--max-w-container)]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            >
              <div className="font-mono text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {metric.value}
              </div>
              <p className="mt-2 text-sm text-white/45">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
