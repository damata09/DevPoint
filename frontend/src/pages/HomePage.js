import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Simulando carregamento de dados
    setTimeout(() => {
      setFeatures([
        {
          icon: 'bi-code-slash',
          title: 'Compartilhe Códigos',
          description: 'Poste trechos e receba feedback em tempo real',
          color: '#6c63ff'
        },
        {
          icon: 'bi-lightbulb',
          title: 'Resolva Desafios',
          description: 'Ajude outros desenvolvedores',
          color: '#20c997'
        },
        {
          icon: 'bi-trophy',
          title: 'Ganhe Reconhecimento',
          description: 'Suba no ranking da comunidade',
          color: '#fd7e14'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="home-page" style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Transforme seu <span style={styles.highlight}>código</span> em conhecimento
          </h1>
          <p style={styles.heroSubtitle}>
            Conecte-se com desenvolvedores de todos os níveis e acelere sua evolução
          </p>
          <div style={styles.ctaContainer}>
            <Link 
              to="/register" 
              style={styles.primaryButton}
              className="hover-grow"
            >
              Comece Agora
            </Link>
            <Link 
              to="/login" 
              style={styles.secondaryButton}
              className="hover-grow"
            >
              Já tem conta? Entre
            </Link>
          </div>
        </div>
        <div style={styles.heroIllustration}>
          <div style={styles.codeSnippet}>
            <pre style={styles.code}>
              {`// Seu código ganha vida\nfunction devPoints() {\n  const knowledge = ∞;\n  return { success: true };\n}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Como a plataforma funciona</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{ 
                ...styles.featureCard,
                borderTop: `4px solid ${feature.color}`
              }}
              className="feature-card"
            >
              <div 
                style={{ 
                  ...styles.featureIcon,
                  backgroundColor: `${feature.color}20`
                }}
              >
                <i className={`bi ${feature.icon}`} style={{ color: feature.color, fontSize: '1.5rem' }}></i>
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statItem}>
          <h3 style={styles.statNumber}>1,200+</h3>
          <p style={styles.statLabel}>Desenvolvedores Ativos</p>
        </div>
        <div style={styles.statItem}>
          <h3 style={styles.statNumber}>3,500+</h3>
          <p style={styles.statLabel}>Problemas Resolvidos</p>
        </div>
        <div style={styles.statItem}>
          <h3 style={styles.statNumber}>95%</h3>
          <p style={styles.statLabel}>Taxa de Satisfação</p>
        </div>
      </section>
    </div>
  );
};

// Estilos em objeto JavaScript para melhor performance
const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#ffffff',
    minHeight: '100vh',
    overflowX: 'hidden'
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '0 5%',
    background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)'
  },
  heroContent: {
    flex: 1,
    paddingRight: '40px'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '1.5rem'
  },
  highlight: {
    color: '#6c63ff',
    position: 'relative',
    display: 'inline-block'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#b0b0b0',
    marginBottom: '2rem',
    maxWidth: '600px'
  },
  ctaContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  },
  primaryButton: {
    backgroundColor: '#6c63ff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'transform 0.3s ease'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#6c63ff',
    padding: '12px 24px',
    border: '2px solid #6c63ff',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  },
  // ... (continuar com os outros estilos)
};

export default HomePage;