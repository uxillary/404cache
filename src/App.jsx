import { useState, useEffect } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import PortfolioValueDisplay from './components/PortfolioValueDisplay';
import StockList from './components/StockList';
import StockCount from './components/StockCount';
import PassiveIncomeDisplay from './components/PassiveIncomeDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import './index.css';

function App() {
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem('balance');
    return stored ? JSON.parse(stored) : 5000;
  });
  const [portfolio, setPortfolio] = useState(() => {
    const stored = localStorage.getItem('portfolio');
    return stored ? JSON.parse(stored) : {};
  });
  const [passiveRate] = useState(5); // currency earned every 10 seconds
  const [passiveEarned, setPassiveEarned] = useState(() => {
    const stored = localStorage.getItem('passiveEarned');
    return stored ? JSON.parse(stored) : 0;
  });
  const [stocks, setStocks] = useState([
    { name: 'BananaCorp \ud83c\udf4c', price: 120, prevPrice: 120 },
    { name: 'DuckWare \ud83e\udd86', price: 80, prevPrice: 80 },
    { name: 'ToasterInc \ud83d\udd25', price: 200, prevPrice: 200 },
  ]);

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

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono p-4 md:p-8 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        <Header />
        <BalanceDisplay balance={balance} />
        <PassiveIncomeDisplay rate={passiveRate} earned={passiveEarned} />
        <PortfolioValueDisplay stocks={stocks} portfolio={portfolio} />
        <StockCount count={stocks.length} />
        <StockList
          stocks={stocks}
          portfolio={portfolio}
          balance={balance}
          onBuy={handleBuy}
          onSell={handleSell}
        />
        <ToastContainer toasts={toasts} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
