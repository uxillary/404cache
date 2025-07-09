# 404Cache Stock Market Demo

This project uses Vite and React to showcase the early MVP for the 404Cache stock market game. Prices update automatically and you can buy or sell a collection of six playful stocks to watch your balance change. A running total of your portfolio value is displayed under your balance, along with a new net worth readout that sums balance and portfolio value. A passive income system pays out every few seconds, and an upgrade shop lets you spend currency to increase that rate.

## Data Persistence

Your balance, owned stock amounts, passive income rate, and purchased upgrades are stored in **localStorage** using a `404cache_` prefix, so your progress sticks around between browser sessions.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Sound Effects

Add three WAV files under `public/sounds/` named `buy.wav`, `sell.wav`, and `upgrade.wav` to hear cues when you trade or purchase upgrades. The game works without them if you prefer silence.
