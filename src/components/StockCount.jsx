function StockCount({ count }) {
  return (
    <div className="mb-4 text-green-400">
      Stocks Available: <span className="font-bold">{count}</span>
    </div>
  );
}

export default StockCount;
