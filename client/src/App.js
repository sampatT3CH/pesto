import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

const PrivateRoute = ({ element, ...rest }) => {
  const authData = JSON.parse(localStorage.getItem('authData'));

  return authData.isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute element={<TaskList />} />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
