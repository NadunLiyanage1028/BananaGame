import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use navigate hook for routing

const Levels = () => {
    const [currentLevel, setCurrentLevel] = useState(1);  // Track current level
    const levels = [
        { level: 1, name: 'Level 1', unlocked: true },
        { level: 2, name: 'Level 2', unlocked: currentLevel >= 2 },
        { level: 3, name: 'Level 3', unlocked: currentLevel >= 3 },
        { level: 4, name: 'Level 4', unlocked: currentLevel >= 4 },
        { level: 5, name: 'Level 5', unlocked: currentLevel >= 5 },
    ];

    const navigate = useNavigate(); // Hook to navigate between pages

    // Handle level button click
    const handleLevelClick = (level) => {
        if (level.unlocked) {
            // Navigate to the game page for the selected level
            navigate(`/game?level=${level.level}`);
        } else {
            alert('Please complete the previous levels to unlock this!');
        }
    };

    // Retrieve the current level from localStorage on component mount
    useEffect(() => {
        const storedLevel = localStorage.getItem('currentLevel');
        if (storedLevel) {
            setCurrentLevel(Number(storedLevel));  // Set the current level from stored value
        }
    }, []);

    // Function to reset levels to level 1
    const resetLevels = () => {
        setCurrentLevel(1); // Reset the current level to 1
        localStorage.setItem('currentLevel', 1); // Update local storage
        alert('Levels have been reset to Level 1!');
    };

    return (
        <div 
            style={{
                backgroundImage: 'url(/Images/Background/banantreesunlight.jpg)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px'
            }}
        >
            <h1 style={{ color: 'black', fontSize: '2.5rem', fontWeight: 'bold' }}>Banana Game Levels</h1>
            <p style={{ color: 'black', fontSize: '1.25rem' }}>Choose your level to play!</p>
            
            <div style={{ width: '100%', maxWidth: '600px' }}>
                {levels.map((level, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <button
                            style={{
                                padding: '15px',
                                backgroundColor: level.unlocked ? '#4CAF50' : '#ccc',
                                color: level.unlocked ? 'white' : 'gray',
                                cursor: level.unlocked ? 'pointer' : 'not-allowed',
                                borderRadius: '5px',
                                width: '100%',
                                fontSize: '1.25rem',
                                transition: 'background-color 0.3s',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                            onClick={() => handleLevelClick(level)}
                            disabled={!level.unlocked}
                        >
                            <span>{level.name}</span>
                            {!level.unlocked && (
                                <img
                                    src="/Images/Icons/lockicon.jpg" // Replace with the correct path to your lock icon
                                    alt="Locked Icon"
                                    style={{ width: '20px', height: '20px' }}
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        background: 'yellow',
                        color: 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                    onClick={() => navigate('/home')}
                >
                    Back to Home
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={resetLevels}
                >
                    Reset Levels
                </button>
            </div>
        </div>
    );
};

export default Levels;
