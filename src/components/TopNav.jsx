import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';

function TopNav() {
  const baseClasses =
    'px-3 py-1 hover:text-cyan-400 hover:scale-105 transition-all uppercase font-semibold';

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-md text-green-400 border-b border-green-600 shadow-lg">
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
      </div>
    </nav>
  );
}

export default TopNav;
