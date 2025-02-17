// Proxy Server to bypass CORS problems
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '12f995bccc09400094f626a935b2e2f0';
const BASE_URL = 'https://api.football-data.org/v4';

app.get('/api/teams/:teamId/matches', async (req, res) => {
  try {
    const { teamId } = req.params;
    const response = await axios.get(`${BASE_URL}/teams/${teamId}/matches`, {
      params: { status: 'SCHEDULED' },
      headers: { 'X-Auth-Token': API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(5000, () => console.log('Proxy server running on port 5000'));
