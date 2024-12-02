import React from 'react';

const Instructions = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage:  'url(/Images/Background/banantreesunlight.jpg)', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Enhance text visibility
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ color: 'black', fontSize: '2.5rem' }}>Game instructions</h1>
      <div
        style={{
          maxWidth: '600px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for better readability
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <ol style={{ lineHeight: '1.8', fontSize: '16px' }}>
          <li>
            Log in or create an account to get started. provide your email as your username and give appropriate password and signup, then you can login.
          </li>
          <li>
            Navigate to the "Play" section to start the game. Solve the puzzles by guessing the correct number hidden behind the bananas.
          </li>
          <li>
            Unlock levels by achieving the required score in each stage. Levels get progressively harder with added challenges like limited attempts and with incraesing score tresholds to unlock each level up.
          </li>
          <li>
            View your high scores on the "Score" page to track your progress.
          </li>
          <li>
            Customize your avatar and update your profile picture.
          </li>
          <li>
            Use hints or lifelines when you’re stuck, but use them wisely as they are limited.
          </li>
        </ol>
      </div>
      <button
        style={{
          padding: '10px 20px',
                        background: 'yellow',
                        color: '#000',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer',
        }}
        onClick={() => window.history.back()} // Navigate back to the previous page
      >
        Back
      </button>
    </div>
  );
};

export default Instructions;
