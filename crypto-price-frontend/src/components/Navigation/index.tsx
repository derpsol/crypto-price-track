import React from 'react';
import './index.css';

interface NavigationProps {
  currentSymbol: 'bitcoin' | 'ethereum' | 'dogecoin';
  onChange: (symbol: 'bitcoin' | 'ethereum' | 'dogecoin') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSymbol, onChange }) => {
  return (
    <nav>
      {['bitcoin', 'ethereum', 'dogecoin'].map((symbol) => (
        <button
          className='nav-button'
          key={symbol}
          onClick={() => onChange(symbol as 'bitcoin' | 'ethereum' | 'dogecoin')}
          style={{ fontWeight: currentSymbol === symbol ? 'bold' : 'normal' }}
        >
          {symbol.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;