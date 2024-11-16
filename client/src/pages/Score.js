import React from 'react';

const Score = ({ scoreboard, clearScoreboard }) => {
  // Sort the scoreboard by score in descending order to display the best player at the top
  const sortedScoreboard = [...scoreboard].sort((a, b) => b.score - a.score);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Scoreboard</h1>
      {sortedScoreboard.length === 0 ? (
        <p>No scores yet!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {sortedScoreboard.map((scoreEntry, index) => (
            <li key={index} style={{ margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.5em', marginRight: '10px' }}>#{index + 1}</span>
              <img src={scoreEntry.avatar} alt={`${scoreEntry.name}'s avatar`} width="50" style={{ borderRadius: '50%', marginRight: '10px' }} />
              <strong style={{ fontSize: '1.2em' }}>{scoreEntry.name}</strong>: <span style={{ marginLeft: '5px' }}>{scoreEntry.score}</span>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearScoreboard} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1em' }}>
        Clear Scoreboard
      </button>
    </div>
  );
};

export default Score;
