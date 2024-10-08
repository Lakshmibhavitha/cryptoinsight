const API_URL = 'https://api.coingecko.com/api/v3';

export async function fetchTopCryptos(count = 10) {
  try {
    const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem fetching the cryptocurrency data:", error);
    throw error;
  }
}

export async function fetchCryptoDetail(id) {
  try {
    const response = await fetch(`${API_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem fetching the cryptocurrency details:", error);
    throw error;
  }
}