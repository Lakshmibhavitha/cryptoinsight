import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCryptoDetail } from '../services/cryptoService';

function CryptoDetail() {
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function loadCryptoDetail() {
      try {
        const data = await fetchCryptoDetail(id);
        setCrypto(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cryptocurrency details');
        setLoading(false);
      }
    }

    loadCryptoDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!crypto) return null;

  return (
    <div className="crypto-detail">
      <Link to="/" className="back-button">Back to List</Link>
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <img src={crypto.image.small} alt={crypto.name} />
      <p>Current Price: ${crypto.market_data.current_price.usd.toLocaleString()}</p>
      <p>Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
      <p>24h Change: {crypto.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Total Volume: ${crypto.market_data.total_volume.usd.toLocaleString()}</p>
      <p>Circulating Supply: {crypto.market_data.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}</p>
      <h3>Description:</h3>
      <p dangerouslySetInnerHTML={{ __html: crypto.description.en }}></p>
    </div>
  );
}

export default CryptoDetail;