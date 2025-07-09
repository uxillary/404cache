import Layout from '../components/Layout';
import PopupFrenzy from '../components/PopupFrenzy';
import CoinGrabber from '../components/CoinGrabber';

function Minigames() {
  return (
    <Layout>
      <section className="mt-10 text-green-300 space-y-8">
        <h2 className="text-center text-3xl text-green-400 mb-6">Minigames</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="neon-card flex flex-col items-center">
            <h3 className="text-2xl mb-2 text-green-200">Pop-up Frenzy</h3>
            <p className="mb-4 text-sm text-green-400">Close pop-ups fast to earn more coins.</p>
            <PopupFrenzy />
          </article>
          <article className="neon-card flex flex-col items-center">
            <h3 className="text-2xl mb-2 text-green-200">Coin Grabber</h3>
            <p className="mb-4 text-sm text-green-400">Click coins before they vanish.</p>
            <CoinGrabber />
          </article>
        </div>
      </section>
    </Layout>
  );
}

export default Minigames;
