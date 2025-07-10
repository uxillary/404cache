import React from 'react'

function Sidebar({ balance, netWorth, onRandomBuy, onSellAll, onReset, onShowCommands, className = '' }) {
  return (
    <aside className={`w-40 bg-black/70 backdrop-blur-sm border-r border-green-700 p-6 font-mono text-green-300 ${className}`}>
      <h2 className="text-green-400 mb-4">&gt; Tools</h2>
      <div className="space-y-3 text-sm">
        <div>Balance: {balance}₵</div>
        <div>Net Worth: {netWorth}₵</div>
        <button
          onClick={onRandomBuy}
          className="w-full bg-green-700 hover:bg-green-900 text-white px-2 py-1 rounded"
        >
          Random Buy
        </button>
        <button
          onClick={onSellAll}
          className="w-full bg-yellow-700 hover:bg-yellow-900 text-white px-2 py-1 rounded"
        >
          Sell All
        </button>
        <button
          onClick={onReset}
          className="w-full bg-red-700 hover:bg-red-900 text-white px-2 py-1 rounded"
        >
          Reset
        </button>
        {onShowCommands && (
          <button
            onClick={onShowCommands}
            className="w-full bg-blue-700 hover:bg-blue-900 text-white px-2 py-1 rounded"
          >
            Commands
          </button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
