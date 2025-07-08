function PortfolioChart({ data }) {
  if (!data || data.length < 2) return null;

  const width = 300;
  const height = 100;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="mt-4">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default PortfolioChart;
