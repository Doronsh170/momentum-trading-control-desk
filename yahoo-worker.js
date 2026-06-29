export default {
  async fetch(request) {
    const url = new URL(request.url);
    const symbols = url.searchParams.get('symbols') || 'QQQ,SOXX,SMH,CIBR,IGV';
    const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    try {
      const response = await fetch(yahooUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        }
      });
      const body = await response.text();
      return new Response(body, {
        status: response.status,
        headers: {
          ...corsHeaders(),
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { ...corsHeaders(), 'content-type': 'application/json; charset=utf-8' }
      });
    }
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
