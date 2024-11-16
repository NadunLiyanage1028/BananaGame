import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Game = ({ player, updateScoreboard }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialLevel = parseInt(queryParams.get('level')) || 1;

    const [questionData, setQuestionData] = useState(null);
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(initialLevel);
    const [remainingAttempts, setRemainingAttempts] = useState(5);
    const [timer, setTimer] = useState(60); // Initial timer of 60 seconds
    const [lifelines, setLifelines] = useState(3); // Initial lifelines

    const scoreThresholds = [0, 20, 40, 60, 80, 100];
    const attemptsPerLevel = [5, 4, 3, 2, 1];
    const timerBonusThreshold = 30; // Bonus if completed within 30 seconds
    const bonusPoints = 10; // Bonus points for quick completion

    useEffect(() => {
        fetchQuestion();
    }, [level]);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(countdown);
        } else {
            handleLifeline();
        }
    }, [timer]);

    const fetchQuestion = async () => {
        setLoading(true);
        setTimer(60); // Reset timer at start of each level
        try {
            const response = await axios.get('/uob/banana/api.php?out=json');
            if (response.data && response.data.question && response.data.solution) {
                setQuestionData(response.data);
                setFeedback('');
                setRemainingAttempts(attemptsPerLevel[level - 1]);
            } else {
                setFeedback('Error: Could not load game question.');
            }
        } catch (error) {
            console.error("Error fetching the question:", error);
            setFeedback('Failed to load game question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuess = () => {
        if (userGuess === questionData.solution) {
            setFeedback('Correct! Well done!');
            let newScore = score + 10;

            // Bonus points for completing quickly
            if (timer > timerBonusThreshold) {
                newScore += bonusPoints;
                setFeedback(feedback + ` Quick bonus! +${bonusPoints} points!`);
            }

            setScore(newScore);

            // Check if player qualifies for the next level
            if (newScore >= scoreThresholds[level]) {
                setLevel(level + 1);
                localStorage.setItem('currentLevel', level + 1);
                navigate(`/levels`);
            } else {
                fetchQuestion();
            }
            setUserGuess('');
        } else {
            setFeedback('Incorrect, try again!');
            setRemainingAttempts(prev => prev - 1);

            if (remainingAttempts <= 1) {
                setFeedback('Out of attempts! Restarting level.');
                setScore(Math.max(0, score - 5));
                fetchQuestion();
            }
        }
    };

    const handleLifeline = () => {
        if (lifelines > 1) {
            setLifelines(lifelines - 1);
            setTimer(60); // Reset timer
            fetchQuestion();
        } else {
            setFeedback("Out of lifelines! Ending game.");
            handleGameEnd();
        }
    };

    const handleGameEnd = () => {
        updateScoreboard(player.name, score, player.avatar);
        navigate('/score');
    };

    return (
        <div>
            <h1>Banana Game</h1>
            <p>Score: {score} | Level: {level} | Remaining Attempts: {remainingAttempts} | Timer: {timer}s | Lifelines: {lifelines}</p>
            {loading ? (
                <p>Loading question...</p>
            ) : questionData ? (
                <div>
                    <p>Guess the number shown in the image:</p>
                    <img src={questionData.question} alt="Banana Game Question" />
                    <input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="Enter your guess"
                    />
                    <button onClick={handleGuess}>Submit Guess</button>
                    <p>{feedback}</p>
                    <button onClick={handleLifeline} disabled={lifelines <= 1}>Use Lifeline</button>
                    <button onClick={handleGameEnd}>End Game</button>
                </div>
            ) : (
                <p>{feedback || 'Error loading game question'}</p>
            )}
        </div>
    );
};

export default Game;
