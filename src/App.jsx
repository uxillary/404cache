import { useState, useEffect } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import StockList from './components/StockList';
import StockCount from './components/StockCount';
import Header from './components/Header';
import Footer from './components/Footer';
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
  const [stocks, setStocks] = useState([
    { name: 'BananaCorp 🍌', price: 120 },
    { name: 'DuckWare 🦆', price: 80 },
    { name: 'ToasterInc 🔥', price: 200 },
  ]);
  const [portfolio, setPortfolio] = useState({
    'BananaCorp 🍌': 0,
    'DuckWare 🦆': 0,
    'ToasterInc 🔥': 0,
  });

  const updateStockPrices = () => {
    setStocks((prev) =>
      prev.map((stock) => {
        const changePct = (Math.random() - 0.5) * 0.2; // -10% to +10%
        const newPrice = Math.max(1, Math.round(stock.price * (1 + changePct)));
        return { ...stock, price: newPrice };
      })
    );
  };

  useEffect(() => {
    const id = setInterval(updateStockPrices, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const handleBuy = (stockName) => {
    const stock = stocks.find((s) => s.name === stockName);
    if (balance >= stock.price) {
      setBalance(balance - stock.price);
      setPortfolio((prev) => ({
        ...prev,
        [stockName]: prev[stockName] + 1,
      }));
    }
  };

  const handleSell = (stockName) => {
    const stock = stocks.find((s) => s.name === stockName);
    if (portfolio[stockName] > 0) {
      setBalance(balance + stock.price);
      setPortfolio((prev) => ({
        ...prev,
        [stockName]: prev[stockName] - 1,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono p-4 md:p-8 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        <Header />
        <BalanceDisplay balance={balance} />
        <StockList
          stocks={stocks}
          onBuy={handleBuy}
          onSell={handleSell}
          portfolio={portfolio}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
