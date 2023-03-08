const axios = require('axios');

async function getStockInfo(symbol, date, apiKey) {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`);

    const timestamp = new Date(date).toISOString().split('T')[0];
    const data = response.data['Time Series (Daily)'][timestamp];
    const price = parseFloat(data['4. close']);

    return {
      symbol,
      name: response.data['Meta Data']['2. Symbol'],
      price,
      time: new Date(timestamp),
    };
  } catch (error) {
    console.error(error);
  }
}

(async function() {
  const stockInfo = await getStockInfo('AAPL', '2022-03-01', 'G3VSVULCES0GUSHJ');
  console.log(stockInfo);
})();
