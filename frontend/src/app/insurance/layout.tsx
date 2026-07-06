import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Guide & Free Quotes — Health, Life, Car, Bike, Travel | GetScored",
  description:
    "Understand why insurance matters, explore every type of insurance in India, and compare free quotes for health, term life, car, two-wheeler, and travel insurance in minutes.",
  keywords: [
    // Category-specific (already had these)
    "types of insurance",
    "why insurance is important",
    "health insurance India",
    "term life insurance",
    "car insurance quotes",
    "insurance guide",
    // Generic, high-search-volume terms
    "insurance",
    "insurance online",
    "buy insurance online India",
    "best insurance policy",
    "insurance policy comparison",
    "compare insurance plans",
    "cheap insurance",
    "insurance premium calculator",
    "insurance quotes online",
    "family health insurance plans",
    "best health insurance policy India",
    "health insurance plans for family",
    "life insurance plans India",
    "best term insurance plan",
    "term insurance calculator",
    "car insurance renewal",
    "car insurance online",
    "two wheeler insurance online",
    "bike insurance renewal",
    "travel insurance online",
    "travel insurance for international trip",
    "insurance claim process",
    "cashless insurance claim",
    "insurance for senior citizens",
    "insurance policy renewal online",
  ],
};

export default function InsuranceLayout({ children }: { children: React.ReactNode }) {
  return children;
}