import Layout from '../components/Layout';
import ProfileStats from '../components/ProfileStats';

function Profile() {
  return (
    <Layout>
      <div className="text-center text-green-400 mt-10">
        <h2 className="text-3xl mb-4">Profile</h2>
        <ProfileStats />
      </div>
    </Layout>
  );
}

export default Profile;
