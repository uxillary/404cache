import { useState, useEffect } from 'react'
import WindowFrame from '../../components/WindowFrame'
import { getItem, setItem } from '../../lib/storage'

function Fragments() {
  const [fragments, _setFragments] = useState(() => getItem('memoryFragments') || {})

  useEffect(() => {
    setItem('memoryFragments', fragments)
  }, [fragments])

  const items = Object.entries(fragments)

  return (
    <WindowFrame title="Memory Fragments">
      {items.length === 0 ? (
        <p className="text-center text-sm text-green-300">No fragments collected yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {items.map(([id, frag]) => (
            <div
              key={id}
              className="neon-card p-2 flex flex-col items-center"
              title={`${frag.name} — unlocked ${frag.date}`}
            >
              <div className="text-3xl mb-2">{frag.icon || '📁'}</div>
              <div className="text-xs text-center">{frag.name}</div>
            </div>
          ))}
        </div>
      )}
    </WindowFrame>
  )
}

export default Fragments
