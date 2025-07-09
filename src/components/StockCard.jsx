import { useState } from 'react';

function StockCard({ stock, owned, balance, onBuy, onSell, globalRemaining, playerCapReached }) {
  const [bouncing, setBouncing] = useState(false);

  const handleBuy = () => {
    setBouncing(true);
    onBuy(stock.name);
    setTimeout(() => setBouncing(false), 300);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500 p-4 mb-4 rounded shadow-lg shadow-green-700/30 transition-transform hover:scale-105 flex flex-col gap-2 font-mono">
      <div className="flex justify-between items-center flex-wrap gap-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-3xl">{stock.emoji}</span>
          <div className="text-green-300 text-xl font-bold break-words">
            {stock.name}
          </div>
          <span
            className={`text-xs px-2 rounded ${
              stock.type === 'stable'
                ? 'bg-gray-700 text-gray-300'
                : stock.type === 'risky'
                ? 'bg-red-700 text-red-200'
                : 'bg-blue-700 text-blue-200'
            }`}
          >
            {stock.type}
          </span>
        </div>
        <div className="text-yellow-300 text-sm">Owned: {owned}</div>
      </div>
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
        {stock.event && (
          <span
            className={`ml-2 ${
              stock.event === 'spike-up' ? 'text-green-400' : 'text-red-400'
            } animate-flash`}
          >
            ⚡
          </span>
        )}
      </div>
      <div className="text-purple-300 text-sm">
        Remaining: {globalRemaining === Infinity ? '∞' : globalRemaining}
        {playerCapReached && (
          <span className="text-red-400 ml-1">Cap reached</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleBuy}
          className={`bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded disabled:opacity-50 ${bouncing ? 'animate-bounce-small' : ''}`}
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
