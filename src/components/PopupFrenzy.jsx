import { useState, useEffect, useCallback, useMemo } from 'react';
import { getItem, setItem } from '../lib/storage';
import HighScoreDisplay from './HighScoreDisplay';

function PopupFrenzy() {
  const [running, setRunning] = useState(false);
  const [popups, setPopups] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [earned, setEarned] = useState(0);
  const [highScore, setHighScore] = useState(() => getItem('popupHighScore') ?? 0);

  const messages = useMemo(
    () => [
      'Buy now!',
      'Free coins!',
      'Click me!',
      'Limited offer!',
      'Claim prize!',
    ],
    []
  );
const styles = useMemo(
    () => [
      { bg: 'bg-pink-600', border: 'border-pink-500', text: 'text-pink-200' },
      { bg: 'bg-yellow-600', border: 'border-yellow-400', text: 'text-yellow-200' },
      { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-200' },
    ],
    []
  );

  const spawnPopup = useCallback(() => {
    const id = Date.now() + Math.random();
    const x = Math.random() * 80;
    const y = Math.random() * 60 + 10;
    const style = styles[Math.floor(Math.random() * styles.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    setPopups((p) => [...p, { id, x, y, style, message }]);
  }, [messages, styles]);



  const stopGame = useCallback(() => {
    setRunning(false);
    const balance = getItem('balance') ?? 0;
    setItem('balance', balance + earned);
    if (earned > highScore) {
      setHighScore(earned);
      setItem('popupHighScore', earned);
    }
  }, [earned, highScore]);

  useEffect(() => {
    let timerId;
    if (running) {
      if (timeLeft > 0) {
        timerId = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      } else {
        stopGame();
      }
    }
    return () => clearTimeout(timerId);
  }, [running, timeLeft, earned, highScore, stopGame]);

  useEffect(() => {
    let spawnId;
    if (running) {
      spawnId = setInterval(spawnPopup, 800);
    }
    return () => clearInterval(spawnId);
  }, [running, spawnPopup]);
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
    <div className="mt-6 relative h-96 border border-green-500 bg-black/80 rounded">
      {!running && (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <button
            onClick={startGame}
            className="neon-button"
          >
            Start Pop-up Frenzy
          </button>
          {earned > 0 && (
            <div className="text-green-300">Game over! You earned {earned}₵</div>
          )}
          <HighScoreDisplay score={highScore} />
        </div>
      )}
      {running && (
        <>
          <button
            onClick={stopGame}
            className="absolute top-2 right-2 bg-red-700 hover:bg-red-900 text-white px-2 py-1 rounded"
          >
            Stop
          </button>
          <div className="p-2 text-green-300">
            Time: {timeLeft}s | Earned: {earned}₵
          </div>
        </>
      )}
      {popups.map((popup) => (
        <div
          key={popup.id}
          className={`absolute w-32 border ${popup.style.border} ${popup.style.text} bg-gray-800 text-xs shadow-lg`}
          style={{ top: `${popup.y}%`, left: `${popup.x}%` }}
        >
          <div className={`flex justify-between items-center ${popup.style.bg} text-black px-1`}>
            <span>Pop-up</span>
            <button
              onClick={() => closePopup(popup.id)}
              className="text-black"
            >
              ✕
            </button>
          </div>
          <div className="p-2">{popup.message}</div>
        </div>
      ))}
    </div>
  );
}

export default PopupFrenzy;
