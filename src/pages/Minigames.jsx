import Layout from '../components/Layout';
import PopupFrenzy from '../components/PopupFrenzy';
import CoinGrabber from '../components/CoinGrabber';

function Minigames() {
  return (
    <Layout>
      <div className="text-center text-green-400 mt-10 space-y-8">
        <h2 className="text-3xl mb-4">Minigames</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-2">Close pop-ups to earn extra coins.</p>
            <PopupFrenzy />
          </div>
          <div>
            <p className="mb-2">Grab the coins before they disappear.</p>
            <CoinGrabber />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Minigames;
