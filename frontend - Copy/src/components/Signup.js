import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.css';
import logo from '../assets/spotify-logo.png';
import { signup } from '../services/auth';  // Corrected the import to use 'signup' from auth.js

function SignUp() {
  console.log('Signup Component Rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Use 'signup' here instead of 'registerUser'
      await signup(email, password);  
      navigate('/');  // Redirect to the homepage or dashboard after successful sign-up
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);  // Reset the loading state
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Spotify.png" className="logo" />
      <h2 className="title">Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className="switch-text">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
