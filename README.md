# The Last Caretaker - Build Optimizer

A web-based profession build optimizer for [The Last Caretaker](https://store.steampowered.com/app/2722340/The_Last_Caretaker/). Select a profession and instantly get the optimal combination of Food and Memory items to meet its stat requirements with the minimum total items.

## Features

- **40 Professions** across 10 categories (Engineer, Military, Science, etc.), each with 4 tiers
- **ILP Optimization** — uses integer linear programming to find the minimum items needed
- **Food Optimization** — computes optimal food items for physical stats (Weight, Height, Life Exp., Strength, Intellect)
- **Memory Optimization** — computes optimal memory items for psychological traits (Adaptability, Creativity, Communication, etc.)
- **Crafting Materials** — shows total ingredients needed to craft the recommended food items
- **Item Icons** — all 55 item icons sourced from the [wiki](https://thelastcaretaker.wiki.gg)
- **Instant Results** — all computation runs client-side, no server round-trips

## Tech Stack

- **SvelteKit** + **TypeScript** — static SPA (no server runtime)
- **javascript-lp-solver** — pure JS integer linear programming solver
- **nginx** — static file serving in Docker

## Game Data

| Data | Count |
|------|-------|
| Food Items | 13 |
| Memory Items | 33 |
| Crafting Ingredients | 9 |
| Professions | 40 (10 categories x 4 tiers) |

All data verified against raw wikitext from [thelastcaretaker.wiki.gg](https://thelastcaretaker.wiki.gg).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Docker Deployment

```bash
docker compose up -d --build
```

Serves on port **3080**.

## Project Structure

```
src/
├── app.html                    # HTML shell
├── app.css                     # Global dark sci-fi theme
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── solver.ts               # ILP optimizer (food + memories)
│   ├── data/
│   │   ├── food.ts             # 13 food items with stats + ingredients
│   │   ├── memories.ts         # 33 memory items with trait values
│   │   └── professions.ts      # 40 professions with requirements
│   └── components/
│       ├── ProfessionPicker.svelte   # Category/Profession dropdowns
│       ├── ResultsPanel.svelte       # Optimal build display
│       ├── StatsTable.svelte         # Achieved vs Required comparison
│       ├── FoodBreakdown.svelte      # Food items + crafting materials
│       └── MemoryBreakdown.svelte    # Memory items breakdown
└── routes/
    └── +page.svelte            # Main page
```
