# Momentum Trading Control Desk

A free, static HTML control desk for active momentum trading preparation and execution.

The tool is designed for traders who want a structured workflow before and during the US trading session: market context, watchlist focus, premarket scan prompts, trade planning, position sizing, risk control, live trade management, and a trading journal.

## Live site structure

- `index.html`, desktop version
- `mobile.html`, mobile version

## Main features

- Morning candidate scan prompt, 10:00 Israel time
- Early premarket update prompt, around 11:15 Israel time
- Final premarket scan prompt, around 15:45 Israel time
- Momentum watchlist workflow
- Market condition checklist
- Trade plan builder
- Position size calculator
- Stop and target planning
- Live position control
- Trade journal with CSV export
- Local browser storage, no paid API, no server, no external dependency

## Intended workflow

1. Open the desk in the morning and copy the 10:00 prompt.
2. Use the output to build a candidate list, not a final trade list.
3. Recheck the list during early premarket.
4. Run the final scan before the US market opens.
5. Trade only after market confirmation, preferably after VWAP and opening range behavior are clear.
6. Log each trade and review execution quality.

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload `index.html`, `mobile.html`, `.nojekyll`, and this `README.md`.
3. Go to Settings, Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select the `main` branch and root folder.
6. Save.
7. After GitHub publishes the site, open the Pages URL.

## Repository name suggestion

`momentum-trading-control-desk`

## Repository description suggestion

`Free static HTML trading control desk for momentum day trading, with AI scan prompts, watchlist workflow, risk calculator, trade plan builder, and trade journal.`

## Disclaimer

This tool is for personal workflow, education, and trade organization only. It does not provide investment advice, portfolio management, or a recommendation to buy or sell securities. Trading volatile momentum stocks involves substantial risk, including rapid losses.
