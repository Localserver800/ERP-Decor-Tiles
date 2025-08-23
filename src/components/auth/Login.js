// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/'); // Redirect to home on success
    } catch (error) {
      // This will give us a more specific error message
      setError('Failed to log in: ' + error.message);
      console.error("Full error code:", error.code); // This is the most important line for debugging
      console.error("Full error object:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <h1>West Africa Decor</h1>
          <p>Log in to continue</p>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or phone number"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Log In</button>
        </form>
        <div className="login-links">
          <a href="/forgot">Forgot password?</a>
          <a href="/signup">Create new account</a>
        </div>
      </div>
      <div className="login-footer">
        <p>Language: English (set)</p>
      </div>
    </div>
  );
};

export default Login;