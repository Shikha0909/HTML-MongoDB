const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from current directory

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://node:node123@cluster0.krw6bf8.mongodb.net/loginpage';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define a schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Define a model
const User = mongoose.model('User', userSchema);

// Routes

// Route for student login form submission
app.post('/studentLogin', (req, res) => {
    const { username, password } = req.body;

    // Example: Inserting data into MongoDB collection
    const newUser = new User({ username, password });
    newUser.save()
        .then(() => res.send('Student logged in successfully'))
        .catch(err => res.status(500).send('Error submitting form'));
});

// Route for admin login form submission
app.post('/adminLogin', (req, res) => {
    const { username, password } = req.body;

    // Example: Inserting data into MongoDB collection
    const newUser = new User({ username, password });
    newUser.save()
        .then(() => res.send('Admin logged in successfully'))
        .catch(err => res.status(500).send('Error submitting form'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
