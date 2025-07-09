function Footer({ onReset, soundEnabled, onToggleSound }) {
  return (
    <footer className="mt-8 text-center text-green-500 text-sm">
      © 2025 404Cache. All trades are fictional.
      <div className="mt-2 flex justify-center gap-4">
        {onReset && (
          <button
            onClick={onReset}
            className="bg-red-700 hover:bg-red-900 text-white px-3 py-1 rounded"
          >
            Reset Game
          </button>
        )}
        {onToggleSound && (
          <button
            onClick={onToggleSound}
            className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded"
          >
            {soundEnabled ? 'Mute' : 'Unmute'}
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
