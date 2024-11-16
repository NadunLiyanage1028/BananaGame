const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes'); // Import routes
const app = express();

const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bananaGameDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(express.json()); // To parse incoming JSON data

// Use player routes with '/api' prefix
app.use('/api', playerRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Hello, BananaGame!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
