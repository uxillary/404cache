import { useState } from 'react';

function CommandSidebar({ onCommand, onClose }) {
  const [cmd, setCmd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommand(cmd);
    setCmd('');
  };

  return (
    <div className="fixed inset-y-0 right-0 w-60 bg-black/80 backdrop-blur-sm border-l border-green-700 p-4 z-30">
      <div className="flex justify-between mb-2 text-green-400">
        <span>Commands</span>
        <button onClick={onClose} className="text-red-400">X</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          className="w-full mb-2 px-2 py-1 bg-gray-900 text-green-300 border border-green-700"
          placeholder="BUY STK 10"
        />
      </form>
    </div>
  );
}

export default CommandSidebar;
