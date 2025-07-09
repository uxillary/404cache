import React from 'react'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-green-300 font-mono p-4 md:p-8 crt-effect">
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout
