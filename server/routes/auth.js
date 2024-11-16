const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, age, email, password, confirmPassword, name } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with default score set to 0
        const newUser = new User({
            username,
            age,
            email,
            password: hashedPassword,
            name,
            score: 0  // Default score set to 0
        });

        // Save user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare entered password with the stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: '1h' });

        // Respond with success message, token, and user details
        res.status(200).json({
            message: "Login successful",
            token,
            user: {        // Send back user's name and score along with token
                name: user.name,
                score: user.score
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

module.exports = router;
