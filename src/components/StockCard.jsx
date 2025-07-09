import { useState } from 'react';

function StockCard({ stock, owned, balance, onBuy, onSell }) {
  const [bouncing, setBouncing] = useState(false);

  const handleBuy = () => {
    setBouncing(true);
    onBuy(stock.name);
    setTimeout(() => setBouncing(false), 300);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500 p-4 mb-4 sm:mb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center font-mono rounded shadow-lg shadow-green-700/30 transition-transform hover:scale-105">
      <div>
        <div className="text-green-300 text-xl font-bold">{stock.name}</div>
        <div className="text-blue-300 flex items-center">
          Price: {stock.price}₵
          {stock.price !== stock.prevPrice && (
            <span
              className={`ml-2 text-sm ${
                stock.price > stock.prevPrice ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.price > stock.prevPrice ? '▲' : '▼'}
              {Math.abs(stock.price - stock.prevPrice)}₵
            </span>
          )}
        </div>
        <div className="text-yellow-300">Owned: {owned}</div>
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0">
        <button
          onClick={handleBuy}
          className={`bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded disabled:opacity-50 ${bouncing ? 'animate-bounce' : ''}`}
          disabled={balance < stock.price}
        >
          Buy
        </button>
        <button
          onClick={() => onSell(stock.name)}
          className="bg-red-700 hover:bg-red-900 text-white px-3 py-1 rounded disabled:opacity-50"
          disabled={owned === 0}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default StockCard;
