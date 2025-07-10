import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';
import { getItem } from '../lib/storage';

function TopNav() {
  const baseClasses =
    'px-3 py-1 hover:text-cyan-400 hover:scale-105 transition-all uppercase font-semibold';
  const name = getItem('profileName') || 'User';
  const avatar = getItem('profileAvatar') || '😎';

  return (
    <nav className="sticky top-0 z-20 flex justify-between items-center px-6 py-3 bg-black/70 backdrop-blur-sm text-green-400 border-b border-green-700 shadow-lg">
      <NavLink to="/" className="text-pink-400 glitch text-xl font-bold tracking-widest">
        404CACHE
      </NavLink>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 items-center">
        <NavLink
          to="/"
          className={({ isActive }) => `${baseClasses} ${isActive ? 'text-cyan-400' : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/minigames"
          className={({ isActive }) => `${baseClasses} ${isActive ? 'text-cyan-400' : ''}`}
        >
          Minigames
        </NavLink>
        <NavLink
          to="/os"
          className={({ isActive }) => `${baseClasses} ${isActive ? 'text-cyan-400' : ''}`}
        >
          Desktop
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `${baseClasses} ${isActive ? 'text-cyan-400' : ''}`}
        >
          Profile
        </NavLink>
        <SoundToggle />
        <ThemeToggle />
        <div className="hidden sm:flex items-center ml-2 space-x-1">
          <span className="text-xl">{avatar}</span>
          <span className="text-sm">{name}</span>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
