"use client";

import { HeroParallax } from "@/components/blocks/hero-parallax";
import { avarentParallaxProducts } from "@/lib/avarent-parallax-products";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
  calData?: Record<string, string>;
  onClick?: () => void;
}

interface HeroProps {
  title: string;
  description: string;
  actions: HeroAction[];
}

export function HeroSection({ title, description, actions }: HeroProps) {
  return (
    <HeroParallax
      products={avarentParallaxProducts}
      title={title}
      description={description}
      actions={actions}
    />
  );
}
