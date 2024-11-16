import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup'; // Import Signup page
import Home from './pages/Home';
import Game from './pages/Game';
import Levels from './pages/Levels';
import Score from './pages/Score';
import Profile from './pages/Profile';
import Loading from './components/Loading'; // Import Loading component

function App() {
  const [player, setPlayer] = useState({
    name: localStorage.getItem('playerName') || "John Doe",
    avatar: localStorage.getItem('playerAvatar') || "https://example.com/avatar.jpg"
  });

  const [scoreboard, setScoreboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading phase

  // Load the stored scoreboard when the app starts
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scoreboard')) || [];
    setScoreboard(storedScores);
    setTimeout(() => setIsLoading(false), 3000); // Simulate loading for 3 seconds
  }, []);

  // Save player data to localStorage whenever it changes
  useEffect(() => {
    if (player.name && player.avatar) {
      localStorage.setItem('playerName', player.name);
      localStorage.setItem('playerAvatar', player.avatar);
    }
  }, [player]);

  // Update the scoreboard when a player finishes a game
  const updateScoreboard = (name, score, avatar) => {
    const newScore = { name, score, avatar };
    const updatedScores = [...scoreboard, newScore].sort((a, b) => b.score - a.score);
    setScoreboard(updatedScores);
    localStorage.setItem('scoreboard', JSON.stringify(updatedScores));
  };

  // Clear the scoreboard
  const clearScoreboard = () => {
    setScoreboard([]);
    localStorage.removeItem('scoreboard');
  };

  return (
    <Router>
      {isLoading ? (
        <Loading /> // Display loading screen while loading
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
          <Route path="/home" element={<Home player={player} />} />
          <Route path="/game" element={<Game player={player} updateScoreboard={updateScoreboard} />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/score" element={<Score scoreboard={scoreboard} clearScoreboard={clearScoreboard} />} />
          <Route path="/profile" element={<Profile player={player} setPlayer={setPlayer} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
