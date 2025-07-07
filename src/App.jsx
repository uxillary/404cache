import { useState } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import StockList from './components/StockList';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [balance, setBalance] = useState(5000);
  const [stocks] = useState([
    { name: 'BananaCorp 🍌', price: 120 },
    { name: 'DuckWare 🦆', price: 80 },
    { name: 'ToasterInc 🔥', price: 200 },
  ]);
  const [portfolio, setPortfolio] = useState({
    'BananaCorp 🍌': 0,
    'DuckWare 🦆': 0,
    'ToasterInc 🔥': 0,
  });

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
    <div className="min-h-screen bg-black text-green-300 font-mono p-8 flex items-start justify-center">
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
