function LoginStreakDisplay({ streak }) {
  return (
    <div className="mb-4 text-yellow-400">
      Login Streak: <span className="font-bold">{streak}</span> day{streak !== 1 ? 's' : ''}
    </div>
  );
}

export default LoginStreakDisplay;
