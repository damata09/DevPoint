import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={styles.container}>
      <h1>Bem-vindo, {user?.username}</h1>
      <p>Seus pontos: {user?.points || 0}</p>
      <div style={styles.cardContainer}>
        {/* Aqui você pode adicionar mais informações */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  }
};

export default Dashboard;