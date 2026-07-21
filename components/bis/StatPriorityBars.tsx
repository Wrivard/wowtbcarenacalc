// Inline-SVG stat-priority visual. Renders the ordered statPriority as a
// ranked bar chart (longest/brightest = most important) so the priority
// reads at a glance. Pure SVG, theme CSS vars only, responsive viewBox.

export function StatPriorityBars({
  stats,
  className,
}: {
  stats: string[];
  className?: string;
}) {
  if (stats.length === 0) return null;

  const ROW_H = 34;
  const PAD_Y = 6;
  const LABEL_W = 132;
  const BAR_X = LABEL_W;
  const VW = 340;
  const BAR_MAX = VW - BAR_X - 4;
  const BAR_H = 18;
  const height = stats.length * ROW_H + PAD_Y * 2;

  // Longest bar for rank 1, shrinking toward the last stat but never below
  // ~34% so the least-important stat still reads as a bar.
  const widthFor = (i: number) =>
    BAR_MAX * (1 - (i / Math.max(stats.length, 2)) * 0.62);
  // Brightness fades with rank (opacity on the accent fill).
  const opacityFor = (i: number) =>
    Math.max(0.28, 1 - (i / Math.max(stats.length - 1, 1)) * 0.72);

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${VW} ${height}`}
        width="100%"
        height="auto"
        role="img"
        aria-label={`Stat priority, most to least important: ${stats.join(", ")}`}
        className="max-w-full"
      >
        {stats.map((stat, i) => {
          const y = PAD_Y + i * ROW_H;
          const cy = y + ROW_H / 2;
          return (
            <g key={stat}>
              {/* rank */}
              <text
                x={0}
                y={cy}
                dominantBaseline="central"
                fontSize={11}
                fontFamily="ui-monospace, monospace"
                fill="var(--muted)"
              >
                {i + 1}
              </text>
              {/* label */}
              <text
                x={16}
                y={cy}
                dominantBaseline="central"
                fontSize={13}
                fill="var(--muted-strong)"
              >
                {stat}
              </text>
              {/* track */}
              <rect
                x={BAR_X}
                y={cy - BAR_H / 2}
                width={BAR_MAX}
                height={BAR_H}
                rx={5}
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth={1}
              />
              {/* value */}
              <rect
                x={BAR_X}
                y={cy - BAR_H / 2}
                width={widthFor(i)}
                height={BAR_H}
                rx={5}
                fill="var(--accent)"
                opacity={opacityFor(i)}
              />
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
