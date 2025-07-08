function StockCard({ stock, owned, onBuy, onSell }) {
  return (
    <div className="bg-black border border-green-500 p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center font-mono">
      <div>
        <div className="text-green-300 text-lg">{stock.name}</div>
        <div className="text-blue-300">Price: {stock.price}₵</div>
        <div className="text-yellow-300">Owned: {owned}</div>
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0">
        <button onClick={() => onBuy(stock.name)} className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded">
          Buy
        </button>
        <button
          onClick={() => onSell(stock.name)}
          className="bg-red-700 hover:bg-red-900 text-white px-3 py-1 rounded"
          disabled={owned === 0}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default StockCard;
