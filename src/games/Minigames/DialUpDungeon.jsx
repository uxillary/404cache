import { useState } from 'react';

const events = [
  'The modem screeches in the darkness.',
  'A 404 goblin blocks your path.',
  'You stumble upon a lost file fragment.',
  'Connection drops... retrying...',
];

function DialUpDungeon() {
  const [log, setLog] = useState(['> Dialing into the void...']);

  const next = () => {
    const event = events[Math.floor(Math.random() * events.length)];
    setLog((l) => [...l, event]);
  };

  const reset = () => {
    setLog(['> Dialing into the void...']);
  };

  return (
    <div className="text-green-300 space-y-2">
      <div className="bg-black h-40 overflow-y-auto border border-green-600 p-2 text-sm">
        {log.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={next} className="neon-button">Next</button>
        <button onClick={reset} className="neon-button">Reset</button>
      </div>
    </div>
  );
}

export default DialUpDungeon;
