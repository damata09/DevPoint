import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Estilos mínimos inline como fallback
const style = document.createElement('style');
style.textContent = `
  body { 
    margin: 0; 
    background: #121212;
    color: white;
    font-family: Arial, sans-serif;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);