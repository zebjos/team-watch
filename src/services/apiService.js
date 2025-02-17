import axios from 'axios';

// API key
const API_KEY = '12f995bccc09400094f626a935b2e2f0';

// Axios instance
const api = axios.create({
  baseURL: 'https://api.football-data.org/v4',
  headers: { 'X-Auth-Token': API_KEY },
});

// API call to fetch upcoming matches for a teamId
export const getTeamMatches = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}/matches`, {
      params: { status: 'SCHEDULED' },
    });
    return response.data.matches;
  } catch (error) {
    console.error('Error fetching team matches:', error);
    return [];
  }
};
