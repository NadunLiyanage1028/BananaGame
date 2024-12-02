import React, { useState, useEffect } from 'react';

const Profile = ({ player, setPlayer }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(player.avatar);
    const [showPopup, setShowPopup] = useState(false); // State for success popup

    // Avatar options
    const avatars = [
        '/Images/Background/avatar111.jpg',
        '/Images/Background/av1.jpg',
        '/Images/Background/av2.jpg',
        '/Images/Background/av6.jpg',
        '/Images/Background/av7.jpg',
        '/Images/Background/avatar3.jpg',
    ];

    // Use effect to load player data from localStorage when the component mounts
    useEffect(() => {
        const storedPlayer = localStorage.getItem('player');
        if (storedPlayer) {
            const parsedPlayer = JSON.parse(storedPlayer);
            setPlayer(parsedPlayer);  // Update player state with stored data
            setSelectedAvatar(parsedPlayer.avatar || ''); // Ensure avatar is set correctly
        }
    }, [setPlayer]);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSave = () => {
        // Update the player object with the selected avatar
        const updatedPlayer = { ...player, avatar: selectedAvatar };

        // Save the updated player object to localStorage
        localStorage.setItem('player', JSON.stringify(updatedPlayer));

        // Update the player state
        setPlayer(updatedPlayer);

        // Show success popup
        setShowPopup(true);

        // Hide the popup after 2 seconds
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleBack = () => {
        // Navigate to the home page
        window.location.href = '/home';
    };

    return (
        <div
            style={{
                backgroundImage: `url('/Images/Background/banantreesunlight.jpg')`, // Background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                color: '#fff', // Adjust text color for contrast
            }}
        >
            {/* Heading for Avatar Selection */}
            <h2 
                style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    color:'black',
                    fontSize: '30px',
                    fontFamily: '"Rounded Mplus 1c", sans-serif',
                    fontWeight: 'bold',
                }}
            >
                Choose Your Avatar
            </h2>

            {/* Avatar Section */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {avatars.map((avatar, index) => (
                        <img
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                margin: '10px',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                border: avatar === selectedAvatar ? '4px solid #00FF00' : '4px solid transparent',
                                boxShadow: avatar === selectedAvatar ? '0 0 15px #00FF00' : '0 0 8px #ccc',
                                transition: 'transform 0.3s ease-in-out',
                                transform: avatar === selectedAvatar ? 'scale(1.1)' : 'scale(1)',
                            }}
                            onClick={() => handleAvatarSelect(avatar)}
                        />
                    ))}
                </div>
            </div>

            {/* Save Button and Back Button */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                    onClick={handleBack}
                    style={{
                        padding: '10px 20px',
                        background: 'yellow',
                        color: '#000',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Back
                </button>

                <button
                    onClick={handleSave}
                    style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
            </div>

            {/* Success Popup */}
            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        zIndex: '1000',
                    }}
                >
                    <p style={{ color: '#333' }}>Your profile was saved successfully!</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
