type ScoreRingProps = {
  score: number; // 300–900
  size?: number;
};

function getScoreLabel(score: number) {
  if (score >= 750) return { label: "Excellent", color: "var(--accent-green)" };
  if (score >= 700) return { label: "Good", color: "var(--accent)" };
  if (score >= 650) return { label: "Fair", color: "var(--accent-amber)" };
  return { label: "Poor", color: "var(--accent-red)" };
}

export function ScoreRing({ score, size = 160 }: ScoreRingProps) {
  const { label, color } = getScoreLabel(score);
  const cx = size / 2;
  const r = cx - 14;
  const circumference = 2 * Math.PI * r;
  // map 300–900 → 0–1
  const fraction = Math.max(0, Math.min(1, (score - 300) / 600));
  const offset = circumference * (1 - fraction);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="var(--surface-muted)"
          strokeWidth="10"
        />
        {/* Progress */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold animate-score" style={{ color: "var(--foreground)" }}>
          {score}
        </span>
        <span className="text-xs font-semibold mt-0.5" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}