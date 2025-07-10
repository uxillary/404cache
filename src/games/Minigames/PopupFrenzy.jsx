import { useState, useEffect, useRef, useCallback } from 'react'
import { getItem, setItem } from '../../lib/storage'

const msgs = [
  'Download RAM?',
  'Win a free Honda Type R',
  'Enable Clippy AI',
  'Not a scam',
  'Claim prize',
]
const powers = ['close', 'double', 'time']

function sound() {
  /* placeholder sound */
}

function PopupFrenzy() {
  const [running, setRunning] = useState(false)
  const [popups, setPopups] = useState([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState(() => Number(localStorage.getItem('popup_high')) || 0)
  const [combo, setCombo] = useState(0)
  const [mult, setMult] = useState(1)
  const [earned, setEarned] = useState(0)

  const comboRef = useRef({})
  const multRef = useRef()

  const spawn = useCallback(() => {
    let type = 'standard'
    const r = Math.random()
    if (r > 0.85) type = 'power'
    else if (r > 0.65) type = 'fake'
    const popup = {
      id: Date.now() + Math.random(),
      type,
      x: 0,
      y: 0,
      power: type === 'power' ? powers[Math.floor(Math.random() * powers.length)] : null,
      text: msgs[Math.floor(Math.random() * msgs.length)],
    }
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 80
      const y = Math.random() * 60
      if (popups.every(p => Math.abs(p.x - x) > 10 || Math.abs(p.y - y) > 10)) {
        popup.x = x
        popup.y = y
        break
      }
    }
    if (popup.x === 0 && popup.y === 0) {
      popup.x = Math.random() * 80
      popup.y = Math.random() * 60
    }
    setPopups(p => [...p, popup])
  }, [popups])

  const endGame = useCallback(() => {
    setRunning(false)
    setPopups([])
    setCombo(0)
    setMult(1)
    if (score > 0) {
      const bal = getItem('balance') ?? 0
      const newBal = bal + score
      setItem('balance', newBal)
      setEarned(score)
    }
    if (score > high) {
      setHigh(score)
      localStorage.setItem('popup_high', score)
    }
  }, [score, high])

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) return endGame()
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [running, timeLeft, endGame])

  useEffect(() => {
    if (!running) return
    const elapsed = 30 - timeLeft
    const interval = Math.max(300, 1000 - Math.floor(elapsed / 5) * 150)
    const id = setTimeout(spawn, interval)
    return () => clearTimeout(id)
  }, [running, timeLeft, popups, spawn])


  const resetCombo = () => {
    setCombo(0)
    comboRef.current = {}
  }

  const triggerCombo = () => {
    const now = Date.now()
    if (comboRef.current.last && now - comboRef.current.last < 800) setCombo(c => Math.min(c + 1, 5))
    else setCombo(1)
    comboRef.current.last = now
    clearTimeout(comboRef.current.to)
    comboRef.current.to = setTimeout(() => setCombo(0), 1500)
  }

  const startMult = () => {
    setMult(2)
    clearTimeout(multRef.current)
    multRef.current = setTimeout(() => setMult(1), 10000)
  }

  const closePopup = p => {
    setPopups(ps => ps.filter(x => x.id !== p.id))
    if (p.type === 'fake') {
      setScore(s => s - 5)
      resetCombo()
      return
    }
    triggerCombo()
    sound()
    setScore(s => s + 10 * mult * (combo || 1))
    if (p.type === 'power') {
      if (p.power === 'close') {
        setScore(s => s + popups.length * 10 * mult * (combo || 1))
        setPopups([])
      }
      if (p.power === 'double') startMult()
      if (p.power === 'time') setTimeLeft(t => t + 3)
    }
  }

  const startGame = () => {
    setRunning(true)
    setTimeLeft(30)
    setScore(0)
    setPopups([])
    setCombo(0)
    setMult(1)
    setEarned(0)
  }

  return (
    <div className="relative h-64 border border-green-500 bg-black/80 rounded text-green-300 overflow-hidden">
      {!running ? (
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <button onClick={startGame} className="neon-button">Start Pop-up Frenzy</button>
          <div>High Score: {high}</div>
          {score > 0 && (
            <div>
              Last Score: {score}
              {earned > 0 && <span> (+{earned}₵)</span>}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="p-1 text-sm flex justify-between">
            <span>Time: {timeLeft}s</span>
            <span>Score: {score}</span>
            {mult > 1 && <span className="text-green-400">x2</span>}
            {combo > 1 && <span className="animate-flash">Combo x{combo}!</span>}
          </div>
          {popups.map(pop => (
            <div
              key={pop.id}
              onClick={() => closePopup(pop)}
              className={`absolute w-28 bg-gray-800 text-xs cursor-pointer border ${
                pop.type === 'power' ? 'border-green-500' : pop.type === 'fake' ? 'border-yellow-500' : 'border-pink-500'
              }`}
              style={{ top: `${pop.y}%`, left: `${pop.x}%` }}
            >
              <div className={`${pop.type === 'power' ? 'bg-green-600' : 'bg-pink-600'} text-black flex justify-between px-1`}>
                <span>{pop.type === 'fake' ? 'Ad?' : 'Ad'}</span>
                <span>✕</span>
              </div>
              <div className="p-1">
                {pop.type === 'power'
                  ? pop.power === 'close'
                    ? 'Close All'
                    : pop.power === 'double'
                      ? 'x2 Score'
                      : 'Bonus Time'
                  : pop.text}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default PopupFrenzy
