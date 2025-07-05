# Project Overview: Stock Market Ecosystem Game (MVP 1)

Welcome to the development plan for the **Stock Market Ecosystem Game**.  
This project combines a simulated stock trading system with game mechanics like upgrades, rewards, and a currency-driven ecosystem.

---

## 🎯 Core Concept

- **Pseudo Stock Market:** Players buy, sell, and manage fictional stocks that fluctuate based on in-game algorithms.
- **Currency System:** Players earn, spend, and grow currency through gameplay, stock trading, upgrades, and passive income.
- **Ecosystem:** Supports stock limits, incentives, ad-based rewards (optional), and an upgrade path.

---

## 📑 Documentation Structure

- **[Part 1: Overview (You are here)](./PART1_OVERVIEW.md)**
- **[Part 2: MVP Build Plan](./PART2_MVP_PLAN.md)**
- **[Part 3: Feature Expansion & Microtransactions](./PART3_FEATURES.md)**

---

## 🧩 System Components

- Stock Market Engine
- Buy/Sell Mechanics
- Currency Generation
- Upgrade System
- Bonus & Incentive System
- Ad Rewards (Optional)

---

## 🗂 Data Structure Example

```json
{
  "stocks": [
    {
      "id": "stock_apple",
      "name": "Apple",
      "price": 120,
      "trend": "up"
    },
    {
      "id": "stock_gizmo",
      "name": "Gizmo Corp",
      "price": 45,
      "trend": "down"
    }
  ],
  "user": {
    "currency": 1000,
    "portfolio": {
      "stock_apple": 10,
      "stock_gizmo": 5
    }
  }
}
