import React, { useEffect, useState } from 'react';
import { getTeamMatches } from '../services/apiService';
import '../App.css';

const Content = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamIds = [64, 65, 66]; // ✅ Defined inside useEffect

    const fetchFixtures = async () => {
      setLoading(true);
      const allFixtures = [];

      for (const teamId of teamIds) {
        const teamFixtures = await getTeamMatches(teamId);
        allFixtures.push(...teamFixtures);
      }

      allFixtures.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

      setFixtures(allFixtures);
      setLoading(false);
    };

    fetchFixtures();
  }, []); // ✅ Empty dependency array (runs once)

  return (
    <div className='content-container'>
      <h2>Upcoming Fixtures</h2>
      {loading ? (
        <p>Loading fixtures...</p>
      ) : fixtures.length === 0 ? (
        <p>No upcoming matches found.</p>
      ) : (
        <ul>
          {fixtures.map((match) => (
            <li key={match.id}>
              {new Date(match.utcDate).toLocaleString()} - {match.homeTeam.name} vs {match.awayTeam.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Content;
