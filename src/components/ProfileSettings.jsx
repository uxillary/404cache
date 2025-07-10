import { useState, useEffect } from 'react';
import { getItem, setItem } from '../lib/storage';

const AVATARS = ['😎', '👾', '🤖', '🦙', '🐱', '🦆'];

function ProfileSettings() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedName = getItem('profileName');
    const storedAvatar = getItem('profileAvatar');
    if (storedName) setName(storedName);
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  const save = () => {
    setItem('profileName', name.trim() || 'User');
    setItem('profileAvatar', avatar);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mt-6 space-y-3 text-green-300">
      <h3 className="text-xl text-green-400">Profile Settings</h3>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-2 py-1 bg-gray-900 border border-green-600"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Avatar</label>
        <div className="flex space-x-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`text-2xl px-2 py-1 border-2 rounded ${
                avatar === a ? 'border-green-400' : 'border-transparent'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <button onClick={save} className="neon-button">
        Save
      </button>
      {saved && <div className="text-green-400">Saved!</div>}
    </div>
  );
}

export default ProfileSettings;
