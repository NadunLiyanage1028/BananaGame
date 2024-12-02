import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Game = ({ player, updateScoreboard }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialLevel = parseInt(queryParams.get("level")) || 1;

  const [questionData, setQuestionData] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(initialLevel);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [timer, setTimer] = useState(60);
  const [lifelines, setLifelines] = useState(3);

  const scoreThresholds = [100, 200, 400, 450, 600, 650];
  const attemptsPerLevel = [4, 3, 2, 1, 0];
  const timerBonusThreshold = 30;
  const bonusPoints = 10;

  useEffect(() => {
    fetchQuestion();
  }, [level]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      handleLifeline();
    }
  }, [timer]);

  const fetchQuestion = async () => {
    setLoading(true);
    setTimer(60);
    try {
      const response = await axios.get("/uob/banana/api.php?out=json");
      if (response.data && response.data.question && response.data.solution) {
        console.log("Correct Answer (for debugging):", response.data.solution);
        setQuestionData(response.data);
        setFeedback("");
        setRemainingAttempts(attemptsPerLevel[level - 1]);
      } else {
        setFeedback("Error: Could not load game question.");
      }
    } catch (error) {
      console.error("Error fetching the question:", error);
      setFeedback("Failed to load game question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuess = () => {
    if (questionData && String(userGuess).trim() === String(questionData.solution).trim()) {
      let newFeedback = "Correct! Well done!";
      let newScore = score + 10;

      if (timer > timerBonusThreshold) {
        newScore += bonusPoints;
        newFeedback += ` Quick bonus! +${bonusPoints} points!`;
      }

      setFeedback(newFeedback);
      setScore(newScore);

      if (newScore >= scoreThresholds[level]) {
        setLevel(level + 1);
        localStorage.setItem("currentLevel", level + 1);
        navigate(`/levels`);
      } else {
        fetchQuestion();
      }
      setUserGuess("");
    } else {
      setFeedback("Incorrect, try again!");
      setRemainingAttempts((prev) => prev - 1);

      if (remainingAttempts <= 1) {
        setFeedback("Out of attempts! Restarting level.");
        setScore(Math.max(0, score - 5));
        fetchQuestion();
      }
    }
  };

  const handleLifeline = () => {
    if (lifelines > 0) {
      setLifelines((prev) => prev - 1);
      setTimer(60);
      fetchQuestion();
    } else {
      setFeedback("Out of lifelines! Ending game.");
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    updateScoreboard(player.name, score, player.avatar);
    const playerData = { name: player.name, avatar: player.avatar, score };
    localStorage.setItem("playerData", JSON.stringify(playerData));
    navigate("/score");
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: 'url(/Images/Background/back1.jpg)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#000",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden"
      }}
    >
      

      <h1 style={{ fontSize: "2.5em", marginBottom: "20px" ,fontWeight: 'bold'}}>Guess the Banana Quest !</h1>

      <p style={{
        fontSize: "1.2em",
        backgroundColor: "rgba(255, 255, 0, 0.5)", // Transparent yellow background
        padding: "10px", // Adds space around the text
        borderRadius: "5px", // Optional: rounds the corners
        display: "inline-block", // Keeps the background tight to the text
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow for depth
      }}>
        Score: {score} | Level: {level} | Remaining Attempts: {remainingAttempts} | Timer: {timer}s | Lifelines: {lifelines}
      </p>
      {loading ? (
        <p>Loading question...</p>
      ) : questionData ? (
        <div style={{ margin: "20px auto", maxWidth: "600px" }}>
          <p style={{ fontSize: "1em" }}>Guess the number in shown puzzle:</p>
          <img
            src={questionData.question}
            alt="Banana Game Question"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
          <div style={{ margin: "20px 0" }}>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess"
              style={{
                padding: "10px",
                fontSize: "1em",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px"
              }}
            />
                      <button
                        onClick={handleGuess}
                       style={{
                        padding: "10px 20px",
                        fontSize: "1em",
                        borderRadius: "8px", // Slightly more rounded corners for a modern look
                        backgroundColor: "rgba(255, 223, 0, 0.8)", // Transparent yellow background
                        color: "black",
                        border: "2px solid rgba(0, 0, 0, 0.1)", // Adds a subtle border
                        cursor: "pointer",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds depth
                        transition: "all 0.3s ease", // Smooth hover effects
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "rgba(255, 223, 0, 1)") // Fully opaque yellow on hover
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "rgba(255, 223, 0, 0.8)") // Revert to transparent yellow
                      }
                    >
                      Submit Guess
                    </button>

          </div>
          <p style={{ fontSize: "1.2em", color: feedback.includes("Correct") ? "green" : "red" }}>
            {feedback}
          </p>
          <div>
            <button
              onClick={handleLifeline}
              disabled={lifelines <= 0}
              style={{
                padding: "10px 20px",
                margin: "10px",
                fontSize: "1em",
                borderRadius: "5px",
                backgroundColor: lifelines > 0 ? "#007bff" : "#6c757d",
                color: "#fff",
                border: "none",
                cursor: lifelines > 0 ? "pointer" : "not-allowed"
              }}
            >
              Use Lifeline ({lifelines} left)
            </button>
            <button
              onClick={handleGameEnd}
              style={{
                padding: "10px 20px",
                margin: "10px",
                fontSize: "1em",
                borderRadius: "5px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              End Game
            </button>
          </div>
        </div>
      ) : (
        <p>{feedback || "Error loading game question"}</p>
      )}
    </div>
  );
};

export default Game;
