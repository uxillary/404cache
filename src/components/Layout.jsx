import React from 'react'

function Layout({ children, sidebar }) {
  return (
    <div className="min-h-screen flex bg-black text-green-300 font-mono crt-effect">
      {sidebar}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default Layout
