import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Minigames from './pages/Minigames';
import Profile from './pages/Profile';
import Desktop from './pages/os/Desktop';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/minigames" element={<Minigames />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/os" element={<Desktop />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
