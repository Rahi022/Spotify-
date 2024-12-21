const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  
const protectedRoutes = require('./routes/protectedRoutes');  

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((error) => console.error('MongoDB Connection Failed:', error.message));

// Debugging - Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (signup/signin)
app.use('/api/protected', protectedRoutes); // Protected routes (if any)

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message, '\nStack:', err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});