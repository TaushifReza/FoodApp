import React, { useState } from 'react';
import BurgerBG from '../images/BurgerBG.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/Auth/login', {
        Username: username,
        Password: password
      });
      const token = response.data.token;
      console.log('Login Successful. Token:', token);
      navigate('/dashboard');

    } catch (error) {
      setError('Invalid username/email or password.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${BurgerBG})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          margin-top: 110px;
        }
        .login-form {
          width: 290px;
          padding: 70px;
          background: transparent;
        }
        .login-form input {
          width: 100%;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .login-form button {
          width: 111%;
          padding: 15px;
          border-radius: 5px;
          border: none;
          margin-top: 20px;
          background-color: #007bff;
          color: #ffffff;
          opacity: 2;
          cursor: pointer;
          transition: 0.3s;
        }
        .login-form button:hover {
          opacity: 0.9;
      `}</style>
      <h2 style={{ color: 'white', position: 'absolute', top: 170, left: 660, fontWeight: 600, fontSize: 30 }}>Login to Continue</h2>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
      <Link to={'/login'} style={{ textDecoration: 'none' }}>
        <h1 style={{ position: 'relative', bottom: 545, right: 660, color: 'orange', fontWeight: 100, fontSize: 40 }}>YETAI-EATS</h1>
      </Link>
      <span style={{ color: 'white', fontSize: 20, fontWeight: 500, position: 'relative', top: 50 }}>
        © 2024 YetaiEats
      </span>
    </div>
  );
};

export default LoginScreen;
