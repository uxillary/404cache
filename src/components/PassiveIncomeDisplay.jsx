function PassiveIncomeDisplay({ rate, earned }) {
  return (
    <div className="mb-4 text-purple-400">
      Passive Income: <span className="font-bold">{rate}₵</span> every 10 sec | Total Earned: <span className="font-bold">{earned}₵</span>
    </div>
  );
}

export default PassiveIncomeDisplay;
