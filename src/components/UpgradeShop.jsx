import { useState } from 'react';

function UpgradeShop({ upgrades, purchased, onPurchase }) {
  const [recent, setRecent] = useState(null);

  const groups = upgrades.reduce((acc, u) => {
    const key = u.category || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(u);
    return acc;
  }, {});

  return (
    <div className="mb-4 space-y-4">
      <h2 className="text-purple-400 mb-2 font-bold">Upgrade Shop</h2>
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat} className="space-y-2">
          <h3 className="text-green-400 font-semibold text-sm">{cat}</h3>
          <div className="grid gap-2">
            {list.map((u) => {
              const owned = purchased.includes(u.id);
              return (
                <div
                  key={u.id}
                  className={`flex items-center justify-between p-2 rounded bg-gray-800/60 backdrop-blur ${
                    owned ? 'opacity-60' : ''
                  }`}
                  title={u.description}
                >
                  <div className="flex items-center gap-2">
                    {u.icon && (
                      <img src={u.icon} alt="" className="w-4 h-4" />
                    )}
                    <span className="font-bold text-green-200">{u.name}</span>
                    <span className="text-yellow-300 font-mono">{u.cost}¢</span>
                  </div>
                  <button
                    onClick={() => {
                      onPurchase(u.id);
                      setRecent(u.id);
                      setTimeout(() => setRecent(null), 300);
                    }}
                    disabled={owned}
                    className={`neon-button px-2 py-1 disabled:opacity-50 ${
                      recent === u.id ? 'animate-bounce-small' : ''
                    }`}
                  >
                    {owned ? 'Owned' : 'Buy'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpgradeShop;
