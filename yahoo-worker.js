export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const rawSymbols = url.searchParams.get('symbols') || 'QQQ,SOXX,SMH,CIBR,IGV';
    const symbols = rawSymbols
      .split(',')
      .map(s => s.trim().toUpperCase())
      .filter(Boolean)
      .slice(0, 25);

    try {
      const results = await Promise.all(symbols.map(fetchYahooChartQuote));
      const clean = results.filter(Boolean);

      return jsonResponse({
        quoteResponse: {
          result: clean,
          error: null
        }
      }, 200);
    } catch (error) {
      return jsonResponse({
        quoteResponse: {
          result: [],
          error: String(error && error.message ? error.message : error)
        }
      }, 500);
    }
  }
};

async function fetchYahooChartQuote(symbol) {
  const encoded = encodeURIComponent(symbol);
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encoded}?range=1d&interval=1m&includePrePost=true`;

  const response = await fetch(yahooUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    return {
      symbol,
      regularMarketPrice: null,
      regularMarketChangePercent: null,
      regularMarketVolume: null,
      marketState: `HTTP ${response.status}`
    };
  }

  const data = await response.json();
  const result = data.chart && data.chart.result && data.chart.result[0];

  if (!result || !result.meta) {
    return {
      symbol,
      regularMarketPrice: null,
      regularMarketChangePercent: null,
      regularMarketVolume: null,
      marketState: 'No data'
    };
  }

  const meta = result.meta;
  const quote = result.indicators && result.indicators.quote && result.indicators.quote[0];

  const price = Number.isFinite(meta.regularMarketPrice) ? meta.regularMarketPrice : lastNumber(result.indicators && result.indicators.quote && result.indicators.quote[0] && result.indicators.quote[0].close);
  const prev = Number.isFinite(meta.chartPreviousClose) ? meta.chartPreviousClose : meta.previousClose;
  const changePercent = Number.isFinite(price) && Number.isFinite(prev) && prev !== 0
    ? ((price - prev) / prev) * 100
    : null;

  const volume = Number.isFinite(meta.regularMarketVolume)
    ? meta.regularMarketVolume
    : lastNumber(quote && quote.volume);

  return {
    symbol: meta.symbol || symbol,
    shortName: meta.shortName || meta.longName || '',
    regularMarketPrice: Number.isFinite(price) ? price : null,
    regularMarketChangePercent: Number.isFinite(changePercent) ? changePercent : null,
    regularMarketVolume: Number.isFinite(volume) ? volume : null,
    marketState: meta.marketState || inferMarketState(meta),
    exchangeName: meta.exchangeName || '',
    currency: meta.currency || '',
    source: 'Yahoo chart endpoint'
  };
}

function lastNumber(arr) {
  if (!Array.isArray(arr)) return null;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (Number.isFinite(arr[i])) return arr[i];
  }
  return null;
}

function inferMarketState(meta) {
  if (!meta || !meta.currentTradingPeriod) return '';
  return 'CHART';
}

function jsonResponse(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders(),
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
