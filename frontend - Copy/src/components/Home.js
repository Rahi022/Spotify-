import React, { useContext } from 'react';
import { AuthContext } from '../Context';
import './common.css';

function Home() {
  const { logout } = useContext(AuthContext);
  console.log('Home Component Rendered');

  const handleLogout = () => {
    logout();
    window.location.href = '/signin';
  };

  return (
    <div className="home-container container">
      <h1>Welcome to Spotify Clone</h1>
      <p className="home-description">Enjoy personalized playlists and music recommendations!</p>
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default Home;