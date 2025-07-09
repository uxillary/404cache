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

  const containerCls = `grid gap-4 ${terminalMode ? 'bg-black text-green-300 font-mono p-2' : ''}`;

  return (
    <div className={containerCls}>
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat} className="mb-6">
          <h3 className="mb-2 text-lg font-bold text-green-400">{cat}</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
