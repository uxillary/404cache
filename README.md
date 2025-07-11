# 404Cache Stock Market Demo

This project uses Vite and React to showcase the early MVP for the 404Cache stock market game. Prices update automatically and you can buy or sell a collection of **six** playful stocks to watch your balance change. Each stock sports its own emoji for quick recognition. A running total of your portfolio value is displayed under your balance, along with a net worth readout that sums balance and portfolio value. A passive income system pays out every few seconds, and an upgrade shop lets you spend currency to increase that rate or expand your personal stock limits.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Launch the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

3. To create a production build run:

   ```bash
   npm run build
   ```

   The optimized files are output to the `dist` directory.

## Data Persistence

Your balance, owned stock amounts, passive income rate, and purchased upgrades are stored in **localStorage** using a `404cache_` prefix, so your progress sticks around between browser sessions.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Minigames

Visit the `/minigames` page to play **Pop-up Frenzy**. Close as many pop-up windows as possible in 20 seconds to earn extra coins that are automatically added to your balance.
Your best score is now saved locally and shown below the start button.


## Stock Search

The Market window now includes a search bar to quickly filter stocks by name.
When text is entered, a **Clear** button appears to reset the filter in one click.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
