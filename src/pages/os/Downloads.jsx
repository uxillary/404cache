import { useState, useEffect } from 'react'
import WindowFrame from '../../components/WindowFrame'
import { getItem, setItem } from '../../lib/storage'

const APPS = [
  { id: 'realmplayer', name: 'RealMPlayer', icon: '💾', error: 'System32 modified!' },
  { id: 'sk8skin', name: 'Sk8Skin Installer', icon: '🛹', error: 'Missing DLL: RADSKATE32.DLL' },
  { id: 'limeworm', name: 'LimeWorm 2000', icon: '🦠', error: 'Virus detected!' },
]

function Downloads() {
  const [status, setStatus] = useState({})
  const [collected, setCollected] = useState(() => getItem('downloadsCollected') || {})

  useEffect(() => {
    setItem('downloadsCollected', collected)
  }, [collected])

  const startDownload = (id) => {
    if (status[id]?.phase === 'downloading') return
    setStatus((s) => ({ ...s, [id]: { phase: 'downloading', progress: 0 } }))
    const interval = setInterval(() => {
      setStatus((s) => {
        const prog = Math.min(100, (s[id]?.progress || 0) + 10)
        if (prog >= 100) {
          clearInterval(interval)
          return { ...s, [id]: { phase: 'error', progress: 100 } }
        }
        return { ...s, [id]: { phase: 'downloading', progress: prog } }
      })
    }, 300)
  }

  const collect = (id) => {
    setCollected((c) => ({ ...c, [id]: new Date().toISOString() }))
  }

  return (
    <WindowFrame title="Downloads">
      <div className="space-y-4">
        {APPS.map((app) => {
          const st = status[app.id]
          const collectedDate = collected[app.id]
          return (
            <div key={app.id} className="p-2 border border-green-500 rounded">
              <div className="flex items-center justify-between">
                <span className="mr-2">{app.icon}</span>
                <span className="flex-1">{app.name}</span>
                {st?.phase === 'downloading' ? (
                  <span>{st.progress}%</span>
                ) : collectedDate ? (
                  <span className="text-xs text-green-400">Collected</span>
                ) : (
                  <button className="neon-button" onClick={() => startDownload(app.id)}>
                    Download
                  </button>
                )}
              </div>
              {st?.phase === 'downloading' && (
                <div className="h-2 bg-green-800 mt-2">
                  <div className="h-full bg-green-400" style={{ width: `${st.progress}%` }} />
                </div>
              )}
              {st?.phase === 'error' && (
                <div className="mt-2 text-red-400 text-sm flex items-center justify-between">
                  <span>{app.error}</span>
                  {!collectedDate && (
                    <button className="ml-2 neon-button" onClick={() => collect(app.id)}>
                      Collect
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </WindowFrame>
  )
}

export default Downloads
