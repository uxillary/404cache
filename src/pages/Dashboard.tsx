import { useState, useEffect } from 'react';
import { updateStockPrices } from '../utils/stockSimulator';
import stockLimits from '../data/stockLimits.json';
import PortfolioChart from '../components/PortfolioChart';
import BalanceDisplay from '../components/BalanceDisplay';
import PortfolioValueDisplay from '../components/PortfolioValueDisplay';
import NetWorthDisplay from '../components/NetWorthDisplay';
import StockList from '../components/StockList';
import StockCount from '../components/StockCount';
import PassiveIncomeDisplay from '../components/PassiveIncomeDisplay';
import UpgradeShop from '../components/UpgradeShop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToastContainer from '../components/ToastContainer';
import LoginStreakDisplay from '../components/LoginStreakDisplay';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import WindowFrame from '../components/WindowFrame';
import StockFilter from '../components/StockFilter';
import confetti from "canvas-confetti";
import { getItem, setItem, removeItem } from "../lib/storage";

const INITIAL_STOCKS = [
  { name: 'BananaCorp', emoji: '🍌', price: 120, prevPrice: 120, type: 'stable' },
  { name: 'DuckWare', emoji: '🦆', price: 80, prevPrice: 80, type: 'risky' },
  { name: 'ToasterInc', emoji: '🔥', price: 200, prevPrice: 200, type: 'trending' },
  { name: 'SpaceY', emoji: '🚀', price: 250, prevPrice: 250, type: 'risky' },
  { name: 'LlamaSoft', emoji: '🦙', price: 150, prevPrice: 150, type: 'stable' },
  { name: 'Robotix', emoji: '🤖', price: 180, prevPrice: 180, type: 'trending' },
];

function Dashboard() {
  const upgrades = [
    { id: 'upgrade_income', name: 'Faster Income', cost: 1000, bonus: 1 },
  ];
  const [balance, setBalance] = useState(() => {
    const stored = getItem<number>('balance');
    return stored ?? 5000;
  });
  const [portfolio, setPortfolio] = useState(() => {
    const stored = getItem<Record<string, number>>('portfolio');
    return stored ?? {};
  });
  const [passiveRate, setPassiveRate] = useState(() => {
    const stored = getItem<number>('passiveRate');
    return stored ?? 5;
  });
  const [purchasedUpgrades, setPurchasedUpgrades] = useState(() => {
    const stored = getItem<string[]>('purchasedUpgrades');
    return stored ?? [];
  });
  const [passiveEarned, setPassiveEarned] = useState(() => {
    const stored = getItem<number>('passiveEarned');
    return stored ?? 0;
  });
  const [globalSupply, setGlobalSupply] = useState(() => {
    const stored = getItem<Record<string, number>>('globalSupply');
    if (stored) return stored;
    const supply: Record<string, number> = {};
    INITIAL_STOCKS.forEach((s) => {
      supply[s.name] = stockLimits[s.name].globalLimit;
    });
    return supply;
  });
  const [playerLimits] = useState(() => {
    const stored = getItem<Record<string, number>>('perPlayerLimits');
    if (stored) return stored;
    const limits: Record<string, number> = {};
    Object.entries(stockLimits).forEach(([name, info]) => {
      if (info.perPlayerLimit !== undefined) {
        limits[name] = info.perPlayerLimit;
      }
    });
    setItem('perPlayerLimits', limits);
    return limits;
  });
  const [stocks, setStocks] = useState(
    INITIAL_STOCKS.map((s) => ({ ...s }))
  );
  const [history, setHistory] = useState(() => {
    const stored = getItem<number[]>('netWorthHistory');
    return stored ?? [];
  });

  const [loginStreak, setLoginStreak] = useState(1);

  const [search, setSearch] = useState('');

  const [toasts, setToasts] = useState([]);

  const addToast = (text) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const updateStockPricesWrapper = () => {
    setStocks((prev) => updateStockPrices(prev));
  };

  useEffect(() => {
    const id = setInterval(updateStockPricesWrapper, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const lastLogin = getItem<string>('lastLoginDate');
    const storedStreak = getItem<number>('loginStreak');
    const todayStr = new Date().toDateString();
    let newStreak = 1;
    let reward = 0;

    if (lastLogin) {
      const diff = Math.floor((new Date(todayStr) - new Date(lastLogin)) / 86400000);
      if (diff === 1) {
        newStreak = (storedStreak ? JSON.parse(storedStreak) : 0) + 1;
        reward = 100;
      } else if (diff === 0) {
        newStreak = storedStreak ? JSON.parse(storedStreak) : 1;
      }
    }

    setLoginStreak(newStreak);
    setItem('lastLoginDate', todayStr);
    setItem('loginStreak', newStreak);

    if (reward) {
      setBalance((b) => b + reward);
      addToast(`Daily login bonus! +${reward}\u00A2 (Streak ${newStreak})`);
    }
  }, []);

  useEffect(() => {
    setItem('loginStreak', loginStreak);
  }, [loginStreak]);

  useEffect(() => {
    const id = setInterval(() => {
      setBalance((b) => b + passiveRate);
      setPassiveEarned((e) => e + passiveRate);
    }, 10000);
    return () => clearInterval(id);
  }, [passiveRate]);

  useEffect(() => {
    setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    setItem('portfolio', portfolio);
  }, [portfolio]);

  useEffect(() => {
    setItem('passiveEarned', passiveEarned);
  }, [passiveEarned]);

  useEffect(() => {
    setItem('globalSupply', globalSupply);
  }, [globalSupply]);

  useEffect(() => {
    const portfolioValue = stocks.reduce((sum, stock) => {
      const owned = portfolio[stock.name] || 0;
      return sum + owned * stock.price;
    }, 0);
    const netWorth = balance + portfolioValue;
    setHistory((h) => {
      const updated = [...h, netWorth].slice(-20);
      setItem('netWorthHistory', updated);
      return updated;
    });
  }, [stocks, balance, portfolio]);

  useEffect(() => {
    setItem('passiveRate', passiveRate);
  }, [passiveRate]);

  useEffect(() => {
    setItem('purchasedUpgrades', purchasedUpgrades);
  }, [purchasedUpgrades]);

  const handlePurchaseUpgrade = (id) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) return;
    if (balance >= upgrade.cost && !purchasedUpgrades.includes(id)) {
      setBalance((b) => b - upgrade.cost);
      setPurchasedUpgrades((u) => [...u, id]);
      setPassiveRate((r) => r + upgrade.bonus);
    }
  };

  const handleBuy = (stockName) => {
    const stock = stocks.find((s) => s.name === stockName);
    const remaining = globalSupply[stockName];
    const limit = playerLimits[stockName];
    const owned = portfolio[stockName] || 0;

    if (remaining <= 0) {
      addToast(`${stockName} is sold out`);
      return;
    }

    if (limit !== undefined && owned >= limit) {
      addToast(`You reached the cap for ${stockName}`);
      return;
    }

    if (balance >= stock.price) {
      setBalance((b) => b - stock.price);
      setPortfolio((p) => ({ ...p, [stockName]: owned + 1 }));
      setGlobalSupply((s) => ({ ...s, [stockName]: s[stockName] - 1 }));
      addToast(`Bought 1 ${stockName} for ${stock.price}\u00A2`);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      addToast(`Not enough balance to buy ${stockName}`);
    }
  };

  const handleSell = (stockName) => {
    if (portfolio[stockName] > 0) {
      const stock = stocks.find((s) => s.name === stockName);
      setBalance((b) => b + stock.price);
      setPortfolio((p) => ({ ...p, [stockName]: p[stockName] - 1 }));
      setGlobalSupply((s) => ({ ...s, [stockName]: s[stockName] + 1 }));
      addToast(`Sold 1 ${stockName} for ${stock.price}\u00A2`);
    } else {
      addToast(`No ${stockName} stock to sell`);
    }
  };

  const resetGame = () => {
    if (!confirm('Reset all progress?')) return;
    setBalance(5000);
    setPortfolio({});
    setPassiveRate(5);
    setPurchasedUpgrades([]);
    setPassiveEarned(0);
    setLoginStreak(1);
    setHistory([]);
    setStocks(INITIAL_STOCKS.map((s) => ({ ...s })));
    setGlobalSupply(() => {
      const supply: Record<string, number> = {};
      INITIAL_STOCKS.forEach((s) => {
        supply[s.name] = stockLimits[s.name].globalLimit;
      });
      return supply;
    });
    removeItem('balance');
    removeItem('portfolio');
    removeItem('passiveRate');
    removeItem('purchasedUpgrades');
    removeItem('passiveEarned');
    removeItem('netWorthHistory');
    removeItem('loginStreak');
    removeItem('lastLoginDate');
    removeItem('globalSupply');
  };

  const portfolioValue = stocks.reduce((sum, stock) => {
    const owned = portfolio[stock.name] || 0;
    return sum + owned * stock.price;
  }, 0);
  const netWorth = balance + portfolioValue;

  const filteredStocks = stocks.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRandomBuy = () => {
    const random = stocks[Math.floor(Math.random() * stocks.length)];
    if (random) handleBuy(random.name);
  };

  const handleSellAll = () => {
    let earned = 0;
    const newPortfolio = { ...portfolio };
    stocks.forEach((s) => {
      const count = newPortfolio[s.name] || 0;
      if (count > 0) {
        earned += count * s.price;
        newPortfolio[s.name] = 0;
        setGlobalSupply((g) => ({ ...g, [s.name]: g[s.name] + count }));
      }
    });
    if (earned > 0) {
      setPortfolio(newPortfolio);
      setBalance((b) => b + earned);
      addToast(`Sold all stock for ${earned}\u00A2`);
    }
  };

  return (
    <Layout
      sidebar={
        <Sidebar
          balance={balance}
          netWorth={netWorth}
          onRandomBuy={handleRandomBuy}
          onSellAll={handleSellAll}
          onReset={resetGame}
        />
      }
    >
      <div className="space-y-6">
        <Header />
        <BalanceDisplay balance={balance} />
        <LoginStreakDisplay streak={loginStreak} />
        <PassiveIncomeDisplay rate={passiveRate} earned={passiveEarned} />
        <PortfolioValueDisplay stocks={stocks} portfolio={portfolio} />
        <NetWorthDisplay balance={balance} stocks={stocks} portfolio={portfolio} />
        <PortfolioChart data={history} />
        <StockCount count={stocks.length} />
        <WindowFrame title="Upgrades">
          <UpgradeShop
            upgrades={upgrades}
            purchased={purchasedUpgrades}
            onPurchase={handlePurchaseUpgrade}
          />
        </WindowFrame>
        <WindowFrame title="Market">
          <StockFilter search={search} onSearch={setSearch} />
          <StockList
            stocks={filteredStocks}
            portfolio={portfolio}
            balance={balance}
            supply={globalSupply}
            limits={stockLimits}
            onBuy={handleBuy}
            onSell={handleSell}
          />
        </WindowFrame>
        <Footer onReset={resetGame} />
        <ToastContainer toasts={toasts} />
      </div>
    </Layout>
  );
}

export default Dashboard;
