"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Gauge, Layers, FileText } from "lucide-react";

export function BentoFeatures() {
  const [chartAnimated, setChartAnimated] = useState(false);
  const [countUp, setCountUp] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setChartAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Count up animation for 71%
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 71;
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCountUp(end);
          clearInterval(timer);
        } else {
          setCountUp(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Built for Fair Lending
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Evidence packet automation that meets regulatory standards
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Top Row */}
          {/* Cell 1 - Top left, 2x width */}
          <motion.div 
            className="md:col-span-2 bg-[#111111] border border-white/6 rounded-2xl p-6 md:p-8 hover:border-white/12 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.div 
                className="text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-none mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {countUp}%
              </motion.div>
              <p className="text-white/40 text-lg leading-relaxed mb-2">
                of adverse action notices in production fail the CFPB specificity standard
              </p>
              <p className="text-white/30 text-sm">
                Circular 2023-03 · Behavioral specificity required
              </p>
            </div>
          </motion.div>

          {/* Cell 2 - Top center */}
          <motion.div 
            className="bg-[#111111] border border-white/6 rounded-2xl p-5 md:p-6 hover:border-white/12 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Gauge className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-base font-medium text-white mb-2">
                Know what analysis is possible
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Readiness scoring surfaces which statistical analyses can run on your current fields — and which are blocked — before you present to leadership.
              </p>
            </div>
          </motion.div>

          {/* Cell 3 - Top right */}
          <motion.div 
            className="bg-[#111111] border border-white/6 rounded-2xl p-5 md:p-6 hover:border-white/12 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                DRIFT MONITOR
              </span>
              <span className="text-xs text-white/40">Last 12 months</span>
            </div>
            <div ref={chartRef} className="h-24 mb-4 relative">
              <svg
                viewBox="0 0 200 80"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Flat line - stays constant */}
                <path
                  d="M 0 40 L 200 40"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity="0.5"
                />
                {/* Diverging line - dips over time */}
                <path
                  d="M 0 40 Q 50 40 100 50 T 200 65"
                  stroke="#C45C00"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={chartAnimated ? "200" : "0"}
                  className="transition-[stroke-dasharray] duration-[800ms] ease-out"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-white mb-2">
              Disparity runs without an alert
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Track how approval-rate disparity shifts across origination periods before it becomes a finding.
            </p>
          </motion.div>

          {/* Bottom Row */}
          {/* Cell 4 - Bottom left */}
          <motion.div 
            className="bg-[#111111] border border-white/6 rounded-2xl p-5 md:p-6 hover:border-white/12 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Layers className="w-5 h-5 text-white/80" />
            </motion.div>
            <h3 className="text-base font-medium text-white mb-2">
              Aggregate by design
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              No raw applicant PII stored. Decision-level and cohort-level records only. Built for governance, not surveillance.
            </p>
          </motion.div>

          {/* Cell 5 - Bottom center, wider */}
          <motion.div 
            className="md:col-span-2 bg-[#111111] border border-white/6 rounded-2xl p-5 md:p-6 hover:border-white/12 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            {/* Browser chrome mockup */}
            <div className="bg-[#0F0F0F] rounded-lg border border-white/6 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/6">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="p-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-white/6">
                      <td className="py-2 text-white/70">Prime cohort</td>
                      <td className="py-2 text-white/70 text-right">DIR: 1.02</td>
                      <td className="py-2 text-right">
                        <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/60">
                          Pass
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">Thin File cohort</td>
                      <td className="py-2 text-[#C45C00] text-right font-medium">DIR: 0.61</td>
                      <td className="py-2 text-right">
                        <span className="px-2 py-1 rounded text-xs bg-[#C45C00]/20 text-[#C45C00]">
                          Review recommended
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h3 className="text-base font-medium text-white mb-2">
              Disparity at the four-fifths threshold
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Approval-rate disparity and the disparate impact ratio calculated with plain-language labels alongside technical outputs.
            </p>
          </motion.div>

          {/* Cell 6 - Bottom right */}
          <motion.div 
            className="bg-[#111111] border border-white/6 rounded-2xl p-5 md:p-6 hover:border-white/12 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex justify-between items-start mb-4">
              <motion.div 
                className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center"
                whileHover={{ rotate: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FileText className="w-5 h-5 text-white/80" />
              </motion.div>
              <span className="px-2 py-1 rounded text-xs bg-[#C45C00] text-[#0A0A0A] font-medium">
                Exam ready
              </span>
            </div>
            <h3 className="text-base font-medium text-white mb-2">
              The exam package, prebuilt
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Cohort context, open findings, methodology references, and limitations compiled into a format structured for MRM and fair-lending exam teams.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10 text-white/40">
                #SR 11-7
              </span>
              <span className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10 text-white/40">
                #Reg B
              </span>
              <span className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10 text-white/40">
                #ECOA
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
