import { useState, useEffect } from 'react';
import { getItem, setItem } from '../lib/storage';

function SoundToggle() {
  const [enabled, setEnabled] = useState(() => {
    const stored = getItem('sound');
    return stored !== null ? stored : true;
  });

  useEffect(() => {
    setItem('sound', enabled);
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((e) => !e)}
      className="px-3 py-1 hover:text-cyan-400 hover:scale-105 transition-all uppercase font-semibold"
    >
      {enabled ? 'Mute' : 'Unmute'}
    </button>
  );
}

export default SoundToggle;
