import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Retrieve player data from localStorage
    const playerData = JSON.parse(localStorage.getItem('player'));
    if (playerData) {
      setPlayer(playerData);
    } else {
      navigate('/login'); // Redirect to login if no player data found
    }
  }, [navigate]);

  if (!player) {
    return <div>Loading...</div>; // Fallback if player is not available
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage:  'url(/Images/Background/back3.jpg)', // Replace with your actual background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Enhance text visibility
      }}
    >
                  <h1
              style={{
                color: "black",
                fontSize: "3rem", // Increased font size for more emphasis
                fontWeight: "bold",
                textAlign: "center", // Center aligns the text
                lineHeight: "1.2", // Adjusts spacing between the two lines
              }}
            >
              Welcome to Banana Quest
              <br />
              <span style={{ color: "darkorange" }}>{player.name}!</span> {/* Second line with player name */}
            </h1>


      {/* Background GIFs */}
     
      <img
        src="/Images/Background/gigimage3.gif"
        alt="Background Animation 2"
        style={{
          position: "absolute",
          bottom: "1%",
          right: "8%",
          width: "350px",
          height: "200",
          zIndex: 0,
          opacity: 0.8
        }}
      />
      <img
        src={player.avatar}
        alt="Player Avatar"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          marginBottom: '20px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '200px',
        }}
      >
        <button
          style={buttonStyle}
          onClick={() => navigate('/game')}
        >
          Play
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/levels')}
        >
          Levels
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/score')}
        >
          Score
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/profile')}
        >
          Profile
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/instructions')}
        >
          Instructions
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'transform 0.2s ease-in-out',
};

export default Home;
