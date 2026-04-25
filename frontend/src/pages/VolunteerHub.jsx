import React, { useState } from 'react';
import MapContainer from '../components/MapContainer';
import { useLocation } from '../hooks/useLocationContext';

const VolunteerHub = ({ needs, onVolunteer }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [claimedTasks, setClaimedTasks] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // For showing contact details
  const { userLocation } = useLocation();

  // Demo data enriched with contact details for Hackathon demo
  const displayNeeds = needs.length > 0 ? needs : [
    { id: 1, title: 'Emergency medical kits required', category: 'Medical', urgency: 'High', location: 'Downtown Emergency Center', latitude: 40.7128, longitude: -74.0060, description: 'Urgent need for 200 first-aid kits and basic medical supplies.', postedBy: 'Dr. Sarah Jenkins', contactPhone: '+1-555-0198', contactEmail: 's.jenkins@downtownmed.org' },
    { id: 2, title: 'Hot meals for 150 residents', category: 'Food', urgency: 'High', location: 'Eastside Community Hall', latitude: 40.7282, longitude: -73.9942, description: 'Daily hot meal service needed for elderly and disabled residents.', postedBy: 'Community Kitchen NYC', contactPhone: '+1-555-0221', contactEmail: 'help@communitykitchen.org' },
    { id: 3, title: 'Blankets and sleeping bags', category: 'General', urgency: 'Medium', location: 'North Shelter Complex', latitude: 40.7580, longitude: -73.9855, description: 'Winter supplies needed for overnight shelter accommodating 80 people.', postedBy: 'Mark Rutherford', contactPhone: '+1-555-0453', contactEmail: 'mrutherford@northshelter.org' },
    { id: 4, title: 'Transportation for patients', category: 'Logistics', urgency: 'Medium', location: 'Citywide Area (Multiple)', latitude: 40.7831, longitude: -73.9712, description: 'Regular transport service needed for 12 dialysis patients.', postedBy: 'Citywide Medical Transport', contactPhone: '+1-555-0899', contactEmail: 'dispatch@cwhealth.org' },
    { id: 5, title: 'Children educational materials', category: 'General', urgency: 'Low', location: 'Westside Family Center', latitude: 40.7306, longitude: -74.0021, description: 'Books, art supplies for children at temporary family housing.', postedBy: 'Westside Volunteers', contactPhone: '+1-555-1102', contactEmail: 'info@westsidevolunteers.net' },
  ];

  const categories = ['All', ...new Set(displayNeeds.map(n => n.category))];

  const actionableNeeds = displayNeeds.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesCategory;
  });

  const handleClaimTask = (id) => {
    if (!claimedTasks.includes(id)) {
      setClaimedTasks([...claimedTasks, id]);
    }
    if (onVolunteer) onVolunteer(id);
  };

  const getAccentColor = (urgency) =>
    urgency === 'High' ? 'var(--danger)' : urgency === 'Medium' ? 'var(--warning)' : 'var(--success)';

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            Volunteer Hub
          </h1>
          <p className="page-subtitle">Find tasks matching your specific skill set to create immediate impact</p>
        </div>
        <div className="page-header-actions">
          {claimedTasks.length > 0 && (
            <div className="badge badge-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              ✋ {claimedTasks.length} task{claimedTasks.length > 1 ? 's' : ''} claimed
            </div>
          )}
        </div>
      </div>

      {/* Embedded Map Container */}
      <div className="section-card animate-fade-in delay-1" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div className="section-card-header">
           <div className="section-card-title">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
             Live Mission Map
           </div>
        </div>
        <div style={{ height: '340px' }}>
          <MapContainer needs={actionableNeeds} />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar animate-fade-in">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter by skill:</span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          id="volunteer-filter"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
          ))}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {actionableNeeds.length} available task{actionableNeeds.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Content */}
      {actionableNeeds.length === 0 ? (
        <div className="glass-panel empty-state animate-fade-scale">
          <div className="empty-state-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>All Caught Up!</h3>
          <p>You've matched all available tasks in this category. Thank you for your incredible impact!</p>
        </div>
      ) : (
        <div className="grid-cards">
          {actionableNeeds.map((need, i) => (
            <div
              key={need.id}
              className="card animate-slide-up"
              style={{
                animationDelay: `${i * 0.08}s`,
                borderTop: `3px solid ${getAccentColor(need.urgency)}`
              }}
            >
              <div className="need-card-header">
                <span className="badge badge-info">{need.category}</span>
                <span className={`badge ${need.urgency === 'High' ? 'badge-critical' : need.urgency === 'Medium' ? 'badge-urgent' : 'badge-normal'}`}>
                  {need.urgency}
                </span>
              </div>

              <h3 className="need-card-title">{need.title}</h3>

              <div className="need-card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {need.location}
              </div>

              <p className="need-card-desc">{need.description}</p>

              {/* Responder Details Accordion */}
              <div style={{ marginBottom: '1rem' }}>
                <button 
                  onClick={() => setExpandedCard(expandedCard === need.id ? null : need.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', background: expandedCard === need.id ? 'var(--primary-light)' : 'var(--surface-2)', border: expandedCard === need.id ? '1px solid rgba(var(--primary-rgb),0.2)' : '1px solid var(--surface-border)', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={expandedCard === need.id ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: expandedCard === need.id ? 'var(--primary)' : 'var(--text-secondary)' }}>{need.postedBy}</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={expandedCard === need.id ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="2.5" style={{ transform: expandedCard === need.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>

                {expandedCard === need.id && (
                  <div className="animate-fade-in" style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface-1)', border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contact Information</div>
                    
                    {need.contactPhone && (
                      <a href={`tel:${need.contactPhone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.4rem 0.5rem', borderRadius: '4px', background: 'var(--surface-2)', border: '1px solid var(--surface-border)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{need.contactPhone}</span>
                        <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>Call</span>
                      </a>
                    )}
                    {need.contactEmail && (
                      <a href={`mailto:${need.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.4rem 0.5rem', borderRadius: '4px', background: 'var(--surface-2)', border: '1px solid var(--surface-border)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{need.contactEmail}</span>
                        <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>Gmail</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <button
                className={`btn ${need.volunteered || claimedTasks.includes(need.id) ? 'btn-success' : 'btn-primary'}`}
                style={{ width: '100%', transition: 'all 0.2s' }}
                onClick={() => handleClaimTask(need.id)}
                id={`volunteer-btn-${need.id}`}
                disabled={need.volunteered || claimedTasks.includes(need.id)}
              >
                {need.volunteered || claimedTasks.includes(need.id) ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Volunteered
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Volunteer for this Task
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Impact Banner */}
      {claimedTasks.length > 0 && (
        <div className="impact-banner animate-slide-up">
          <div className="impact-banner-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.125rem' }}>Your Community Impact</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              You've pledged to help with <strong style={{ color: 'var(--text-primary)' }}>{claimedTasks.length}</strong> community {claimedTasks.length === 1 ? 'need' : 'needs'}. The community thanks you!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerHub;
