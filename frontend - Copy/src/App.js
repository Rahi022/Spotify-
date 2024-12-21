import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Context';
import './components/common.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
  // Access token and setToken from AuthContext
  const { token } = useContext(AuthContext);

  console.log('App Component Rendered, Token:', token);

  return (
    <Routes>
      {/* Redirect authenticated users from Signin and Signup */}
      <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/signin"
        element={token ? <Navigate to="/" /> : <Signin />}
      />

      {/* Protected Home Route */}
      <Route
        path="/"
        element={token ? <Home /> : <Navigate to="/signin" />}
      />

      {/* 404 Route */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;