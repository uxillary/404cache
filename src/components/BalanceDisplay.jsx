function BalanceDisplay({ balance }) {
  return (
    <div className="mb-8 text-green-400 text-xl font-mono">
      Balance: <span className="font-bold">{balance}₵</span>
    </div>
  );
}

export default BalanceDisplay;
