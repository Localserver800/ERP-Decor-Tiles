import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Access Denied</h1>
      <p>You don't have permission to access this page.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Unauthorized;