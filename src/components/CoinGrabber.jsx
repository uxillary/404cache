import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../lib/storage';

function CoinGrabber() {
  const [running, setRunning] = useState(false);
  const [coins, setCoins] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [earned, setEarned] = useState(0);

  const spawnCoin = useCallback(() => {
    const id = Date.now() + Math.random();
    const x = Math.random() * 90;
    const y = Math.random() * 80 + 5;
    setCoins((c) => [...c, { id, x, y }]);
    setTimeout(() => {
      setCoins((c) => c.filter((coin) => coin.id !== id));
    }, 1500);
  }, []);

  const stopGame = useCallback(() => {
    setRunning(false);
    const balance = getItem('balance') ?? 0;
    setItem('balance', balance + earned);
  }, [earned]);

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
  }, [running, timeLeft, earned, stopGame]);

  useEffect(() => {
    let spawnId;
    if (running) {
      spawnId = setInterval(spawnCoin, 700);
    }
    return () => clearInterval(spawnId);
  }, [running, spawnCoin]);

  const collectCoin = (id) => {
    setCoins((c) => c.filter((coin) => coin.id !== id));
    setEarned((e) => e + 5);
  };

  const startGame = () => {
    setEarned(0);
    setTimeLeft(20);
    setCoins([]);
    setRunning(true);
  };

  return (
    <div className="mt-6 relative h-96 border border-green-500 bg-black/80 rounded">
      {!running && (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <button
            onClick={startGame}
            className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded"
          >
            Start Coin Grabber
          </button>
          {earned > 0 && (
            <div className="text-green-300">Game over! You earned {earned}₵</div>
          )}
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
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-yellow-300 text-2xl cursor-pointer select-none"
          style={{ top: `${coin.y}%`, left: `${coin.x}%` }}
          onClick={() => collectCoin(coin.id)}
        >
          🪙
        </div>
      ))}
    </div>
  );
}

export default CoinGrabber;
