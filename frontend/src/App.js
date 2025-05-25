import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Componente de fallback
const FallbackUI = () => (
  <div style={{
    padding: '20px',
    background: '#121212',
    color: 'white',
    minHeight: '100vh'
  }}>
    <h1>DevPoints</h1>
    <p>Carregando aplicação...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Fallback para rotas inválidas */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;