"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScaledMockupProps {
  designWidth: number;
  designHeight: number;
  children: ReactNode;
  className?: string;
}

export function ScaledMockup({
  designWidth,
  designHeight,
  children,
  className,
}: ScaledMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-hidden [container-type:inline-size]",
        className
      )}
      style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: designWidth,
          height: designHeight,
          transformOrigin: "top left",
          transform: `scale(calc(100cqw / ${designWidth}px))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
