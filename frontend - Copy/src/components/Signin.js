import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.css';
import logo from '../assets/spotify-logo.png';
import { signin } from '../services/auth';  // Corrected the import to match 'signin' from auth.js

function SignIn() {
  console.log('Signin Component Rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    setLoading(true);
    setError('');
    try {
      // Use 'signin' here instead of 'signInWithEmail'
      await signin(email, password);  
      navigate('/');  // Redirect to the homepage or dashboard after successful sign-in
    } catch (err) {
      // Handle error and display the error message
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);  // Reset the loading state
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="spotify-logo.png" className="logo" />
      <h2 className="title">Sign In</h2>
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
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="switch-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;