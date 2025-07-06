import { useState } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import StockList from './components/StockList';
import './index.css';

function App() {
  const [balance, setBalance] = useState(5000);
  const [stocks, setStocks] = useState([
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
        <h1 className="text-3xl mb-4 glitch text-center">404CACHE STOCK TERMINAL</h1>
        <BalanceDisplay balance={balance} />
        <StockList stocks={stocks} onBuy={handleBuy} onSell={handleSell} />
      </div>
    </div>
  );
}

export default App;
