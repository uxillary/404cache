import { useState, useEffect } from 'react';
import { getItem, setItem } from '../lib/storage';

function TerminalModeToggle({ onToggle }) {
  const [enabled, setEnabled] = useState(() => getItem('terminalMode') === 'true');

  useEffect(() => {
    setItem('terminalMode', enabled);
    onToggle(enabled);
    document.documentElement.classList.toggle('terminal-mode', enabled);
  }, [enabled, onToggle]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="ml-2 px-2 py-1 bg-gray-800 text-green-400 border border-green-600 rounded"
    >
      {enabled ? 'Exit Terminal' : 'Terminal Mode'}
    </button>
  );
}

export default TerminalModeToggle;
