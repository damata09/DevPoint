import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 mt-5" style={{ background: 'var(--darker-bg)' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="mb-3">DevPoints</h5>
            <p className="text-muted small">
              Plataforma de mentoria para desenvolvedores de todos os níveis
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} DevPoints. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;