import React, { useEffect, useState } from 'react';
import { getTeamMatches } from '../services/apiService';
import '../Content.css';

// Define team names and IDs, maybe be able to choose ur own teams, input name and fetch with corresponding Id
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
              <div className="fixtures-scroll-container">
                {fixtures[team.id]?.length > 0 ? (
                  <div className="fixtures-list">
                    {fixtures[team.id].map((match) => (
                      <div key={match.id} className="fixture-box">
                        <p className="fixture-time">{new Date(match.utcDate).toLocaleString()}</p>
                        <p className="fixture-teams">{match.homeTeam.name} <br></br> VS <br></br> {match.awayTeam.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No upcoming matches found for {team.name}.</p>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Content;

