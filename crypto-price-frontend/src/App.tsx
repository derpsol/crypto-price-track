import React, { useState } from 'react';
import useFetchPrices from './hooks/useFetchPrices';
import Navigation from './components/Navigation';
import PriceDisplay from './components/PriceDisplay';
import './App.css';

const App: React.FC = () => {
  const [symbol, setSymbol] = useState<'bitcoin' | 'ethereum' | 'dogecoin'>('bitcoin');
  const { data, error } = useFetchPrices(symbol, 60);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>Crypto Price Tracker</h1>
      <Navigation currentSymbol={symbol} onChange={setSymbol} />
      {data ? (
        <PriceDisplay latest={data.latest} average={data.average} history={data.history} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;