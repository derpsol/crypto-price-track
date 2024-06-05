import axios from 'axios';

interface PriceEntry {
  price: number;
  timestamp: number;
}

interface PriceHistory {
  latest: number | null;
  average: number | null;
  history: PriceEntry[];
  count: number;
}

const prices: Record<'bitcoin' | 'ethereum' | 'dogecoin', PriceEntry[]> = {
  bitcoin: [],
  ethereum: [],
  dogecoin: [],
};

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const COINS = ['bitcoin', 'ethereum', 'dogecoin'] as const;

async function fetchPrices(): Promise<void> {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'eur',
      },
    });

    const data = response.data;
    const timestamp = Date.now();

    COINS.forEach(coin => {
      if (data[coin]) {
        prices[coin].push({ price: data[coin].eur, timestamp });
        // Keep only last 60 minutes of data
        prices[coin] = prices[coin].filter(entry => timestamp - entry.timestamp <= 60 * 60 * 1000);
      }
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

// Fetch prices every 60 seconds
setInterval(fetchPrices, 60 * 1000);

// Initial fetch
fetchPrices();

function getPriceHistory(coin: 'bitcoin' | 'ethereum' | 'dogecoin', minutes: number = 60): PriceHistory {
  const now = Date.now();
  const cutoff = now - minutes * 60 * 1000;
  const history = prices[coin].filter(entry => entry.timestamp >= cutoff);
  const latest = history.length ? history[history.length - 1].price : null;
  const average = history.length ? history.reduce((acc, entry) => acc + entry.price, 0) / history.length : null;

  return {
    latest,
    average,
    history,
    count: history.length,
  };
}

export { getPriceHistory };