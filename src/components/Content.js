import React, { useEffect, useState } from 'react';
import { getTeamMatches } from '../services/apiService';
import '../Content.css';

// Define team names and IDs
const teams = [
  { id: 66, name: "Manchester United" },
  { id: 58, name: "Aston Villa" },
  { id: 90, name: "Real Betis" },
  { id: 524, name: "Paris Saint-Germain" },
];

const Content = () => {
  const [fixtures, setFixtures] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true);
      const fixturesData = {};

      for (const team of teams) {
        const teamFixtures = await getTeamMatches(team.id);
        fixturesData[team.id] = teamFixtures; // Store fixtures by team ID
      }

      setFixtures(fixturesData);
      setLoading(false);
    };

    fetchFixtures();
  }, []);

  return (
    <div className='content-container'>
      {loading ? (
        <p>Loading fixtures...</p>
      ) : (
        <>
          {teams.map((team) => (
            <div key={team.id} className='team-section'>
              <h3>{team.name}</h3>
              {fixtures[team.id]?.length > 0 ? (
                <ul>
                  {fixtures[team.id].map((match) => (
                    <li key={match.id}>
                      {new Date(match.utcDate).toLocaleString()} - {match.homeTeam.name} vs {match.awayTeam.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming matches found for {team.name}.</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Content;
