// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import LanguageSwitcher from '../LanguageSwitcher';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUserRole } from '../../firebase'; // Import getUserRole

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // Get the logged-in user
      if (user) {
        const role = await getUserRole(user.uid); // Get the user's role
        if (role === 'admin') {
          navigate('/admin'); // Redirect admin to admin dashboard
        } else {
          navigate('/dashboard'); // Redirect customer to customer dashboard
        }
      }
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
          {/* Placeholder for the Facebook logo */}
          <img src="/logo.svg" alt="Facebook" className="facebook-logo" />
          <p>Connect with friends and the world around you on Facebook.</p>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Email or phone number"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="login-links">
          <a href="/forgot">Forgot password?</a>
        </div>
        <div className="divider"></div>
        <div className="create-account">
          <button className="create-account-button" onClick={() => navigate('/signup')}>Create new account</button>
        </div>
      </div>
      <div className="login-footer">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Login;