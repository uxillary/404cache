import { useState, useEffect } from 'react';
import { getItem, setItem } from '../lib/storage';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => getItem('theme') || 'default');

  useEffect(() => {
    if (theme === 'retro') {
      document.documentElement.style.setProperty(
        '--text-color',
        '#0f0'
      );
      document.documentElement.style.setProperty(
        '--bg-color',
        'radial-gradient(circle at 50% 0px, rgb(0, 34, 0), rgb(0, 0, 0))'
      );
    } else {
      document.documentElement.style.setProperty(
        '--text-color',
        '#0ff'
      );
      document.documentElement.style.setProperty(
        '--bg-color',
        'radial-gradient(circle at 50% 0px, rgb(0, 34, 34), rgb(0, 0, 0))'
      );
    }
    setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'default' ? 'retro' : 'default')}
      className="px-3 py-1 hover:text-cyan-400 hover:scale-105 transition-all uppercase font-semibold"
    >
      {theme === 'default' ? 'Retro Mode' : 'Default Mode'}
    </button>
  );
}

export default ThemeToggle;
