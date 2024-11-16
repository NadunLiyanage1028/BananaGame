const mongoose = require('mongoose');

// Define the schema for the player
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, default: 0 }
});

// Create the model from the schema
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;  // Export the model so it can be used elsewhere
