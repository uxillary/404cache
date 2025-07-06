import { useState } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import StockList from './components/StockList';
import Header from './components/Header';
import './index.css';

function App() {
  const [balance, setBalance] = useState(5000);
  const [stocks] = useState([
    { name: 'BananaCorp 🍌', price: 120 },
    { name: 'DuckWare 🦆', price: 80 },
    { name: 'ToasterInc 🔥', price: 200 },
  ]);

  const handleBuy = (stockName) => {
    const stock = stocks.find((s) => s.name === stockName);
    if (balance >= stock.price) {
      setBalance(balance - stock.price);
    }
  };

  const handleSell = (stockName) => {
    const stock = stocks.find((s) => s.name === stockName);
    setBalance(balance + stock.price);
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono p-8 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        <Header />
        <BalanceDisplay balance={balance} />
        <StockList stocks={stocks} onBuy={handleBuy} onSell={handleSell} />
      </div>
    </div>
  );
}

export default App;
