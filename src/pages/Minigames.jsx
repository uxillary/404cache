import { useState } from 'react';
import Layout from '../components/Layout';
import WindowFrame from '../components/WindowFrame';
import { PopupFrenzy, DialUpDungeon } from '../games/Minigames';

function Minigames() {
  const [openGame, setOpenGame] = useState(null);

  const renderGame = () => {
    if (openGame === 'popup') return <PopupFrenzy />;
    if (openGame === 'dungeon') return <DialUpDungeon />;
    return null;
  };

  return (
    <Layout>
      <section className="mt-10 text-green-300 space-y-8">
        <h2 className="text-center text-3xl text-green-400 mb-6">Desktop</h2>
        <div className="flex gap-8 justify-center">
          <button
            className="neon-card p-4 flex flex-col items-center cursor-pointer"
            onClick={() => setOpenGame('popup')}
          >
            <span className="text-4xl">🪟</span>
            <span className="mt-2">Pop-up Frenzy</span>
          </button>
          <button
            className="neon-card p-4 flex flex-col items-center cursor-pointer"
            onClick={() => setOpenGame('dungeon')}
          >
            <span className="text-4xl">💾</span>
            <span className="mt-2">Dial-Up Dungeon</span>
          </button>
        </div>
      </section>
      {openGame && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
          <div className="w-full max-w-lg">
            <WindowFrame title={openGame === 'popup' ? 'Pop-up Frenzy' : 'Dial-Up Dungeon'}>
              <div className="mb-4 text-right">
                <button onClick={() => setOpenGame(null)} className="neon-button">Close</button>
              </div>
              {renderGame()}
            </WindowFrame>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Minigames;
