"use client";

import { motion } from "motion/react";
import { AlertTriangle, TrendingDown, FileSearch, MessageSquareWarning } from "lucide-react";

const cards = [
  {
    title: "Hidden Fair Lending Risk",
    description:
      "Disparate impact often develops gradually across thousands of lending decisions before traditional reviews detect it.",
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "Model Drift",
    description:
      "Production behavior changes over time even when model code never changes.",
    icon: <TrendingDown className="h-4 w-4 text-orange-400" />,
  },
  {
    title: "Manual Examinations",
    description:
      "Regulatory preparation becomes expensive when evidence is scattered across systems.",
    icon: <FileSearch className="h-4 w-4 text-red-400" />,
  },
  {
    title: "Incomplete Decision Explanations",
    description:
      "Poor documentation increases compliance risk and slows customer dispute resolution.",
    icon: <MessageSquareWarning className="h-4 w-4 text-rose-400" />,
  },
];

export function RegulatoryRiskSection() {
  return (
    <section className="bg-background text-foreground px-4 pb-20 pt-36 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-[var(--max-w-container)]">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Every AI lending decision creates regulatory risk.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Without continuous oversight, bias, model drift, and documentation gaps accumulate long before
            anyone notices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="rounded-xl border border-gray-100/80 bg-white p-5 dark:border-white/10 dark:bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            >
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                {card.icon}
              </div>
              <h3 className="text-[15px] font-medium tracking-tight text-gray-900 dark:text-gray-100">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-snug text-gray-600 dark:text-gray-300">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
