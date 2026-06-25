"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { ParallaxPanelVisual, type ParallaxPanelVariant } from "@/components/ui/parallax-panel-visual";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, Lock, Radar, Scale } from "lucide-react";

export type { ParallaxPanelVariant };

export interface HeroParallaxProduct {
  title: string;
  subtitle: string;
  variant: ParallaxPanelVariant;
}

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
  calData?: Record<string, string>;
  onClick?: () => void;
}

interface HeroParallaxProps {
  products: HeroParallaxProduct[];
  title: string;
  description: string;
  actions: HeroAction[];
}

export function HeroParallax({ products, title, description, actions }: HeroParallaxProps) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 260, damping: 32, bounce: 0 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [120, 900]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [-120, -900]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.25], [5, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.85, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.25], [4, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.25], [-80, 200]), springConfig);
  const trustOpacity = useSpring(useTransform(scrollYProgress, [0.14, 0.28], [0, 1]), springConfig);
  const trustY = useSpring(useTransform(scrollYProgress, [0.14, 0.28], [16, 0]), springConfig);

  return (
    <div
      ref={ref}
      className="relative flex h-[180vh] flex-col overflow-x-clip bg-[#0A0A0A] antialiased [perspective:1200px] [transform-style:preserve-3d] md:h-[230vh]"
    >
      <HeroParallaxBackground />

      <div className="relative z-10 flex flex-col overflow-visible pt-20 pb-24 md:pt-28 md:pb-36">
        <HeroParallaxHeader title={title} description={description} actions={actions} />

        <motion.div
          style={{ rotateX, rotateZ, translateY, opacity }}
          className="relative mt-8 min-h-[70rem] overflow-visible pb-8 [transform-origin:center_top] md:mt-10 md:min-h-[84rem] md:pb-12"
        >
          <ParallaxRow products={firstRow} translate={translateXReverse} reverse />
          <ParallaxRow products={secondRow} translate={translateX} className="my-6 md:my-8" />
          <ParallaxRow products={thirdRow} translate={translateXReverse} reverse className="hidden md:block" />
        </motion.div>
      </div>

      <HeroTrustRow opacity={trustOpacity} y={trustY} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent md:h-40" />
    </div>
  );
}

function HeroParallaxBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-orange-600/8 blur-[100px]" />
      <div className="absolute bottom-1/4 -left-24 h-72 w-72 rounded-full bg-amber-700/8 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        }}
      />
    </div>
  );
}

function HeroParallaxHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: HeroAction[];
}) {
  return (
    <div className="relative z-30 mx-auto w-full max-w-4xl px-4 text-center md:px-8">
      <div className="mx-auto mb-6 flex justify-center md:mb-8">
        <img
          src="/avarent-logo.png"
          alt="Avarent"
          width={56}
          height={56}
          className="h-11 w-11 md:h-14 md:w-14"
        />
      </div>
      <h1 className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-4xl font-semibold leading-[1.08] tracking-tight text-transparent md:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/50 md:text-lg">
        {description}
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {actions.map((action, index) => (
          <Button key={index} variant={action.variant} size="lg" asChild>
            <a
              href={action.href}
              className="min-w-[200px] flex items-center justify-center gap-2"
              {...(action.calData ?? {})}
              onClick={
                action.onClick
                  ? (e) => {
                      e.preventDefault();
                      action.onClick!();
                    }
                  : undefined
              }
            >
              {action.icon}
              {action.text}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}

const trustItems = [
  { icon: Activity, label: "Real-Time Fair Lending Monitoring" },
  { icon: Scale, label: "CFPB Examination Ready" },
  { icon: Radar, label: "Explainable AI" },
  { icon: Lock, label: "Enterprise Security" },
];

function HeroTrustRow({
  opacity,
  y,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-16 z-30 px-4 md:bottom-20"
    >
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {trustItems.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-white/40">
            <Icon className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
            <span className="font-mono text-[10px] tracking-wide uppercase md:text-[11px]">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ParallaxRow({
  products,
  translate,
  reverse,
  className,
}: {
  products: HeroParallaxProduct[];
  translate: MotionValue<number>;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-x-clip overflow-y-visible py-4 md:py-6",
        "[mask-image:linear-gradient(to_right,transparent,black_1%,black_99%,transparent)]",
        className
      )}
    >
      <motion.div
        className={cn(
          "flex w-max gap-5 px-6 md:gap-8 md:px-12",
          reverse ? "flex-row-reverse" : "flex-row"
        )}
      >
        {products.map((product) => (
          <ProductCard product={product} translate={translate} key={product.title} />
        ))}
      </motion.div>
    </div>
  );
}

function ProductCard({
  product,
  translate,
}: {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group/product relative h-[22rem] w-[24rem] shrink-0 md:h-[26rem] md:w-[31rem]"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-amber-500/20 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/product:opacity-100" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover/product:border-amber-500/25 group-hover/product:shadow-[0_24px_80px_-24px_rgba(245,158,11,0.18)]">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <ParallaxPanelVisual variant={product.variant} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#111111]/60 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
            }}
          />
        </div>

        <div className="relative border-t border-white/[0.06] bg-[#0A0A0A]/95 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[9px] tracking-[0.18em] text-amber-500/70 uppercase truncate">
              {product.subtitle}
            </p>
            <span className="shrink-0 font-mono text-[7px] text-white/20 uppercase tracking-wider">
              {product.variant.replace("-", "_")}
            </span>
          </div>
          <h2 className="mt-0.5 text-base font-medium text-white md:text-lg">{product.title}</h2>
        </div>
      </div>
    </motion.div>
  );
}
