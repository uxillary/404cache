import Layout from '../components/Layout';
import ProfileStats from '../components/ProfileStats';
import ProfileSettings from '../components/ProfileSettings';
import PortfolioChart from '../components/PortfolioChart';
import HighScoreDisplay from '../components/HighScoreDisplay';
import AvatarShop from '../components/AvatarShop';
import { getItem } from '../lib/storage';

function Profile() {
  const history = getItem('netWorthHistory') ?? [];
  const highScore = getItem('popupHighScore') ?? 0;
  const name = getItem('profileName') ?? 'User';
  const avatar = getItem('profileAvatar') ?? '😎';

  return (
    <Layout>
      <div className="text-center text-green-400 mt-10 space-y-6">
        <div className="text-5xl">{avatar}</div>
        <h2 className="text-3xl mb-2">{name}'s Profile</h2>
        <ProfileStats />
        <HighScoreDisplay score={highScore} />
        <PortfolioChart data={history} />
        <ProfileSettings />
        <AvatarShop />
      </div>
    </Layout>
  );
}

export default Profile;
