import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    // Você pode adicionar aqui um serviço de log de erros se quiser
  }

  render() {
    if (this.state.hasError) {
      // Redireciona para a HomePage após 1 segundo
      return <Navigate to="/" replace />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;