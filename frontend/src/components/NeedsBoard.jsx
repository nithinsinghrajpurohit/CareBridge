import React from 'react';
import MapContainer from './MapContainer';

const NeedsBoard = ({ needs }) => {
  // Sort needs by ML predicted urgency: High first, then Medium, Low
  const urgencyWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
  
  const sortedNeeds = [...needs].sort((a, b) => 
    (urgencyWeight[b.urgency] || 0) - (urgencyWeight[a.urgency] || 0)
  );

  const getUrgencyBadge = (urgency) => {
    const clsList = {
      'High': 'badge-critical',
      'Medium': 'badge-urgent',
      'Low': 'badge-normal'
    };
    return <span className={`badge ${clsList[urgency] || 'badge-info'}`}>{urgency} Priority</span>;
  };

  return (
    <div className="dashboard-split">
      <MapContainer needs={needs} />
      
      <div className="grid-cards" style={{ marginTop: '1rem' }}>
        {sortedNeeds.map(need => (
          <div key={need.id} className="card need-card glass-panel" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '4px', background: need.urgency === 'High' ? 'var(--danger)' : need.urgency === 'Medium' ? 'var(--warning)' : 'var(--success)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <span className="badge badge-info">{need.category}</span>
              {getUrgencyBadge(need.urgency)}
            </div>
            
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{need.title}</h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {need.location}
            </p>
            
            <p style={{ fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              {need.description}
            </p>

            <button className="btn btn-secondary" style={{ width: '100%' }}>
               Mark as Addressed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedsBoard;
