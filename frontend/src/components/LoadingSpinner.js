import React from 'react';

const LoadingSpinner = ({ fullPage = true }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: fullPage ? '100vh' : '100%',
      backgroundColor: fullPage ? '#121212' : 'transparent'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '8px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(108, 99, 255, 0.3)',
          borderTopColor: '#6c63ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
        <p style={{ 
          marginTop: '1rem',
          color: '#b0b0b0'
        }}>Carregando experiência DevPoints...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;