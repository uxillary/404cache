import React from 'react'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-green-300 font-mono px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 crt-effect">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

export default Layout
