import { useState, useEffect } from 'react';
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
import confetti from "canvas-confetti";
import { getItem, setItem, removeItem } from "../lib/storage";

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
  const [stocks, setStocks] = useState([
    { name: 'BananaCorp \ud83c\udf4c', price: 120, prevPrice: 120 },
    { name: 'DuckWare \ud83e\udd86', price: 80, prevPrice: 80 },
    { name: 'ToasterInc \ud83d\udd25', price: 200, prevPrice: 200 },
  ]);
  const [history, setHistory] = useState(() => {
    const stored = getItem<number[]>('netWorthHistory');
    return stored ?? [];
  });

  const [loginStreak, setLoginStreak] = useState(1);

  const [toasts, setToasts] = useState([]);

  const addToast = (text) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const updateStockPrices = () => {
    setStocks((prev) =>
      prev.map((stock) => {
        const changePct = (Math.random() - 0.5) * 0.2; // -10% to +10%
        const newPrice = Math.max(1, Math.round(stock.price * (1 + changePct)));
        return { ...stock, prevPrice: stock.price, price: newPrice };
      })
    );
  };

  useEffect(() => {
    const id = setInterval(updateStockPrices, 5000);
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
    if (balance >= stock.price) {
      setBalance((b) => b - stock.price);
      setPortfolio((p) => ({ ...p, [stockName]: (p[stockName] || 0) + 1 }));
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
      addToast(`Sold 1 ${stockName} for ${stock.price}\u00A2`);
    } else {
      addToast(`No ${stockName} stock to sell`);
    }
  };

  const resetGame = () => {
    setBalance(5000);
    setPortfolio({});
    setPassiveRate(5);
    setPurchasedUpgrades([]);
    setPassiveEarned(0);
    setStocks([
      { name: 'BananaCorp \ud83c\udf4c', price: 120 },
      { name: 'DuckWare \ud83e\udd86', price: 80 },
      { name: 'ToasterInc \ud83d\udd25', price: 200 },
    ]);
    removeItem('balance');
    removeItem('portfolio');
    removeItem('passiveRate');
    removeItem('purchasedUpgrades');
    removeItem('passiveEarned');
  };

  const portfolioValue = stocks.reduce((sum, stock) => {
    const owned = portfolio[stock.name] || 0;
    return sum + owned * stock.price;
  }, 0);
  const netWorth = balance + portfolioValue;

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
          <StockList
            stocks={stocks}
            portfolio={portfolio}
            balance={balance}
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
