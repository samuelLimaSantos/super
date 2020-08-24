import React, { createContext, useState, useEffect } from 'react';
import History from '../History';
import api from '../services/api';

const Context = createContext({
  authenticated: false,
  handleLogin(token: string, category: string) {},
  token: '',
  category: '',
  handleLogout() {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  function handleLogin(token: string, category: string) {
    setToken(token);
    setCategory(category);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('category', JSON.stringify(category));

    api.defaults.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
    setToken('');
    setCategory('');
    localStorage.removeItem('token');
    localStorage.removeItem('category');
    api.defaults.headers.Authorization = undefined;
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        token,
        handleLogout,
        category,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
