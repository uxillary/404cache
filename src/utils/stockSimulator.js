export function updateStockPrices(stocks) {
  return stocks.map((stock) => {
    let volatility = 0.1; // default
    let bias = 0;
    switch (stock.type) {
      case 'stable':
        volatility = 0.05; // +/-2.5%
        break;
      case 'risky':
        volatility = 0.4; // +/-20%
        break;
      case 'trending':
        volatility = 0.15; // +/-7.5%
        bias = 0.03; // upward bias
        break;
      case 'rare':
        volatility = 0.6; // +/-30%
        break;
      default:
        break;
    }
    const changePct = bias + (Math.random() - 0.5) * volatility;
    let newPrice = Math.max(1, Math.round(stock.price * (1 + changePct)));

    let event = null;
    if (Math.random() < 0.05) { // 5% chance of spike
      const spikeUp = Math.random() < 0.5;
      const spikePct = spikeUp ? 0.5 : -0.5; // +/-50%
      newPrice = Math.max(1, Math.round(newPrice * (1 + spikePct)));
      event = spikeUp ? 'spike-up' : 'spike-down';
    }

    const hist = stock.history ? [...stock.history, newPrice].slice(-10) : [stock.price, newPrice];
    return { ...stock, prevPrice: stock.price, price: newPrice, event, history: hist };
  });
}
