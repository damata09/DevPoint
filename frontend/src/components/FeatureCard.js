import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="card card-custom h-100">
      <div className="card-body text-center p-4">
        <div 
          className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
          style={{ 
            width: '70px', 
            height: '70px', 
            background: 'rgba(108, 99, 255, 0.1)'
          }}
        >
          <i className={`bi ${icon} fs-3`} style={{ color: 'var(--primary)' }}></i>
        </div>
        <h3 className="h4 mb-3">{title}</h3>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;