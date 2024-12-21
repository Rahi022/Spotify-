const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// SIGNUP
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully", 
            user: { id: newUser._id, name: newUser.name, email: newUser.email } // Avoid sending hashed password
        });
    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(500).json({ error: "Signup failed. Please try again." });
    }
};

// SIGNIN
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // Send response
        res.status(200).json({ 
            message: "Login successful", 
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Signin Error:', error.message);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
};