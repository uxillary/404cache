import { useState, useEffect } from 'react';
import { getItem, setItem } from '../lib/storage';

const DEFAULT_AVATARS = ['😎', '👾', '🤖', '🦙', '🐱', '🦆'];

const SHOP_ITEMS = [
  { emoji: '🐸', cost: 500 },
  { emoji: '🦖', cost: 800 },
  { emoji: '👻', cost: 700 }
];

function AvatarShop() {
  const [balance, setBalance] = useState(0);
  const [owned, setOwned] = useState(DEFAULT_AVATARS);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const bal = getItem('balance') ?? 0;
    setBalance(bal);
    const stored = getItem('ownedAvatars');
    if (stored) setOwned(stored);
  }, []);

  const buy = (item) => {
    if (balance < item.cost || owned.includes(item.emoji)) return;
    const newBal = balance - item.cost;
    const newOwned = [...owned, item.emoji];
    setBalance(newBal);
    setOwned(newOwned);
    setItem('balance', newBal);
    setItem('ownedAvatars', newOwned);
    setMessage(`Purchased ${item.emoji} for ${item.cost}\u00A2`);
    window.dispatchEvent(new Event('avatarsUpdated'));
  };

  return (
    <div className="mt-6 space-y-3 text-green-300">
      <h3 className="text-xl text-green-400">Avatar Shop</h3>
      <div className="text-sm">Balance: {balance}₵</div>
      <div className="flex flex-wrap gap-2">
        {SHOP_ITEMS.map((item) => (
          <button
            key={item.emoji}
            onClick={() => buy(item)}
            disabled={owned.includes(item.emoji) || balance < item.cost}
            className="text-2xl px-2 py-1 border-2 rounded disabled:opacity-50"
          >
            {item.emoji} - {item.cost}₵
          </button>
        ))}
      </div>
      {message && <div className="text-green-400 text-sm">{message}</div>}
    </div>
  );
}

export default AvatarShop;
