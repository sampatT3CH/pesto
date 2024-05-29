import React, { useState, useContext } from 'react';
import { login } from '../api/auth';
import AuthContext from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { login: loginContext } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const loginUser = await login(username, password);
      const { token, user } = loginUser.data;
      loginContext(user, token)
      if(loginUser.data.message === 'Logged in successfully'){
        navigate('/tasks',{state : {id:loginUser.data.user._id}})
      }else{
        alert('wrong credentials');
        setUsername('')
        setPassword("")
      }
      
      console.log(loginUser);
    } catch (err) {
      alert('Login Failed');
    }
  };

  const navigateRegister = async() => {
    navigate('/register')
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p>Not Registered yet? <span style={{color:"blue"}} onClick={navigateRegister}>Register</span></p>
      </form>
      
    </div>
  );
};

export default Login;
