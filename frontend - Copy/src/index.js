import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context'; // Import AuthProvider
import App from './App';
//import './index.css'; // Global styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);