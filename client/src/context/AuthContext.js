import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const login = (user, token) => {
    console.log(user,token)
    localStorage.setItem('authData', JSON.stringify({ isAuthenticated: true, user: user, token: token }));

    // setAuth({ isAuthenticated: true, user, token });
  };

  const logout = () => {
    console.log("hello")
    localStorage.setItem('authData', JSON.stringify({ isAuthenticated: false, user: null, token: null }));

    // setAuth({ isAuthenticated: false, user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
