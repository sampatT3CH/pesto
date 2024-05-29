import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './styles/Navbar.css';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const { logout: logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutContext()
    navigate('/login')
  };

  return (
    <nav>
      <h1>Task Manager</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
