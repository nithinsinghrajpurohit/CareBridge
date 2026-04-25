import React, { useState } from 'react';

const VolunteerMatcher = ({ needs }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [claimedTasks, setClaimedTasks] = useState([]);

  // Get unique categories and add 'All'
  const categories = ['All', ...new Set(needs.map(n => n.category))];

  // Filter out claimed tasks and apply category filter
  const actionableNeeds = needs.filter(n => {
    const isUnclaimed = !claimedTasks.includes(n.id);
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return isUnclaimed && matchesCategory;
  });

  const handleClaimTask = (id) => {
    setClaimedTasks([...claimedTasks, id]);
  };

  return (
    <div>
      <div className="card glass-panel" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Filter by your skill/category:</h3>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: 'auto', minWidth: '200px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {actionableNeeds.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', background: 'var(--success-light)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
            color: 'var(--success)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>All Caught Up!</h2>
          <p>You've matched all available tasks in this area. Thank you for your impact!</p>
        </div>
      ) : (
        <div className="grid-cards">
          {actionableNeeds.map(need => (
            <div key={need.id} className="card glass-panel" style={{ borderTop: `4px solid ${need.urgency === 'High' ? 'var(--danger)' : need.urgency === 'Medium' ? 'var(--warning)' : 'var(--success)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge badge-info">{need.category}</span>
                <span style={{ fontSize: '0.8rem', color: need.urgency === 'High' ? 'var(--danger)' : 'var(--text-muted)', fontWeight: 'bold' }}>{need.urgency} Priority</span>
              </div>
              
              <h3 style={{ marginBottom: '0.75rem', fontSize:'1.25rem' }}>{need.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {need.location}
              </p>
              
              <p style={{ fontSize: '0.95rem', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>
                {need.description}
              </p>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => handleClaimTask(need.id)}
              >
                Volunteer for Task
              </button>
            </div>
          ))}
        </div>
      )}

      {claimedTasks.length > 0 && (
        <div className="card glass-panel" style={{ marginTop: '3rem', background: 'var(--success-light)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <h3 style={{ color: 'var(--success)', marginBottom: '0.75rem', display:'flex', alignItems:'center', gap:'8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Your Impact
          </h3>
          <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>
            You have pledged to help with <strong>{claimedTasks.length}</strong> community {claimedTasks.length === 1 ? 'need' : 'needs'}. The community thanks you for your service!
          </p>
        </div>
      )}
    </div>
  );
};

export default VolunteerMatcher;
