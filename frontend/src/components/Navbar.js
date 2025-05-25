import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span 
            className="fw-bold me-2"
            style={{ color: 'var(--primary)', fontSize: '1.5rem' }}
          >
            DevPoints
          </span>
        </Link>
        
        <div className="d-flex">
          <Link 
            to="/login" 
            className="btn btn-outline-light me-2"
          >
            Entrar
          </Link>
          <Link 
            to="/register" 
            className="btn btn-primary-custom"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;