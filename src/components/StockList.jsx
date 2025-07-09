import StockCard from './StockCard';

function StockList({ stocks, portfolio, balance, onBuy, onSell, limits, globalOwned }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {stocks.map((stock) => {
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
  );
}

export default StockList;
