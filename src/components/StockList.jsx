import StockCard from './StockCard';

function StockList({ stocks, portfolio, balance, onBuy, onSell }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
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
