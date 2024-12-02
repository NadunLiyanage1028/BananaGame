//loading

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

console.log("Loading component is rendering");

// Import Google Font
const Loading = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a loading process
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev === 100) {
                    clearInterval(interval);
                    navigate('./pages/Login.jsx'); // Redirect to login after loading
                    return 100;
                }
                return prev + 20; // Increase progress every 500ms
            });
        }, 500);

        return () => clearInterval(interval); // Clear interval on cleanup
    }, [navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <img
                    src="/Images/Background/banana.jpg" // Path to your banana image
                    alt="Banana"
                    style={styles.image}
                />
                <h1 style={styles.title}>
                    Banana <br /> Quest
                </h1>
            </div>
            <div style={styles.progressBarContainer}>
                <div style={{ ...styles.progressBar, width: `${progress}%` }}>
                    <span style={styles.progressText}>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px', // Adjust spacing below the title
    },
    image: {
        width: '300px', // Increased size of the banana image
        height: '300px',
        marginRight: '20px',
    },
    title: {
        fontSize: '3rem', // Increased font size for better balance
        fontWeight: 'bold',
        color: '#000', // Black color for title
        textAlign: 'left',
        lineHeight: '1.2',
        fontFamily: '"Rounded Mplus 1c", sans-serif', // Apply the custom font
    },
    progressBarContainer: {
        width: '85%',
        height: '15px', // Thinner progress bar
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
        border: '2px solid black', // Black outline
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'rgba(255, 223, 0, 0.9)', // Banana yellow color
        transition: 'width 0.5s ease-in-out',
        position: 'relative',
    },
    progressText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        color: '#000',
        fontSize: '0.9rem',
        fontFamily: '"Rounded Mplus 1c", sans-serif', // Apply the custom font
    },
};

export default Loading;
