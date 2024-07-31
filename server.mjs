import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;
const API_KEY = '';

app.use(cors()); // Call cors as a function
app.use(bodyParser.json({
  limit: '0.5mb'
}));

app.use(bodyParser.urlencoded({
  limit: '0.5mb',
  parameterLimit: 100000,
  extended: true 
}));

app.post('/api/messages', async (req, res) => {
  const url = 'https://api.anthropic.com/v1/messages';
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).send(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
