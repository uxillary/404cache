import Layout from '../components/Layout';
import PopupFrenzy from '../components/PopupFrenzy';
import CoinGrabber from '../components/CoinGrabber';

function Minigames() {
  return (
    <Layout>
      <section className="mt-10 text-green-300 space-y-12 flex flex-col items-center">
        <h2 className="text-center text-4xl font-pixel text-green-400 mb-8">Minigames</h2>
        <div className="grid gap-12 md:grid-cols-2 w-full place-items-center">
          <article className="neon-card flex flex-col items-center p-4 space-y-2">
            <h3 className="text-2xl font-pixel text-green-200">Pop-up Frenzy</h3>
            <p className="mb-2 text-sm font-mono text-green-400">Close pop-ups fast to earn more coins.</p>
            <PopupFrenzy />
          </article>
          <article className="neon-card flex flex-col items-center p-4 space-y-2">
            <h3 className="text-2xl font-pixel text-green-200">Coin Grabber</h3>
            <p className="mb-2 text-sm font-mono text-green-400">Click coins before they vanish.</p>
            <CoinGrabber />
          </article>
        </div>
      </section>
    </Layout>
  );
}

export default Minigames;
