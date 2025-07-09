import React from 'react'

function WindowFrame({ title, children }) {
  return (
    <div className="border border-green-400 bg-black/70 rounded shadow-lg mb-4">
      <div className="flex items-center justify-between bg-green-700 text-black px-2 py-1">
        <span className="font-bold">{title}</span>
        <div className="space-x-1">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

export default WindowFrame
