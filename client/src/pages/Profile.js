
import React, { useState, useEffect } from 'react';

const Profile = ({ player, setPlayer }) => {
    const [newName, setNewName] = useState(player.name);
    const [selectedAvatar, setSelectedAvatar] = useState(player.avatar);

    const avatars = [
        'https://example.com/avatar1.jpg', 
        'https://example.com/avatar2.jpg', 
        'https://example.com/avatar3.jpg'
    ];

    useEffect(() => {
        // Get the stored player data from localStorage if it exists
        const storedName = localStorage.getItem('playerName');
        const storedAvatar = localStorage.getItem('playerAvatar');
        
        if (storedName && storedAvatar) {
            setNewName(storedName);
            setSelectedAvatar(storedAvatar);
        }
    }, []);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSave = () => {
        // Save the player data to localStorage
        localStorage.setItem('playerName', newName);
        localStorage.setItem('playerAvatar', selectedAvatar);
        
        // Update player data state
        setPlayer({ name: newName, avatar: selectedAvatar });
    };

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <h2>Choose Your Avatar</h2>
                <div>
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
                                border: avatar === selectedAvatar ? '3px solid green' : 'none'
                            }}
                            onClick={() => handleAvatarSelect(avatar)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2>Change Your Name</h2>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Profile;
