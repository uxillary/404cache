import { useState, useEffect } from 'react';
import { updateStockPrices } from '../utils/stockSimulator';
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
import { toast } from 'react-toastify';
import { playSound } from '../utils/sfx';
import LoginStreakDisplay from '../components/LoginStreakDisplay';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import WindowFrame from '../components/WindowFrame';
import StockFilter from '../components/StockFilter';
import TerminalModeToggle from '../components/TerminalModeToggle';
import PortfolioSummaryBar from '../components/PortfolioSummaryBar';
import CommandSidebar from '../components/CommandSidebar';
import confetti from "canvas-confetti";
import { getItem, setItem, removeItem } from "../lib/storage";

const INITIAL_STOCKS = [
  { name: 'BananaCorp', ticker: 'BAN', emoji: '🍌', price: 120, prevPrice: 120, type: 'stable', history: [120] },
  { name: 'DuckWare', ticker: 'DUCK', emoji: '🦆', price: 80, prevPrice: 80, type: 'risky', history: [80] },
  { name: 'ToasterInc', ticker: 'TOAST', emoji: '🔥', price: 200, prevPrice: 200, type: 'trending', history: [200] },
  { name: 'SpaceY', ticker: 'SPACE', emoji: '🚀', price: 250, prevPrice: 250, type: 'risky', history: [250] },
  { name: 'LlamaSoft', ticker: 'LLMA', emoji: '🦙', price: 150, prevPrice: 150, type: 'stable', history: [150] },
  { name: 'Robotix', ticker: 'BOT', emoji: '🤖', price: 180, prevPrice: 180, type: 'trending', history: [180] },
];

const RARE_MARKETS = {
  cyber: [
    { name: 'CyberDyne', ticker: 'CYBR', emoji: '💻', price: 300, prevPrice: 300, type: 'rare', history: [300] },
    { name: 'MystiCorp', ticker: 'MYST', emoji: '🧪', price: 400, prevPrice: 400, type: 'rare', history: [400] },
  ],
};

function Dashboard() {
  const [upgrades, setUpgrades] = useState([]);
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
  const [portfolioBonus, setPortfolioBonus] = useState(() => {
    const stored = getItem<number>('portfolioBonus');
    return stored ?? 1;
  });
  const [unlockedMarkets, setUnlockedMarkets] = useState(() => {
    const stored = getItem<string[]>('unlockedMarkets');
    return stored ?? [];
  });
  const [passiveEarned, setPassiveEarned] = useState(() => {
    const stored = getItem<number>('passiveEarned');
    return stored ?? 0;
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

  const [terminalMode, setTerminalMode] = useState(() => getItem<boolean>('terminalMode') === 'true');
  const [showCmd, setShowCmd] = useState(false);

  const addToast = (message, type = 'info') => {
    toast(message, { type, toastId: message });
  };

  const flash = () => {
    document.body.classList.add('glitch-flash');
    setTimeout(() => {
      document.body.classList.remove('glitch-flash');
    }, 200);
  };


  const [limits, setLimits] = useState({});
  const [extraLimit, setExtraLimit] = useState(() => {
    const stored = getItem<number>('extraLimit');
    return stored ?? 0;
  });
  const [globalOwned, setGlobalOwned] = useState(() => {
    const stored = getItem<Record<string, number>>('globalOwned');
    return stored ?? {};
  });


  const updateStockPricesWrapper = () => {
    setStocks((prev) => updateStockPrices(prev));
  };

  useEffect(() => {
    setStocks((prev) => {
      let updated = [...prev];
      unlockedMarkets.forEach((m) => {
        const extras = RARE_MARKETS[m];
        if (extras) {
          extras.forEach((stk) => {
            if (!updated.find((s) => s.name === stk.name)) {
              updated.push({ ...stk });
            }
          });
        }
      });
      return updated;
    });
  }, [unlockedMarkets]);

  useEffect(() => {
    fetch('/stockLimits.json')
      .then((r) => r.json())
      .then((data) => setLimits(data))
      .catch(() => {});
    fetch('/upgrades.json')
      .then((r) => r.json())
      .then((data) => setUpgrades(data))
      .catch(() => {});
  }, []);

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
      playSound('beep');
      addToast(`Daily login bonus! +${reward}\u00A2 (Streak ${newStreak})`);
    }
  }, []);

  useEffect(() => {
    setItem('loginStreak', loginStreak);
  }, [loginStreak]);

  useEffect(() => {
    setItem('globalOwned', globalOwned);
  }, [globalOwned]);

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
      return sum + owned * stock.price * portfolioBonus;
    }, 0);
    const netWorth = balance + portfolioValue;
    setHistory((h) => {
      const updated = [...h, netWorth].slice(-20);
      setItem('netWorthHistory', updated);
      return updated;
    });
  }, [stocks, balance, portfolio, portfolioBonus]);

  useEffect(() => {
    setItem('passiveRate', passiveRate);
  }, [passiveRate]);

  useEffect(() => {
    setItem('purchasedUpgrades', purchasedUpgrades);
  }, [purchasedUpgrades]);

  useEffect(() => {
    setItem('portfolioBonus', portfolioBonus);
  }, [portfolioBonus]);

  useEffect(() => {
    setItem('unlockedMarkets', unlockedMarkets);
  }, [unlockedMarkets]);

  useEffect(() => {
    setItem('extraLimit', extraLimit);
  }, [extraLimit]);

  const handlePurchaseUpgrade = (id) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) return;
    if (balance >= upgrade.cost && !purchasedUpgrades.includes(id)) {
      setBalance((b) => b - upgrade.cost);
      setPurchasedUpgrades((u) => [...u, id]);
      switch (upgrade.type) {
        case 'passive_add':
          setPassiveRate((r) => r + upgrade.value);
          break;
        case 'passive_mult':
          setPassiveRate((r) => r * upgrade.value);
          break;
        case 'portfolio_mult':
          setPortfolioBonus((p) => p * upgrade.value);
          break;
        case 'unlock_market':
          if (!unlockedMarkets.includes(upgrade.value)) {
            setUnlockedMarkets((m) => [...m, upgrade.value]);
          }
          break;
        case 'limit_up':
          setExtraLimit((l) => l + upgrade.value);
          break;
        default:
          break;
      }
      playSound('upgrade');
      addToast(`${upgrade.name} purchased!`, 'success');
      flash();
    }
  };

  const handleBuy = (stockName, qty = 1) => {
    const stock = stocks.find((s) => s.name === stockName);
    const cap = limits[stockName];
    const owned = portfolio[stockName] || 0;
    const globalCount = globalOwned[stockName] || 0;
    if (cap) {
      if (globalCount + qty > cap.globalLimit) {
        addToast(`${stockName} is sold out`);
        return;
      }
      if (cap.perPlayerLimit && owned + qty > cap.perPlayerLimit + extraLimit) {
        addToast(`You reached the limit for ${stockName}`);
        return;
      }
    }
    const cost = stock.price * qty;
    if (balance >= cost) {
      const newOwned = owned + qty;
      const newGlobal = globalCount + qty;
      setBalance((b) => b - cost);
      setPortfolio((p) => ({ ...p, [stockName]: newOwned }));
      setGlobalOwned((g) => ({
        ...g,
        [stockName]: newGlobal,
      }));
      playSound('buy');
      const remaining = cap ? cap.globalLimit - newGlobal : '∞';
      addToast(
        `Bought ${qty} ${stockName} for ${cost}\u00A2. Owned: ${newOwned}. Remaining: ${remaining}`,
        'success',
      );
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      flash();
    } else {
      addToast(`Not enough balance to buy ${stockName}`);
    }
  };

  const handleSell = (stockName, qty = 1) => {
    const owned = portfolio[stockName] || 0;
    if (owned >= qty) {
      const stock = stocks.find((s) => s.name === stockName);
      const sellPrice = Math.round(stock.price * portfolioBonus) * qty;
      const newOwned = owned - qty;
      const newGlobal = Math.max(0, (globalOwned[stockName] || 0) - qty);
      setBalance((b) => b + sellPrice);
      setPortfolio((p) => ({ ...p, [stockName]: newOwned }));
      setGlobalOwned((g) => ({
        ...g,
        [stockName]: newGlobal,
      }));
      playSound('sell');
      const remaining = limits[stockName]
        ? limits[stockName].globalLimit - newGlobal
        : '∞';
      addToast(
        `Sold ${qty} ${stockName} for ${sellPrice}\u00A2. Owned: ${newOwned}. Remaining: ${remaining}`,
        'success',
      );
      flash();
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
    setPortfolioBonus(1);
    setUnlockedMarkets([]);
    setPassiveEarned(0);
    setLoginStreak(1);
    setHistory([]);
    setStocks(INITIAL_STOCKS.map((s) => ({ ...s })));
    setGlobalOwned({});
    setExtraLimit(0);
    removeItem('balance');
    removeItem('portfolio');
    removeItem('passiveRate');
    removeItem('purchasedUpgrades');
    removeItem('portfolioBonus');
    removeItem('unlockedMarkets');
    removeItem('passiveEarned');
    removeItem('netWorthHistory');
    removeItem('loginStreak');
    removeItem('lastLoginDate');
    removeItem('globalOwned');
    removeItem('extraLimit');
  };

  const portfolioValue = stocks.reduce((sum, stock) => {
    const owned = portfolio[stock.name] || 0;
    return sum + owned * stock.price * portfolioBonus;
  }, 0);
  const netWorth = balance + portfolioValue;
  const changePct = history.length > 1 ? (((netWorth - history[0]) / history[0]) * 100).toFixed(2) : '0.00';

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
    const updatedGlobal = { ...globalOwned };
    stocks.forEach((s) => {
      const count = newPortfolio[s.name] || 0;
      if (count > 0) {
        earned += count * Math.round(s.price * portfolioBonus);
        newPortfolio[s.name] = 0;
        updatedGlobal[s.name] = Math.max(0, (updatedGlobal[s.name] || 0) - count);
      }
    });
    setGlobalOwned(updatedGlobal);
    if (earned > 0) {
      setPortfolio(newPortfolio);
      setBalance((b) => b + earned);
      playSound('sell');
      addToast(`Sold all stock for ${earned}\u00A2`, 'success');
      flash();
    }
  };

  const handleCommand = (cmd) => {
    const parts = cmd.trim().split(/\s+/);
    const action = parts[0]?.toUpperCase();
    const name = parts[1];
    const qty = parseInt(parts[2], 10) || 1;
    if (action === 'BUY') {
      handleBuy(name, qty);
    } else if (action === 'SELL') {
      handleSell(name, qty);
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
          onShowCommands={() => setShowCmd(true)}
        />
      }
    >
      <div className="space-y-6">
        <Header />
        <BalanceDisplay balance={balance} />
        <LoginStreakDisplay streak={loginStreak} />
        <PassiveIncomeDisplay rate={passiveRate} earned={passiveEarned} />
        <PortfolioValueDisplay
          stocks={stocks}
          portfolio={portfolio}
          bonus={portfolioBonus}
        />
        <NetWorthDisplay
          balance={balance}
          stocks={stocks}
          portfolio={portfolio}
          bonus={portfolioBonus}
        />
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
          <div className="flex justify-between items-center mb-2">
            <StockFilter search={search} onSearch={setSearch} />
            <TerminalModeToggle onToggle={setTerminalMode} />
          </div>
          <StockList
            stocks={filteredStocks}
            portfolio={portfolio}
            balance={balance}
            onBuy={handleBuy}
            onSell={handleSell}
            limits={limits}
            extraLimit={extraLimit}
            globalOwned={globalOwned}
            terminalMode={terminalMode}
          />
        </WindowFrame>
        <Footer onReset={resetGame} />
        <ToastContainer />
      </div>
      <PortfolioSummaryBar
        value={netWorth}
        passiveRate={passiveRate * 6}
        changePct={changePct}
        onCmdToggle={() => setShowCmd(true)}
      />
      {showCmd && (
        <CommandSidebar onCommand={handleCommand} onClose={() => setShowCmd(false)} />
      )}
    </Layout>
  );
}

export default Dashboard;
