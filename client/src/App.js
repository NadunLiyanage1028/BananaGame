import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Loading from './components/Loading'; // Ensure Loading is properly imported
import Login from './pages/Login';
import Signup from './pages/signup'; // Ensure 'Signup' is correctly imported (case-sensitive)
import Home from './pages/Home';
import Game from './pages/Game';
import Levels from './pages/Levels';
import Score from './pages/Score';
import Profile from './pages/Profile';
import Instructions from './pages/instructions';




function App() {
  console.log("App component is rendering");  // Add this line to verify
  const [player, setPlayer] = useState({
    name: localStorage.getItem('playerName') || 'John Doe',
    avatar: localStorage.getItem('playerAvatar') || 'https://example.com/avatar.jpg',
  });

  const [scoreboard, setScoreboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the scoreboard from localStorage when the app starts
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scoreboard')) || [];
    setScoreboard(storedScores);
  }, []);

  // Save player data to localStorage whenever it changes
  useEffect(() => {
    if (player.name && player.avatar) {
      localStorage.setItem('playerName', player.name);
      localStorage.setItem('playerAvatar', player.avatar);
    }
  }, [player]);

  // Update the scoreboard when a new score is added
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

  // Simulate loading state by setting it to false after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // End loading state after 3 seconds
    }, 3000); // 3 seconds delay to simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        
        <Loading /> // Show the loading component until it's finished
        

      ) : (
        <Routes>
          {/* Ensure you route to Login at both '/' and '/login' */}


          <Route path="/" element={<Login />} /> 
          <Route path="/Login" element={<Login />} /> {/* Add this route to handle /login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home player={player} />} />

          <Route path="/instructions" element={<Instructions />} />

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

