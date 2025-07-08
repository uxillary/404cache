import { useState, useEffect } from 'react';
import PortfolioChart from './components/PortfolioChart';
import BalanceDisplay from './components/BalanceDisplay';
import PortfolioValueDisplay from './components/PortfolioValueDisplay';
import StockList from './components/StockList';
import StockCount from './components/StockCount';
import PassiveIncomeDisplay from './components/PassiveIncomeDisplay';
import UpgradeShop from './components/UpgradeShop';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import './index.css';

function App() {
  const upgrades = [
    { id: 'upgrade_income', name: 'Faster Income', cost: 1000, bonus: 1 },
  ];
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem('balance');
    return stored ? JSON.parse(stored) : 5000;
  });
  const [portfolio, setPortfolio] = useState(() => {
    const stored = localStorage.getItem('portfolio');
    return stored ? JSON.parse(stored) : {};
  });
  const [passiveRate, setPassiveRate] = useState(() => {
    const stored = localStorage.getItem('passiveRate');
    return stored ? JSON.parse(stored) : 5;
  });
  const [purchasedUpgrades, setPurchasedUpgrades] = useState(() => {
    const stored = localStorage.getItem('purchasedUpgrades');
    return stored ? JSON.parse(stored) : [];
  });
  const [passiveEarned, setPassiveEarned] = useState(() => {
    const stored = localStorage.getItem('passiveEarned');
    return stored ? JSON.parse(stored) : 0;
  });
  const [stocks, setStocks] = useState([
    { name: 'BananaCorp \ud83c\udf4c', price: 120, prevPrice: 120 },
    { name: 'DuckWare \ud83e\udd86', price: 80, prevPrice: 80 },
    { name: 'ToasterInc \ud83d\udd25', price: 200, prevPrice: 200 },
  ]);
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('netWorthHistory');
    return stored ? JSON.parse(stored) : [];
  });

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
    const id = setInterval(() => {
      setBalance((b) => b + passiveRate);
      setPassiveEarned((e) => e + passiveRate);
    }, 10000);
    return () => clearInterval(id);
  }, [passiveRate]);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('passiveEarned', JSON.stringify(passiveEarned));
  }, [passiveEarned]);

  useEffect(() => {
    const portfolioValue = stocks.reduce((sum, stock) => {
      const owned = portfolio[stock.name] || 0;
      return sum + owned * stock.price;
    }, 0);
    const netWorth = balance + portfolioValue;
    setHistory((h) => {
      const updated = [...h, netWorth].slice(-20);
      localStorage.setItem('netWorthHistory', JSON.stringify(updated));
      return updated;
    });
  }, [stocks, balance, portfolio]);

  useEffect(() => {
    localStorage.setItem('passiveRate', JSON.stringify(passiveRate));
  }, [passiveRate]);

  useEffect(() => {
    localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
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
    localStorage.removeItem('balance');
    localStorage.removeItem('portfolio');
    localStorage.removeItem('passiveRate');
    localStorage.removeItem('purchasedUpgrades');
    localStorage.removeItem('passiveEarned');
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono p-4 md:p-8 flex items-start justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <Header />
        <BalanceDisplay balance={balance} />
        <PassiveIncomeDisplay rate={passiveRate} earned={passiveEarned} />
        <PortfolioValueDisplay stocks={stocks} portfolio={portfolio} />
        <PortfolioChart data={history} />
        <StockCount count={stocks.length} />
        <UpgradeShop
          upgrades={upgrades}
          purchased={purchasedUpgrades}
          onPurchase={handlePurchaseUpgrade}
        />
        <StockList
          stocks={stocks}
          portfolio={portfolio}
          balance={balance}
          onBuy={handleBuy}
          onSell={handleSell}
        />
        <Footer onReset={resetGame} />
        <ToastContainer toasts={toasts} />
      </div>
    </div>
  );
}

export default App;
