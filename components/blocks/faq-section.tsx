import { FAQ } from "@/components/ui/faq-tabs";

const categories = {
  general: "General",
};

const faqData = {
  general: [
    {
      question: "How long does implementation take?",
      answer:
        "Most teams complete data ingestion and see initial monitoring within one week. Scoping and integration planning typically take a single working session.",
    },
    {
      question: "Does Avarent replace our underwriting models?",
      answer:
        "No. Avarent works from decision-level outputs and logs. It does not require API access to the model itself, model weights, or the underlying scoring engine.",
    },
    {
      question: "How does Avarent detect disparate impact?",
      answer:
        "Avarent calculates approval-rate disparity and the disparate impact ratio against the four-fifths threshold, with plain-language labels alongside technical outputs. Alerts surface when cohort metrics cross configured thresholds.",
    },
    {
      question: "How does demographic inference work?",
      answer:
        "Avarent assigns protected-class cohorts from decision-level attributes already present in your lending data. Analysis runs on aggregate cohort records — not raw applicant PII.",
    },
    {
      question: "How does Avarent prepare institutions for CFPB examinations?",
      answer:
        "Open findings, methodology references, investigation logs, and adverse action documentation are compiled into a structured evidence packet formatted for MRM and fair-lending exam teams.",
    },
    {
      question: "Does Avarent store applicant data?",
      answer:
        "Avarent stores decision-level and cohort-level records only. No raw applicant PII. No bureau data. No model weights.",
    },
  ],
};

export function FAQSection() {
  return (
    <FAQ
      title="Frequently Asked Questions"
      subtitle="Got questions?"
      categories={categories}
      faqData={faqData}
      className="py-20 md:py-32"
    />
  );
}
