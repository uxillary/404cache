function UpgradeShop({ upgrades, purchased, onPurchase }) {
  return (
    <div className="mb-4">
      <h2 className="text-purple-400 mb-2 font-bold">Upgrade Shop</h2>
      {upgrades.map((u) => (
        <div key={u.id} className="flex justify-between mb-2">
          <span>
            {u.name} - Cost: {u.cost}₵
          </span>
          <button
            onClick={() => onPurchase(u.id)}
            disabled={purchased.includes(u.id)}
            className="bg-purple-700 hover:bg-purple-900 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            {purchased.includes(u.id) ? 'Purchased' : 'Buy'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default UpgradeShop;
