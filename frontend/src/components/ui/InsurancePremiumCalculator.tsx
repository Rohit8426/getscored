"use client";

import { useMemo, useState } from "react";

type InsuranceType = "health" | "term" | "car" | "bike" | "travel";

const insuranceTypes: Array<{ id: InsuranceType; label: string; hint: string }> = [
  { id: "health", label: "Health", hint: "Family medical cover" },
  { id: "term", label: "Term Life", hint: "Income protection" },
  { id: "car", label: "Car", hint: "Vehicle protection" },
  { id: "bike", label: "Bike", hint: "Two-wheeler cover" },
  { id: "travel", label: "Travel", hint: "Trip protection" },
];

const typeConfig: Record<InsuranceType, { baseRate: number; minCover: number; maxCover: number; step: number; defaultCover: number; unit: string }> = {
  health: { baseRate: 0.012, minCover: 300000, maxCover: 5000000, step: 100000, defaultCover: 1000000, unit: "sum insured" },
  term: { baseRate: 0.0019, minCover: 2500000, maxCover: 30000000, step: 500000, defaultCover: 10000000, unit: "life cover" },
  car: { baseRate: 0.026, minCover: 150000, maxCover: 2500000, step: 50000, defaultCover: 700000, unit: "IDV" },
  bike: { baseRate: 0.018, minCover: 30000, maxCover: 300000, step: 10000, defaultCover: 90000, unit: "IDV" },
  travel: { baseRate: 0.0024, minCover: 500000, maxCover: 10000000, step: 250000, defaultCover: 2500000, unit: "medical cover" },
};

function formatMoney(value: number) {
  return `Rs ${Math.round(value).toLocaleString("en-IN")}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRiskColor(score: number) {
  if (score < 42) return "var(--accent-green, #22C55E)";
  if (score < 68) return "var(--accent-amber, #F59E0B)";
  return "var(--accent-red, #F87171)";
}

function getRiskLabel(score: number) {
  if (score < 42) return "Low";
  if (score < 68) return "Medium";
  return "High";
}

export function InsurancePremiumCalculator() {
  const [insuranceType, setInsuranceType] = useState<InsuranceType>("health");
  const [age, setAge] = useState(32);
  const [cover, setCover] = useState(typeConfig.health.defaultCover);
  const [members, setMembers] = useState(3);
  const [termYears, setTermYears] = useState(25);
  const [vehicleAge, setVehicleAge] = useState(3);
  const [tripDays, setTripDays] = useState(12);
  const [addOns, setAddOns] = useState(true);

  const config = typeConfig[insuranceType];
  const normalizedCover = clamp(cover, config.minCover, config.maxCover);

  const result = useMemo(() => {
    const ageFactor = insuranceType === "term"
      ? 1 + Math.max(0, age - 28) * 0.035
      : insuranceType === "health"
        ? 1 + Math.max(0, age - 30) * 0.045
        : 1 + Math.max(0, age - 35) * 0.012;

    const memberFactor = insuranceType === "health" ? 0.74 + members * 0.34 : 1;
    const termFactor = insuranceType === "term" ? 0.86 + termYears * 0.012 : 1;
    const vehicleFactor = insuranceType === "car" || insuranceType === "bike" ? 0.86 + vehicleAge * 0.055 : 1;
    const travelFactor = insuranceType === "travel" ? 0.68 + tripDays * 0.026 : 1;
    const addOnFactor = addOns ? (insuranceType === "term" ? 1.12 : insuranceType === "travel" ? 1.16 : 1.2) : 1;

    const annual = normalizedCover * config.baseRate * ageFactor * memberFactor * termFactor * vehicleFactor * travelFactor * addOnFactor;
    const adjustedAnnual = insuranceType === "bike" ? Math.max(482, annual) : insuranceType === "travel" ? Math.max(99, annual) : Math.max(399, annual);
    const monthly = adjustedAnnual / 12;

    const riskScore = clamp(
      Math.round(
        22 +
          Math.max(0, age - 25) * 0.9 +
          (addOns ? -4 : 7) +
          (insuranceType === "health" ? members * 5 : 0) +
          (insuranceType === "term" ? termYears * 0.65 : 0) +
          (insuranceType === "car" || insuranceType === "bike" ? vehicleAge * 4 : 0) +
          (insuranceType === "travel" ? tripDays * 1.2 : 0),
      ),
      12,
      94,
    );

    return {
      monthly,
      annual: adjustedAnnual,
      riskScore,
      ageFactor,
      addOnAmount: adjustedAnnual - adjustedAnnual / addOnFactor,
    };
  }, [addOns, age, config.baseRate, insuranceType, members, normalizedCover, termYears, tripDays, vehicleAge]);

  function selectType(next: InsuranceType) {
    setInsuranceType(next);
    setCover(typeConfig[next].defaultCover);
  }

  const riskColor = getRiskColor(result.riskScore);
  const circumference = 2 * Math.PI * 42;
  const riskOffset = circumference * (1 - result.riskScore / 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Premium Estimator
            </p>
            <h2 className="mt-2 text-2xl font-bold">Calculate indicative insurance premium</h2>
          </div>
          <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
            Educational estimate
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {insuranceTypes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectType(item.id)}
              className="rounded-2xl border p-3 text-left transition hover:-translate-y-0.5"
              style={{
                borderColor: insuranceType === item.id ? "var(--accent)" : "var(--border)",
                background: insuranceType === item.id ? "var(--nav-accent-light)" : "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              <span className="block text-sm font-bold">{item.label}</span>
              <span className="mt-1 block text-[11px]" style={{ color: "var(--muted)" }}>{item.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <Slider
            label={`Cover amount (${config.unit})`}
            value={normalizedCover}
            min={config.minCover}
            max={config.maxCover}
            step={config.step}
            display={formatMoney(normalizedCover)}
            onChange={setCover}
          />
          <Slider
            label={insuranceType === "travel" ? "Oldest traveller age" : "Applicant age"}
            value={age}
            min={18}
            max={75}
            step={1}
            display={`${age} years`}
            minLabel="18"
            maxLabel="75"
            onChange={setAge}
          />

          {insuranceType === "health" && (
            <Slider
              label="Family members"
              value={members}
              min={1}
              max={6}
              step={1}
              display={`${members} ${members === 1 ? "member" : "members"}`}
              minLabel="1"
              maxLabel="6"
              onChange={setMembers}
            />
          )}

          {insuranceType === "term" && (
            <Slider
              label="Policy term"
              value={termYears}
              min={10}
              max={45}
              step={1}
              display={`${termYears} years`}
              minLabel="10 yrs"
              maxLabel="45 yrs"
              onChange={setTermYears}
            />
          )}

          {(insuranceType === "car" || insuranceType === "bike") && (
            <Slider
              label="Vehicle age"
              value={vehicleAge}
              min={0}
              max={15}
              step={1}
              display={vehicleAge === 0 ? "New vehicle" : `${vehicleAge} years`}
              minLabel="New"
              maxLabel="15 yrs"
              onChange={setVehicleAge}
            />
          )}

          {insuranceType === "travel" && (
            <Slider
              label="Trip duration"
              value={tripDays}
              min={1}
              max={90}
              step={1}
              display={`${tripDays} days`}
              minLabel="1 day"
              maxLabel="90 days"
              onChange={setTripDays}
            />
          )}

          <label className="flex min-h-24 items-center justify-between gap-4 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div>
              <span className="text-sm font-bold">Include useful add-ons</span>
              <p className="mt-1 text-xs leading-5" style={{ color: "var(--muted)" }}>
                Riders, zero dep, restoration, or extra assistance depending on product.
              </p>
            </div>
            <input
              type="checkbox"
              checked={addOns}
              onChange={(event) => setAddOns(event.target.checked)}
              className="h-5 w-5"
              style={{ accentColor: "var(--accent)" }}
            />
          </label>
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Estimated Premium
        </p>
        <div className="mt-5 rounded-3xl p-5" style={{ background: "var(--nav-accent-light)", border: "1px solid var(--border)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>Indicative monthly premium</p>
          <p className="mt-2 text-4xl font-bold" style={{ color: "var(--accent)" }}>
            {formatMoney(result.monthly)}
            <span className="ml-1 text-sm font-medium" style={{ color: "var(--muted)" }}>/mo</span>
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Around {formatMoney(result.annual)} per year
          </p>
        </div>

        <div className="mt-6 flex items-center gap-5">
          <svg width="112" height="112" viewBox="0 0 112 112" className="shrink-0">
            <circle cx="56" cy="56" r="42" fill="none" stroke="var(--surface-muted)" strokeWidth="12" />
            <circle
              cx="56"
              cy="56"
              r="42"
              fill="none"
              stroke={riskColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={riskOffset}
              transform="rotate(-90 56 56)"
            />
            <text x="56" y="54" textAnchor="middle" className="fill-current text-xl font-bold" style={{ color: riskColor }}>
              {result.riskScore}
            </text>
            <text x="56" y="72" textAnchor="middle" className="fill-current text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
              risk
            </text>
          </svg>
          <div>
            <p className="text-lg font-bold">{getRiskLabel(result.riskScore)} pricing risk</p>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
              Premiums typically rise with higher age, longer exposure, larger cover, claim-sensitive assets, and fewer protective add-ons.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {[
            ["Cover selected", formatMoney(normalizedCover)],
            ["Age load factor", `${result.ageFactor.toFixed(2)}x`],
            ["Add-on impact", addOns ? `Approx ${formatMoney(result.addOnAmount)}/yr` : "Not included"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--muted)" }}>{label}</span>
              <span className="text-sm font-bold">{value}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5" style={{ color: "var(--muted)" }}>
          This calculator gives a planning estimate only. Final premium depends on insurer underwriting, city, health declarations, vehicle details, destination, taxes, discounts, and selected policy terms.
        </p>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel?: string;
  maxLabel?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between gap-3 text-sm">
        <span style={{ color: "var(--muted)" }}>{label}</span>
        <span className="font-bold" style={{ color: "var(--foreground)" }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
        style={{ accentColor: "var(--accent)" }}
      />
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: "var(--muted)" }}>
        <span>{minLabel ?? formatMoney(min)}</span>
        <span>{maxLabel ?? formatMoney(max)}</span>
      </div>
    </div>
  );
}
