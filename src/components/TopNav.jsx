import { NavLink } from 'react-router-dom';

function TopNav() {
  const baseClasses =
    'px-3 py-1 hover:text-cyan-400 hover:scale-105 transition-all';

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-black text-green-400 border-b border-green-600">
      <NavLink to="/" className="text-pink-400 glitch text-xl">
        404CACHE
      </NavLink>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
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
          to="/profile"
          className={({ isActive }) => `${baseClasses} ${isActive ? 'text-cyan-400' : ''}`}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default TopNav;
