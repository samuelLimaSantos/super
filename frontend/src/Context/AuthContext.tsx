import React, { createContext, useState, useEffect } from 'react';
import History from '../History';
import api from '../services/api';

const Context = createContext({
  authenticated: false,
  handleLogin(token: string, category: string) {},
  token: '',
  handleLogout() {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  function handleLogin(token: string, category: string) {
    setToken(token);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('category', JSON.stringify(category));

    api.defaults.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);

    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        token,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
