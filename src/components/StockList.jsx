import StockCard from './StockCard';

function StockList({ stocks, onBuy, onSell }) {
  return (
    <div>
      {stocks.map((stock) => (
        <StockCard key={stock.name} stock={stock} onBuy={onBuy} onSell={onSell} />
      ))}
    </div>
  );
}

export default StockList;
