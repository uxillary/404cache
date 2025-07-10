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
