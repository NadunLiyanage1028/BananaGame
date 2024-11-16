const express = require('express');
const router = express.Router();
const Player = require('../models/player'); // Ensure you import the Player model

// Route to create a new player
router.post('/players', async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        await newPlayer.save();
        res.status(201).send(newPlayer); // Send the newly created player as a response
    } catch (err) {
        res.status(400).send(err); // Send error if something goes wrong
    }
});

// Route to get all players
router.get('/players', async (req, res) => {
    try {
        const players = await Player.find(); // Retrieve all players
        res.send(players); // Send the players as a response
    } catch (err) {
        res.status(500).send(err); // Send error if something goes wrong
    }
});

module.exports = router; // Export the routes to use in index.js
