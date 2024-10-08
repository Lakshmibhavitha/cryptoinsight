import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopCryptos } from '../services/cryptoService';

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCryptos() {
      try {
        const data = await fetchTopCryptos(10);
        setCryptos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cryptocurrencies');
        setLoading(false);
      }
    }

    loadCryptos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="crypto-list">
      <h2>Top Cryptocurrencies</h2>
      <ul>
        {cryptos.map(crypto => (
          <li key={crypto.id} className="crypto-list-item">
            <Link to={`/crypto/${crypto.id}`}>
              <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
              <span className="crypto-name">{crypto.name}</span>
              <span className="crypto-price">${crypto.current_price.toLocaleString()}</span>
              <span className="crypto-change" style={{ color: crypto.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoList;