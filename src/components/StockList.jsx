import StockCard from './StockCard';

function StockList({ stocks, onBuy, onSell, portfolio }) {
  return (
    <div>
      {stocks.map((stock) => (
        <StockCard
          key={stock.name}
          stock={stock}
          holdings={portfolio[stock.name] || 0}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
}

export default StockList;
