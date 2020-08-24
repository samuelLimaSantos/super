import React from 'react';
import Routes from './routes';
import { AuthProvider } from './Context/AuthContext';
import History from './History';
import { Router } from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router history={History}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
