import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const registerUser = await register(username, password);
      setUsername("");
      setPassword("");
      alert(registerUser.data.message);
      navigate('/login');
    } catch (err) {
      alert('Registration Unsuccessful');
    }
  };

  const navigateLogin = async() => {
    navigate('/login')
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>Already have account ? <span style={{color:"blue"}} onClick={navigateLogin}>Login</span></p>
      </form>
    </div>
  );
};

export default Register;
