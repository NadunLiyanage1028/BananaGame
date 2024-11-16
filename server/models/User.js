// models/User.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }, // Name of the player
    score: { type: Number, default: 0 },    // Player's score
}, { collection: 'players' }); // Explicitly set the collection to 'players'

module.exports = mongoose.model('Player', playerSchema);
