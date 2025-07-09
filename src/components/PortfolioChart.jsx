function PortfolioChart({ data }) {
  if (!data || data.length < 2) return null;

  const width = 500;
  const height = 200;
  const padding = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - ((d - min) / range) * (height - padding);
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
    .join(' ');

  const areaPath =
    `M${points[0][0]},${height} ` +
    points.map(([x, y]) => `L${x},${y}`).join(' ') +
    ` L${points[points.length - 1][0]},${height} Z`;

  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
    const value = min + (i / tickCount) * range;
    const y = height - ((value - min) / range) * (height - padding);
    return { y, value };
  });

  return (
    <div className="overflow-x-auto">
      <svg
        width={width}
        height={height + padding}
        className="mt-4 text-green-400 min-w-[500px] w-full"
      >
      <defs>
        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,197,94,0.5)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </linearGradient>
      </defs>
      <g>
        {ticks.map((t, idx) => (
          <g key={idx}>
            <line
              x1={padding}
              x2={width - padding}
              y1={t.y}
              y2={t.y}
              stroke="#444"
              strokeDasharray="2 2"
            />
            <text x="4" y={t.y + 4} fontSize="10" fill="#ccc">
              {Math.round(t.value)}
            </text>
          </g>
        ))}
        <path d={areaPath} fill="url(#chart-gradient)" />
        <path d={linePath} fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
      </svg>
    </div>
  );
}

export default PortfolioChart;
