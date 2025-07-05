# Feature Expansion & Microtransactions Roadmap

This document outlines the planned future features and microtransaction-ready systems for the Stock Market Ecosystem Game.

---

## 🌱 Planned Features After MVP 1

### 📈 Advanced Stock Algorithms
- Implement stock categories:
  - **Stable stocks:** Small, predictable fluctuations.
  - **Risky stocks:** Large, unpredictable price swings.
  - **Trending stocks:** Stocks that follow growth or crash patterns.
- Introduce random events that can temporarily spike or crash specific stocks.

---

### 📊 Stock Limits & Scarcity
- Set stock availability limits (per player or globally).
- Dynamic scarcity to influence player decisions and stock price movements.

---

### 💰 Expanded Upgrade System
- Portfolio bonuses (earn more by diversifying stock holdings).
- Unlock rare stock markets or premium items through upgrades.
- Add upgrades that affect stock volatility, passive income rate, or buy/sell efficiency.

---

### 🎲 Gacha or Mystery Box System
- Introduce random loot boxes purchasable with in-game currency.
- Possible rewards:
  - Rare upgrades
  - Stock market boosts
  - Temporary price manipulation items

---

### 🎬 Ad Rewards System
- Optional: Watch ads to receive:
  - Currency boosts
  - Temporary passive income multipliers
  - Mystery boxes

---

## 💸 Microtransaction-Ready Framework

- Design in-game currency to support potential real-money purchases in the future.
- All core features should remain fully playable without spending money.
- Keep the option to:
  - Sell currency packs
  - Offer premium-only upgrades or markets
  - Integrate ad-based revenue for free-to-play users

---

## 🔒 Security Considerations

- MVP will use client-side storage and simple JSON manipulation.
- When adding microtransactions, migrate all critical functions server-side:
  - Validate transactions
  - Protect against local file tampering
- Introduce account system for saving user progress server-side if scaling up.

---

## ⚡ Additional Feature Ideas

- Limited-time stock events
- Leaderboards (local or global)
- Daily login bonuses
- Community-driven events
- Steam achievements, trading cards, and potential badge support
- Future blockchain integration (optional and carefully considered)

---

## ✅ Quick Summary

- The core system is intentionally **modular** to allow these features to be layered on top of the MVP.
- Microtransactions are optional but should be easy to integrate with the planned currency system.
- Codex and contributors can revisit this file to prioritize future sprints.

---
