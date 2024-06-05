import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceData {
  latest: number | null;
  average: number | null;
  history: { price: number; timestamp: number }[];
  count: number;
}

const useFetchPrices = (symbol: 'bitcoin' | 'ethereum' | 'dogecoin', minutes: number) => {
  const [data, setData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get<PriceData>(`/price/${symbol}?minutes=${minutes}`);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch prices');
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, [symbol, minutes]);

  return { data, error };
};

export default useFetchPrices;