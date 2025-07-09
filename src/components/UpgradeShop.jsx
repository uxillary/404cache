import { useState } from 'react';

function UpgradeShop({ upgrades, purchased, onPurchase }) {
  const [clicked, setClicked] = useState(null);

  const handleClick = (id) => {
    setClicked(id);
    onPurchase(id);
    setTimeout(() => setClicked(null), 300);
  };

  return (
    <div className="mb-4">
      <h2 className="text-purple-400 mb-2 font-bold">Upgrade Shop</h2>
      {upgrades.map((u) => (
        <div key={u.id} className="flex justify-between mb-2 items-center">
          <span>
            {u.name} - Cost: {u.cost}₵
          </span>
          <button
            onClick={() => handleClick(u.id)}
            disabled={purchased.includes(u.id)}
            className={`relative bg-purple-700 hover:bg-purple-900 text-white px-2 py-1 rounded disabled:opacity-50 transition-transform duration-200 ease-out hover:scale-105`}
          >
            {clicked === u.id && (
              <span className="absolute inset-0 rounded-full bg-purple-400 opacity-50 animate-ping" />
            )}
            {purchased.includes(u.id) ? 'Purchased' : 'Buy'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default UpgradeShop;
