// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ player }) => {
  const navigate = useNavigate();

  if (!player) {
    return <div>Loading...</div>; // Fallback if player is not available
  }

  return (
    <div>
      <h1>Welcome, {player.name}!</h1>
      <img src={player.avatar} alt="Player Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <button onClick={() => navigate('/game')}>Play</button>
      <button onClick={() => navigate('/levels')}>Levels</button>
      <button onClick={() => navigate('/score')}>Score</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
    </div>
  );
};

export default Home;
