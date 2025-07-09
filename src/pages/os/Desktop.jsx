import { useState } from 'react'
import Layout from '../../components/Layout'
import WindowFrame from '../../components/WindowFrame'
import { PopupFrenzy, DialUpDungeon } from '../../games/Minigames'
import Downloads from './Downloads'
import Fragments from './Fragments'

const APPS = [
  { id: 'popup', name: 'Pop-up Frenzy', icon: '🪟' },
  { id: 'dungeon', name: 'Dial-Up Dungeon', icon: '💾' },
  { id: 'downloads', name: 'Downloads', icon: '⬇️' },
  { id: 'fragments', name: 'Fragments', icon: '🗃️' },
]

function Desktop() {
  const [openApp, setOpenApp] = useState(null)

  const renderApp = () => {
    switch (openApp) {
      case 'popup':
        return <PopupFrenzy />
      case 'dungeon':
        return <DialUpDungeon />
      case 'downloads':
        return <Downloads />
      case 'fragments':
        return <Fragments />
      default:
        return null
    }
  }

  return (
    <Layout>
      <section className="mt-10 text-green-300 space-y-8">
        <h2 className="text-center text-3xl text-green-400 mb-6">Desktop</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {APPS.map((app) => (
            <button
              key={app.id}
              className="neon-card p-4 w-32 flex flex-col items-center cursor-pointer"
              onClick={() => setOpenApp(app.id)}
            >
              <span className="text-4xl">{app.icon}</span>
              <span className="mt-2 text-center text-sm">{app.name}</span>
            </button>
          ))}
        </div>
      </section>
      {openApp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
          <div className="w-full max-w-lg">
            <WindowFrame title={APPS.find((a) => a.id === openApp)?.name || ''}>
              <div className="mb-4 text-right">
                <button onClick={() => setOpenApp(null)} className="neon-button">
                  Close
                </button>
              </div>
              {renderApp()}
            </WindowFrame>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Desktop
