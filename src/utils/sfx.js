import { getItem } from '../lib/storage';

export function playSound(name) {
  const enabled = getItem('sound');
  if (enabled === false) return;
  try {
    const audio = new Audio(`/sounds/${name}.wav`);
    audio.volume = 0.5;
    audio.play();
  } catch {
    // ignore errors
  }
}
