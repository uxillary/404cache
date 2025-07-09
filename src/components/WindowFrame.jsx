import React from 'react'

function WindowFrame({ title, children }) {
  return (
    <div className="border border-green-400 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm rounded shadow-lg shadow-green-700/40 mb-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-green-700 to-green-600 text-black px-2 py-1">
        <span className="font-bold">{title}</span>
        <div className="space-x-1">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
      <div className="p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  )
}

export default WindowFrame
