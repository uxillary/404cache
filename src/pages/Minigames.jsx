import Layout from '../components/Layout';
import PopupFrenzy from '../components/PopupFrenzy';

function Minigames() {
  return (
    <Layout>
      <div className="text-center text-green-400 mt-10">
        <h2 className="text-3xl mb-4">Minigames</h2>
        <p>Close pop-ups to earn extra coins.</p>
        <PopupFrenzy />
      </div>
    </Layout>
  );
}

export default Minigames;
