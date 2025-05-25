import React from 'react';

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Página de Login</h1>
      <div className="card p-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;