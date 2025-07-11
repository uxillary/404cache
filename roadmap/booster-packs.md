# 🎁 404Cache Booster Packs System

A modular, retro-futuristic loot system for the 404Cache stock simulator. This system introduces fictional booster packs that reward players with stocks, modifiers, cosmetics, and mysterious glitch effects — all wrapped in a nostalgic OS aesthetic.

---

## 💾 Card Structure

Each booster card is a fictional digital artifact with type, rarity, effect, and lore.

### 🔹 Example Card Format
```json
{
  "id": "404-boost-ALGOX-03",
  "name": "ALGOX Booster Stock",
  "type": "Stock",
  "rarity": "Rare",
  "effect": {
    "priceBoost": "x2 for 15 mins",
    "unlockCondition": "Requires Portfolio Level 3"
  },
  "flavor": "From a banned high-frequency trader’s archive dump.",
  "tags": ["volatile", "time-limited", "boost"]
}
```

---

## 🃏 Card Types

- **Stock Cards** – Unlocks new fictional companies with unique volatility.
- **Modifier Cards** – Apply passive income boosts, trade cooldown reductions, or insider tips.
- **Cosmetic Cards** – CRT UI overlays, retro cursors, color themes.
- **Glitch Cards** – Risk-reward chaos: unstable bonuses, wipeouts, or secret minigames.
- **Meta Cards** – Unlock achievements, minitools, or OS-style features.

---

## 🎲 Drop Table Logic (Pseudocode)

### 🎰 Drop Weights
```js
const dropChances = {
  Common: 60,
  Uncommon: 25,
  Rare: 10,
  Glitched: 4,
  Legendary: 1
};
```

### 📦 Basic Drop Functions
```js
function rollDrop() {
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (let rarity in dropChances) {
    cumulative += dropChances[rarity];
    if (roll <= cumulative) return rarity;
  }
}

function getCardFromPool(rarity) {
  const pool = cardData.filter(card => card.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

function openPack(numCards = 3) {
  let rewards = [];
  for (let i = 0; i < numCards; i++) {
    let rarity = rollDrop();
    rewards.push(getCardFromPool(rarity));
  }
  return rewards;
}
```

---

## 📚 Sample Card Pool

```json
[
  {
    "id": "mod-income-001",
    "name": "Passive Income Patch",
    "type": "Modifier",
    "rarity": "Common",
    "effect": { "incomeMultiplier": 1.05 },
    "flavor": "An old registry tweak for DOS miners."
  },
  {
    "id": "stock-synthtech-001",
    "name": "SynthTech IPO",
    "type": "Stock",
    "rarity": "Uncommon",
    "effect": { "initialPrice": 4.2, "dailyVariance": "high" },
    "flavor": "Backed by fictional biotech and zero patents."
  },
  {
    "id": "glitch-swap-001",
    "name": "Swap Memory Leak",
    "type": "Glitch",
    "rarity": "Glitched",
    "effect": {
      "randomEvent": [
        "double passive for 1 hour",
        "all stocks reset to 0",
        "spawn secret minigame"
      ]
    },
    "flavor": "Never meant to be decrypted. Too late now."
  }
]
```

---

## 🗂️ Suggested Site Placement

### 1. Sidebar / Tool Dock
- Icon: floppy disk, pack, or glitch crate  
- Label: `Booster Packs`  
- Tooltip: *"Open retro packs, earn modifiers, glitch stocks, and weird stuff."*

### 2. Main Dashboard Highlight
```
🎁 [New Feature] Cache Booster Packs Available – Try Your Luck!
```

### 3. Developer Lab Area (404Labs or Experimental Zone)
> *“Testing early access booster packs. Expect bugs, glitches, and unexpected nostalgia.”*

### 4. Post-Interaction Pop-up
> 🧪 *“You've unlocked a cache booster pack. Open now?”*

---

## 🔮 Booster Pack UI Ideas

- Terminal-like opening screen:
  ```
  > decrypt cache_packet_042...
  > file unpacked: 3x items recovered.
  ```
- Flickering CRT visuals, data stream noise  
- Color-coded rarities and glitchy overlays  

---

## 🛠️ Development Notes

- Booster pack opening can be mocked first (randomized JSON output).
- Store owned cards in Cloudflare KV for permanence.
- Add mini drop animation using Tailwind + JS.
- Later: player-to-player trading, weekly drops, gacha-styled missions.

---

Want to expand this with a working demo, API endpoint logic, or `.json` pack generator? PRs welcome.
