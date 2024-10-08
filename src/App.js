import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cryptocurrency data
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        setCryptos(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>CryptoInsight</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="crypto-list">
          {filteredCryptos.map(crypto => (
            <div key={crypto.id} className="crypto-item">
              <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
              <span className="crypto-name">{crypto.name}</span>
              <span className="crypto-price">${crypto.current_price.toLocaleString()}</span>
              <span className={`crypto-change ${crypto.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;