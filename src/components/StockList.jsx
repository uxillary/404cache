import StockCard from './StockCard';

function StockList({ stocks, portfolio, balance, supply, limits, onBuy, onSell }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stocks.map((stock) => (
        <StockCard
          key={stock.name}
          stock={stock}
          owned={portfolio[stock.name] || 0}
          balance={balance}
          remaining={supply[stock.name] || 0}
          limit={limits[stock.name]?.perPlayerLimit}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
}

export default StockList;
