import React, { useState, useEffect } from 'react';
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
    <div>
      <h2>Top Cryptocurrencies</h2>
      <ul>
        {cryptos.map(crypto => (
          <li key={crypto.id}>
            {crypto.name} (${crypto.current_price})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoList;