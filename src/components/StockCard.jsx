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

  const handleBuyQty = (e, qty) => {
    e.stopPropagation();
    setFlash('buy');
    for (let i = 0; i < qty; i++) {
      onBuy(stock.name);
    }
    setTimeout(() => setFlash(null), 300);
  };

  const handleSellQty = (e, qty) => {
    e.stopPropagation();
    setFlash('sell');
    for (let i = 0; i < qty; i++) {
      onSell(stock.name);
    }
    setTimeout(() => setFlash(null), 300);
  };


  const rawHistory = stock.history && stock.history.length ? stock.history : [stock.price];
  const graphHistory = rawHistory.length === 1 ? [rawHistory[0], rawHistory[0]] : rawHistory;
  const max = Math.max(...graphHistory);
  const min = Math.min(...graphHistory);
  const points = graphHistory
    .map((v, i) => {
      const x = (i / (graphHistory.length - 1)) * 40;
      const y = 20 - ((v - min) / (max - min || 1)) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      onClick={() => setExpanded((e) => !e)}
      className={`neon-card p-4 mb-4 flex flex-col gap-2 cursor-pointer transition-all hover:shadow-cyan-500 hover:scale-105 min-h-56 ${
        flash === 'buy'
          ? 'border-green-500 animate-flash'
          : flash === 'sell'
          ? 'border-red-500 animate-flash'
          : 'border-cyan-400'
      } ${expanded ? 'max-h-80' : 'max-h-56'}`}
    >
      <div className="flex justify-between items-start flex-wrap gap-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-3xl">{stock.emoji}</span>
          <div>
            <div className="text-green-300 text-xl font-bold leading-none">
              {stock.name}
            </div>
            <div className="text-xs font-mono text-green-500">{stock.ticker}</div>
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
      <div className="text-blue-300 flex items-baseline gap-1 tabular-nums whitespace-nowrap">
        <span>Price:</span>
        <span>{stock.price}¢</span>
        {stock.price !== stock.prevPrice && (
          <span
            className={`ml-2 text-sm ${
              stock.price > stock.prevPrice ? 'text-green-400' : 'text-red-400'
            }`}
            style={{ minWidth: '3.5rem' }}
          >
            {stock.price > stock.prevPrice ? '▲' : '▼'}
            {Math.abs(stock.price - stock.prevPrice)}¢
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
      {graphHistory.length > 1 && (
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
      <div className="mt-auto flex flex-wrap gap-2">
        {[1, 5, 10].map((qty) => (
          <button
            key={`buy-${qty}`}
            onClick={(e) => handleBuyQty(e, qty)}
            className="neon-button bg-green-700 hover:bg-green-900 disabled:opacity-50 px-2 py-1 text-xs"
            disabled={
              balance < stock.price * qty ||
              playerCapReached ||
              globalRemaining < qty
            }
          >
            Buy {qty}
          </button>
        ))}
        {[1, 5, 10].map((qty) => (
          <button
            key={`sell-${qty}`}
            onClick={(e) => handleSellQty(e, qty)}
            className="neon-button bg-red-700 hover:bg-red-900 disabled:opacity-50 px-2 py-1 text-xs"
            disabled={owned < qty}
          >
            Sell {qty}
          </button>
        ))}
      </div>
      {expanded && (
        <div className="mt-2 text-sm text-green-200">
          <div>Recent: {rawHistory.slice(-5).join(', ')}</div>
          <div className="mt-1">{LORE[stock.name] || 'No data available.'}</div>
        </div>
      )}
    </div>
  );
}

export default StockCard;
