import { useEffect, useState } from 'react';
import { getItem } from '../lib/storage';

function ProfileStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const balance = getItem('balance') ?? 0;
    const passiveRate = getItem('passiveRate') ?? 5;
    const passiveEarned = getItem('passiveEarned') ?? 0;
    const loginStreak = getItem('loginStreak') ?? 1;
    const purchasedUpgrades = getItem('purchasedUpgrades') ?? [];
    const history = getItem('netWorthHistory') ?? [];

    const highestNetWorth =
      history.length > 0 ? Math.max(...history) : balance;
    const lastNetWorth =
      history.length > 0 ? history[history.length - 1] : balance;

    setStats({
      balance,
      passiveRate,
      passiveEarned,
      loginStreak,
      upgrades: purchasedUpgrades.length,
      highestNetWorth,
      lastNetWorth,
    });
  }, []);

  if (!stats) return null;

  return (
    <div className="text-left mx-auto max-w-xs space-y-2">
      <div>Balance: {stats.balance}₵</div>
      <div>Net Worth: {stats.lastNetWorth}₵</div>
      <div>Highest Net Worth: {stats.highestNetWorth}₵</div>
      <div>Passive Rate: {stats.passiveRate}₵ / 10 sec</div>
      <div>Total Passive Earned: {stats.passiveEarned}₵</div>
      <div>Upgrades Purchased: {stats.upgrades}</div>
      <div>
        Login Streak: {stats.loginStreak} day{stats.loginStreak !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default ProfileStats;
