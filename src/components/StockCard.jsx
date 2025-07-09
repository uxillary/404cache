import { useState } from 'react';

const LORE = {
  BananaCorp: 'A reliable fruit conglomerate loved by retro traders.',
  DuckWare: 'Quirky software house known for random quacks.',
  ToasterInc: 'Their hardware is hot right now.',
  SpaceY: 'Ambitious rockets with questionable safety records.',
  LlamaSoft: 'Makers of very fuzzy algorithms.',
  Robotix: 'Robots for every household.'
};

function StockCard({ stock, owned, balance, onBuy, onSell, globalRemaining, playerCapReached }) {
  const [expanded, setExpanded] = useState(false);
  const [flash, setFlash] = useState(null);

  const handleBuy = () => {
    setFlash('buy');
    onBuy(stock.name);
    setTimeout(() => setFlash(null), 300);
  };

  const handleSell = () => {
    setFlash('sell');
    onSell(stock.name);
    setTimeout(() => setFlash(null), 300);
  };

  const history = stock.history || [];
  const max = Math.max(...history, stock.price);
  const min = Math.min(...history, stock.price);
  const points = history
    .map((v, i) => {
      const x = (i / (history.length - 1 || 1)) * 40;
      const y = 20 - ((v - min) / (max - min || 1)) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      onClick={() => setExpanded((e) => !e)}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 border p-4 mb-4 rounded shadow-lg shadow-green-700/30 transition-all hover:scale-105 flex flex-col gap-2 font-mono cursor-pointer ${
        flash === 'buy'
          ? 'border-green-500 animate-flash'
          : flash === 'sell'
          ? 'border-red-500 animate-flash'
          : 'border-green-500'
      } ${expanded ? 'max-h-80' : 'max-h-48'}`}
    >
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
      {history.length > 1 && (
        <svg viewBox="0 0 40 20" className="w-full h-5 text-green-400">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points={points}
          />
        </svg>
      )}
      <div className="text-purple-300 text-sm">
        Remaining: {globalRemaining === Infinity ? '∞' : globalRemaining}
        {playerCapReached && (
          <span className="text-red-400 ml-1">Cap reached</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleBuy}
          className="bg-green-700 hover:bg-green-900 text-white px-2 py-1 text-sm rounded disabled:opacity-50 transition-transform duration-200 ease-out hover:scale-105"
          disabled={balance < stock.price}
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          className="bg-red-700 hover:bg-red-900 text-white px-2 py-1 text-sm rounded disabled:opacity-50 transition-transform duration-200 ease-out hover:scale-105"
          disabled={owned === 0}
        >
          Sell
        </button>
      </div>
      {expanded && (
        <div className="mt-2 text-sm text-green-200">
          <div>Recent: {history.slice(-5).join(', ')}</div>
          <div className="mt-1">{LORE[stock.name] || 'No data available.'}</div>
        </div>
      )}
    </div>
  );
}

export default StockCard;
