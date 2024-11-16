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
            alert('This level is locked. Complete the previous levels first!');
        }
    };

    // Retrieve the current level from localStorage on component mount
    useEffect(() => {
        const storedLevel = localStorage.getItem('currentLevel');
        if (storedLevel) {
            setCurrentLevel(Number(storedLevel));  // Set the current level from stored value
        }
    }, []);

    return (
        <div>
            <h1>Banana Game Levels</h1>
            <p>Choose your level to play!</p>
            <div>
                {levels.map((level, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <button
                            style={{
                                padding: '10px',
                                backgroundColor: level.unlocked ? '#4CAF50' : '#ccc',
                                color: level.unlocked ? 'white' : 'gray',
                                cursor: level.unlocked ? 'pointer' : 'not-allowed',
                                borderRadius: '5px',
                                width: '100%',
                            }}
                            onClick={() => handleLevelClick(level)}
                            disabled={!level.unlocked}
                        >
                            {level.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Levels;
