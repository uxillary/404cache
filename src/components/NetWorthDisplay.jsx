function NetWorthDisplay({ balance, stocks, portfolio, bonus = 1 }) {
  const totalStocksValue = stocks.reduce((sum, stock) => {
    const owned = portfolio[stock.name] || 0;
    return sum + owned * stock.price * bonus;
  }, 0);
  const netWorth = balance + totalStocksValue;

  return (
    <div className="mb-4 text-teal-400">
      Net Worth: <span className="font-bold">{netWorth}\u00A2</span>
    </div>
  );
}

export default NetWorthDisplay;
