import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Score = ({ scoreboard, clearScoreboard }) => {
  const navigate = useNavigate(); // Use navigate instead of history

  // Sort the scoreboard by score in descending order to display the best player at the top
  const sortedScoreboard = [...scoreboard].sort((a, b) => b.score - a.score);

  const handleHomeClick = () => {
    navigate('/Home'); // Navigate to the home page
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundImage: 'url(/Images/Background/banantreesunlight.jpg)', // Replace with your background image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff', // Text color for better contrast on dark backgrounds
      }}
    >
      <h1 
        style={{
          textAlign: 'center',
          marginTop: '20px',
          color:'black',
          fontSize: '30px',
          fontFamily: '"Rounded Mplus 1c", sans-serif',
          fontWeight: 'bold',
      }}
      
      >Scoreboard</h1>

      {sortedScoreboard.length === 0 ? (
        <p>No scores yet!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0, margin: '10px 0' }}>
          {sortedScoreboard.map((scoreEntry, index) => (
            <li
              key={index}
              style={{
                margin: '15px 0',
                padding: '10px',
                background: 'rgba(17, 105, 86, 1)',  // dark green with some transparency
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '1.5em', marginRight: '10px' }}>#{index + 1}</span>
              <img
                src={scoreEntry.avatar}
                alt={`${scoreEntry.name}'s avatar`}
                width="50"
                style={{
                  borderRadius: '50%',
                  marginRight: '15px',
                  border: '2px solid #fff', // White border around the avatar
                }}
              />
              <strong style={{ fontSize: '1.2em', marginRight: '10px' }}>{scoreEntry.name}</strong>
              <span style={{ fontSize: '1.2em' }}>Score: {scoreEntry.score}</span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        
        <button
          onClick={handleHomeClick}
          style={{
                         padding: '10px 20px',
                        background: 'yellow',
                        color: '#000',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer',
          }}
        >
          Home
        </button>

        <button
          onClick={clearScoreboard}
          style={{
                         padding: '10px 20px',
                        background: 'green',
                        color: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer',
          }}
        >
          Clear Scoreboard
        </button>

      </div>
    </div>
  );
};

export default Score;
