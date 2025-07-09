function PortfolioValueDisplay({ stocks, portfolio, bonus = 1 }) {
  const totalValue = stocks.reduce((sum, stock) => {
    const owned = portfolio[stock.name] || 0;
    return sum + owned * stock.price * bonus;
  }, 0);

  return (
    <div className="mb-4 text-blue-400">
      Portfolio Value: <span className="font-bold">{totalValue}₵</span>
    </div>
  );
}

export default PortfolioValueDisplay;
