import StockCard from './StockCard';

function StockList({ stocks, portfolio, balance, onBuy, onSell, limits, globalOwned, terminalMode }) {
  const groups = {
    Stable: [],
    Volatile: [],
    Meme: [],
  };
  stocks.forEach((s) => {
    const cat =
      s.type === 'stable' ? 'Stable' : s.type === 'trending' ? 'Meme' : 'Volatile';
    groups[cat].push(s);
  });

  const containerCls = `grid gap-6 ${terminalMode ? 'p-2' : ''}`;

  return (
    <div className={containerCls}>
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat} className="mb-8">
          <h3 className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur px-2 py-1 border-b border-green-500 text-lg font-bold text-green-400">
            {cat}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {list.map((stock) => {
              const limit = limits?.[stock.name];
              const remaining = limit ? limit.globalLimit - (globalOwned[stock.name] || 0) : Infinity;
              const capReached = limit?.perPlayerLimit ? (portfolio[stock.name] || 0) >= limit.perPlayerLimit : false;
              return (
                <StockCard
                  key={stock.name}
                  stock={stock}
                  owned={portfolio[stock.name] || 0}
                  balance={balance}
                  onBuy={onBuy}
                  onSell={onSell}
                  globalRemaining={remaining}
                  playerCapReached={capReached}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockList;
