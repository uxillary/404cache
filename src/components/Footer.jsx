function Footer({ onReset }) {
  return (
    <footer className="mt-8 text-center text-green-500 text-sm bg-black/60 backdrop-blur-sm p-4 rounded">
      © 2025 404Cache. All trades are fictional.
      {onReset && (
        <div className="mt-2">
          <button
            onClick={onReset}
            className="bg-red-700 hover:bg-red-900 text-white px-3 py-1 rounded"
          >
            Reset Game
          </button>
        </div>
      )}
    </footer>
  );
}

export default Footer;
