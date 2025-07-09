import { useState, useEffect } from 'react';
import { getItem, setItem } from '../lib/storage';

function PopupFrenzy() {
  const [running, setRunning] = useState(false);
  const [popups, setPopups] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [earned, setEarned] = useState(0);

  useEffect(() => {
    let timerId;
    if (running) {
      if (timeLeft > 0) {
        timerId = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      } else {
        setRunning(false);
        const balance = getItem('balance') ?? 0;
        setItem('balance', balance + earned);
      }
    }
    return () => clearTimeout(timerId);
  }, [running, timeLeft, earned]);

  useEffect(() => {
    let spawnId;
    if (running) {
      spawnId = setInterval(spawnPopup, 800);
    }
    return () => clearInterval(spawnId);
  }, [running]);

  const spawnPopup = () => {
    const id = Date.now() + Math.random();
    const x = Math.random() * 80;
    const y = Math.random() * 60 + 10;
    setPopups((p) => [...p, { id, x, y }]);
  };

  const closePopup = (id) => {
    setPopups((p) => p.filter((pop) => pop.id !== id));
    setEarned((e) => e + 10);
  };

  const startGame = () => {
    setEarned(0);
    setTimeLeft(20);
    setPopups([]);
    setRunning(true);
  };


  return (
    <div className="mt-6 relative h-96 border border-green-500 bg-black/60 rounded">
      {!running && (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <button
            onClick={startGame}
            className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded"
          >
            Start Pop-up Frenzy
          </button>
          {earned > 0 && (
            <div className="text-green-300">You earned {earned}₵!</div>
          )}
        </div>
      )}
      {running && (
        <div className="p-2 text-green-300">
          Time: {timeLeft}s | Earned: {earned}₵
        </div>
      )}
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="absolute w-32 bg-gray-800 border border-pink-500 text-pink-200 text-xs shadow-lg"
          style={{ top: `${popup.y}%`, left: `${popup.x}%` }}
        >
          <div className="flex justify-between items-center bg-pink-600 text-black px-1">
            <span>Pop-up</span>
            <button
              onClick={() => closePopup(popup.id)}
              className="text-black"
            >
              ✕
            </button>
          </div>
          <div className="p-2">Close me!</div>
        </div>
      ))}
    </div>
  );
}

export default PopupFrenzy;
