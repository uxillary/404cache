import { useState, useEffect } from 'react';
import { getItem, setItem } from '../../lib/storage';

function PopupFrenzy() {
  const [running, setRunning] = useState(false);
  const [popups, setPopups] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => getItem('popupHighScore') || 0);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [running, timeLeft]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const popup = {
        id: Date.now() + Math.random(),
        x: Math.random() * 70 + 10,
        y: Math.random() * 60 + 10,
      };
      setPopups((p) => [...p, popup]);
    }, 800);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running && score > 0) {
      setHighScore((hs) => {
        if (score > hs) {
          setItem('popupHighScore', score);
          return score;
        }
        return hs;
      });
    }
  }, [running, score]);

  const closePopup = (id) => {
    setPopups((p) => p.filter((pop) => pop.id !== id));
    setScore((s) => s + 1);
  };

  const startGame = () => {
    setRunning(true);
    setTimeLeft(20);
    setScore(0);
    setPopups([]);
  };

  return (
    <div className="relative h-64 border border-green-500 bg-black/80 rounded text-green-300 overflow-hidden">
      {!running ? (
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <button onClick={startGame} className="neon-button">Start Pop-up Frenzy</button>
          {score > 0 && <div>Score: {score}</div>}
          {highScore > 0 && <div className="text-yellow-300">Best: {highScore}</div>}
        </div>
      ) : (
        <>
          <div className="p-2">Time: {timeLeft}s Score: {score}</div>
          {popups.map((pop) => (
            <div
              key={pop.id}
              onClick={() => closePopup(pop.id)}
              className="absolute w-24 bg-gray-800 border border-pink-500 text-pink-200 text-xs cursor-pointer"
              style={{ top: `${pop.y}%`, left: `${pop.x}%` }}
            >
              <div className="bg-pink-600 text-black flex justify-between px-1">
                <span>Ad</span>
                <span>✕</span>
              </div>
              <div className="p-1">Buy now!</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PopupFrenzy;
