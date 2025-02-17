import axios from 'axios';

// Use the Express proxy instead of CORS-Anywhere
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Points to your Express proxy
});

export const getTeamMatches = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}/matches`);
    return response.data.matches;
  } catch (error) {
    console.error(`Error fetching matches for team ${teamId}:`, error);
    return [];
  }
};
