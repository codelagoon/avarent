"use client";

import { CTAWithTextMarquee } from "@/components/ui/cta-with-text-marquee";
import { CAL_DATA } from "@/components/ui/cal-embed";
import { openContactSalesModal } from "@/components/ui/contact-sales-modal";

const marqueeItems = [
  "Credit Risk Teams",
  "Compliance Officers",
  "Model Validators",
  "Fintech Founders",
  "Risk Managers",
  "Data Scientists",
  "Audit Teams",
];

export function CTASection() {
  return (
    <CTAWithTextMarquee
      title="Know your regulatory risk before your next examination."
      description="See how Avarent monitors lending decisions in real time and helps your team maintain continuous compliance."
      primaryLabel="Schedule a Demo"
      primaryHref="#"
      primaryCalData={CAL_DATA}
      secondaryLabel="Contact Sales"
      secondaryHref="#"
      onSecondaryClick={openContactSalesModal}
      marqueeItems={marqueeItems}
    />
  );
}
