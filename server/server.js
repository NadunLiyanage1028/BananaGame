const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Updated path to authentication routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bananaGameDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Use authentication routes for the /api/auth endpoint
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 4000;  // Changed port to 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
