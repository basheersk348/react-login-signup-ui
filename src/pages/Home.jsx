import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="auth-card">
      <h2>Welcome Home!</h2>
      <p style={{ fontSize: '1rem', color: '#0f172a' }}>
        Logged in as: <strong>{user?.email}</strong>
      </p>
    </div>
  );
};

export default Home;