import React from 'react';
import './index.css';

interface PriceDisplayProps {
  latest: number | null;
  average: number | null;
  history: { price: number; timestamp: number }[];
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ latest, average, history }) => {
  return (
    <div>
      <div className='price-container1'>
        <h2 className='latest-price'>Latest Price: {latest !== null ? `€${latest.toFixed(2)}` : 'Loading...'}</h2>
        <h2>Average Price: {average !== null ? `€${average.toFixed(2)}` : 'Loading...'}</h2>
      </div>
      <h2>Price History</h2>
      <table>
        <tr>
          <th>Time</th>
          <th>Price (€)</th>
        </tr>
        {history.map((entry) => (
          <tr key={entry.timestamp}>
            <td>{new Date(entry.timestamp).toLocaleTimeString() + " " + new Date(entry.timestamp).toLocaleDateString()}</td>
            <td>{entry.price.toFixed(2)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default PriceDisplay;