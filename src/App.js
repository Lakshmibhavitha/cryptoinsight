import React from 'react';
import './App.css';

function App() {
  // This is just example data. You'll replace this with real data from an API later.
  const cryptos = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 50000, change: 2.5 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3000, change: -1.2 },
    { id: 3, name: 'Cardano', symbol: 'ADA', price: 2, change: 5.7 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>CryptoInsight</h1>
      </header>
      <main className="crypto-list">
        <h2>Top Cryptocurrencies</h2>
        {cryptos.map(crypto => (
          <div key={crypto.id} className="crypto-item">
            <img 
              src={`https://cryptoicons.org/api/icon/${crypto.symbol.toLowerCase()}/30`} 
              alt={crypto.name} 
              className="crypto-icon"
            />
            <span className="crypto-name">{crypto.name}</span>
            <span className="crypto-price">${crypto.price.toLocaleString()}</span>
            <span className={`crypto-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
              {crypto.change > 0 ? '+' : ''}{crypto.change}%
            </span>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;