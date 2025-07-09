import React, { useState } from 'react'

function Layout({ children, sidebar }) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  return (
    <div className="min-h-screen flex bg-black text-green-300 font-mono crt-effect">
      {sidebar && React.cloneElement(sidebar, { className: `${sidebar.props.className ?? ''} hidden lg:block` })}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
      {sidebar && (
        <>
          <button
            className="lg:hidden fixed bottom-4 left-4 z-20 bg-green-700 hover:bg-green-900 text-white px-3 py-2 rounded"
            onClick={() => setShowMobileSidebar(true)}
          >
            Tools
          </button>
          {showMobileSidebar && (
            <div className="lg:hidden fixed inset-0 z-30 flex">
              <div className="w-56 bg-black/90 border-r border-green-600 p-4 overflow-y-auto">
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="mb-4 bg-red-700 hover:bg-red-900 text-white px-2 py-1 rounded w-full"
                >
                  Close
                </button>
                {React.cloneElement(sidebar, { className: sidebar.props.className ?? '' })}
              </div>
              <div className="flex-1 bg-black/70" onClick={() => setShowMobileSidebar(false)} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Layout
