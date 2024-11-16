// src/components/Loading.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a loading process
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev === 100) {
                    clearInterval(interval);
                    navigate('/login'); // Redirect to login after loading
                    return 100;
                }
                return prev + 10; // Increase progress every 500ms
            });
        }, 500);

        return () => clearInterval(interval); // Clear interval on cleanup
    }, [navigate]);

    return (
        <div style={styles.container}>
            <h2>Loading...</h2>
            <div style={styles.progressBarContainer}>
                <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
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
    },
    progressBarContainer: {
        width: '80%',
        height: '30px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        marginTop: '20px',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: '5px',
    },
};

export default Loading;
