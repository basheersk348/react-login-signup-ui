import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="auth-card">
      <h2>Welcome Home!</h2>
      <p style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '1.5rem' }}>
        Logged in as: <strong>{user?.email}</strong>
      </p>

      {/* Logout button to clear session */}
      <button 
        className="auth-button" 
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;