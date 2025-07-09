import StockCard from './StockCard';

function StockList({ stocks, portfolio, balance, onBuy, onSell }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {stocks.map((stock) => (
        <StockCard
          key={stock.name}
          stock={stock}
          owned={portfolio[stock.name] || 0}
          balance={balance}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
}

export default StockList;
