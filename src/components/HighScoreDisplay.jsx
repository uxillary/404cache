function HighScoreDisplay({ score }) {
  if (score <= 0) return null;
  return (
    <div className="text-yellow-300">High Score: <span className="font-bold">{score}₵</span></div>
  );
}

export default HighScoreDisplay;
