function PortfolioSummaryBar({ value, passiveRate, changePct, onCmdToggle }) {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-black/80 text-green-300 border-t border-green-600 flex justify-around items-center p-2 text-sm z-20">
      <div>Total Value: {value}₵</div>
      <div>Passive/min: {passiveRate}</div>
      <div>Today: {changePct}%</div>
      {onCmdToggle && (
        <button onClick={onCmdToggle} className="px-2 py-1 bg-gray-800 border border-green-600 rounded">Cmd</button>
      )}
    </div>
  );
}

export default PortfolioSummaryBar;
