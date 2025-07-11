import React, { useState } from 'react'

function Layout({ children, sidebar }) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-black text-green-300 font-retro crt-effect shadow-inner">
      {sidebar && React.cloneElement(sidebar, { className: `${sidebar.props.className ?? ''} hidden lg:block` })}
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">{children}</div>
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
              <div className="w-40 bg-black/80 backdrop-blur-sm border-r border-green-700 p-4 overflow-y-auto">
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="mb-4 bg-red-700 hover:bg-red-900 text-white px-2 py-1 rounded w-full"
                >
                  Close
                </button>
                {React.cloneElement(sidebar, { className: sidebar.props.className ?? '' })}
              </div>
              <div
                className="flex-1 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowMobileSidebar(false)}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Layout
