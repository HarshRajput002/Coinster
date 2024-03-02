// Backend (Express.js)

const express = require('express');
const axios = require('axios');
const path=require('path');
const dir=path.join(__dirname,'frontend');
const app = express();
const PORT = 3000;
app.use('/',express.static(path.join(__dirname, 'Coinster')));
app.get('/bitchart',(req,res)=>{
    res.sendFile(path.join(__dirname, 'Coinster', 'Bitcoin.html'));
})

app.get('/Bitcoin', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=365&interval=daily', {

    });
    const bitcoinData = response.data;  

    res.json(bitcoinData);
  } catch (error) {
    console.error('Error fetching Bitcoin trading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/litecoin', async (req, res) => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=inr&days=365&interval=daily      ', {
      });
       const data = response.data;
       res.json(data);
      } catch (err) {
          console.error('Error fetching cryptocurrency data:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });


app.get('/dogecoin', async (req, res) => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=inr&days=365&interval=daily', {
      });
       const data = response.data;
       res.json(data);
      } catch (err) {
          console.error('Error fetching cryptocurrency data:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });


app.get('/etherum', async (req, res) => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=inr&days=365&interval=daily ', {
      });
       const data = response.data;
       res.json(data);
      } catch (err) {
          console.error('Error fetching cryptocurrency data:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});