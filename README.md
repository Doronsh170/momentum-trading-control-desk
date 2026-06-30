# Doron Momentum Chat Ready Desk

A clean, static HTML trading workflow for momentum day trading.

The tool is designed around a ChatGPT scan answer. The prompts force a short Hebrew answer in a fixed copy-ready structure. The user can paste that answer into the desk, parse it into three groups, update the Yahoo Finance symbols list, run a market gate and build a trade plan.

## Files

- `index.html` main desktop page
- `mobile.html` same version for now
- `README.md`
- `yahoo-worker.js` Cloudflare Worker code

## Built-in Yahoo Bridge

The site uses the existing Cloudflare Worker URL:

`https://momentum-yahoo-bridge.sh6doron.workers.dev`

No API key is stored in the site.

## Suggested repo name

`momentum-chat-ready-desk`

## Suggested repo description

Clean Hebrew momentum trading desk built around ChatGPT scan answers, structured prompts, candidate parsing, Yahoo Finance bridge, market gate, risk calculator and journal.
