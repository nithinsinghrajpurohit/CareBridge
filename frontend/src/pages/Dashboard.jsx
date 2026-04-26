import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, getDistance, formatDistance } from '../hooks/useLocationContext';

const Dashboard = ({ needs }) => {
  const navigate = useNavigate();
  const { userLocation, locationName, isLocating } = useLocation();

  const totalNeeds = needs.length;
  const criticalNeeds = needs.filter(n => n.urgency === 'High').length;
  const resolvedNeeds = needs.filter(n => n.status === 'resolved').length;
  const activeVolunteers = 24;

  // Enrich needs with distance
  const enrichedNeeds = useMemo(() => {
    if (!userLocation) return needs;
    return needs.map(n => ({
      ...n,
      distance: getDistance(userLocation.lat, userLocation.lng, n.latitude, n.longitude),
    }));
  }, [needs, userLocation]);

  // Top 3 nearest needs for recommendation
  const nearbyNeeds = useMemo(() => {
    return [...enrichedNeeds]
      .filter(n => n.distance != null)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }, [enrichedNeeds]);

  const recentActivity = [
    { id: 1, type: 'critical', user: 'Maria Chen', action: 'reported a critical need', item: 'Medical supplies shortage', time: '2 min ago', icon: '🚨' },
    { id: 2, type: 'success', user: 'James Wilson', action: 'volunteered for', item: 'Food distribution drive', time: '15 min ago', icon: '✋' },
    { id: 3, type: 'info', user: 'ML Engine', action: 'auto-classified', item: '3 new needs as Medium priority', time: '28 min ago', icon: '🤖' },
    { id: 4, type: 'success', user: 'Sarah Park', action: 'resolved', item: 'Shelter bedding request', time: '1 hr ago', icon: '✅' },
    { id: 5, type: 'info', user: 'System', action: 'matched 5 volunteers to', item: 'Logistics support requests', time: '2 hr ago', icon: '🔗' },
  ];

  const urgencyData = [
    { label: 'Critical', count: criticalNeeds, color: 'var(--danger)', pct: totalNeeds ? Math.round((criticalNeeds / Math.max(totalNeeds, 1)) * 100) : 35 },
    { label: 'Medium', count: needs.filter(n => n.urgency === 'Medium').length, color: 'var(--warning)', pct: totalNeeds ? Math.round((needs.filter(n => n.urgency === 'Medium').length / Math.max(totalNeeds, 1)) * 100) : 40 },
    { label: 'Low', count: needs.filter(n => n.urgency === 'Low').length, color: 'var(--success)', pct: totalNeeds ? Math.round((needs.filter(n => n.urgency === 'Low').length / Math.max(totalNeeds, 1)) * 100) : 25 },
  ];

  const displayData = totalNeeds > 0 ? urgencyData : [
    { label: 'Critical', count: 8, color: 'var(--danger)', pct: 35 },
    { label: 'Medium', count: 12, color: 'var(--warning)', pct: 40 },
    { label: 'Low', count: 6, color: 'var(--success)', pct: 25 },
  ];

  const urgencyColors = {
    High: { bg: 'var(--danger-light)', text: 'var(--danger)', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    Medium: { bg: 'var(--warning-light)', text: 'var(--warning)', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    Low: { bg: 'var(--success-light)', text: 'var(--success)', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  };

  const categoryIcons = { Medical: '🏥', Food: '🍲', Logistics: '🚛', General: '📦', Shelter: '🏠', Education: '📚' };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                <rect x="3" y="16" width="7" height="5" rx="1"></rect>
              </svg>
            </span>
            Dashboard
          </h1>
          <p className="page-subtitle">
            Real-time overview of community resources, ML predictions, and volunteer activity
            {locationName && (
              <span style={{ marginLeft: '0.5rem', color: 'var(--primary-hover)', fontWeight: 600 }}>
                — 📍 {locationName}
              </span>
            )}
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/analytics')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            View Analytics
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/report')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Report Need
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-stats animate-fade-in" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card" style={{ '--accent-color': 'var(--primary)' }}>
          <div className="stat-card-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Total Needs</div>
            <div className="stat-card-value">{totalNeeds || 26}</div>
            <div className="stat-card-trend up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              +12% this week
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Critical</div>
            <div className="stat-card-value">{criticalNeeds || 8}</div>
            <div className="stat-card-trend down">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
              -3% from yesterday
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Resolved</div>
            <div className="stat-card-value">{resolvedNeeds || 18}</div>
            <div className="stat-card-trend up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              +8% this week
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-label">Active Volunteers</div>
            <div className="stat-card-value">{activeVolunteers}</div>
            <div className="stat-card-trend up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              +5 new today
            </div>
          </div>
        </div>
      </div>

      {/* ═══ NEARBY NEEDS RECOMMENDATION ═══ */}
      {nearbyNeeds.length > 0 && (
        <div className="section-card animate-fade-in" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
          <div className="section-card-header">
            <div className="section-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Needs Near You
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isLocating ? 'Detecting…' : `📍 ${locationName}`}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/needs')}>See All →</button>
            </div>
          </div>
          <div className="section-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {nearbyNeeds.map((need, i) => {
                const colors = urgencyColors[need.urgency] || urgencyColors.Low;
                return (
                  <div
                    key={need.id}
                    style={{
                      background: 'var(--surface-2)', borderRadius: 'var(--radius-md)',
                      padding: '1rem', position: 'relative', overflow: 'hidden',
                      border: '1px solid var(--surface-border)',
                      cursor: 'pointer', transition: 'all 0.2s var(--ease-smooth)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.text; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    onClick={() => navigate('/needs')}
                  >
                    {/* Gradient top bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: colors.gradient }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', marginTop: '0.125rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <span style={{ fontSize: '1rem' }}>{categoryIcons[need.category] || '📦'}</span>
                        <span className="badge" style={{ background: colors.bg, color: colors.text, fontSize: '0.6rem' }}>{need.urgency}</span>
                      </div>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary-hover)',
                        background: 'var(--primary-light)', padding: '0.15rem 0.4rem',
                        borderRadius: 'var(--radius-full)'
                      }}>
                        {formatDistance(need.distance)}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.375rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {need.title}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {need.location}
                    </div>
                    {need.peopleAffected && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        👥 {need.peopleAffected} people affected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
        {/* Left: Urgency Breakdown + Recent Needs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Urgency Breakdown */}
          <div className="section-card animate-fade-in delay-1">
            <div className="section-card-header">
              <div className="section-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                ML Priority Distribution
              </div>
              <span className="badge badge-primary">Live</span>
            </div>
            <div className="section-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {displayData.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.count} needs ({item.pct}%)</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${item.pct}%`, background: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Needs */}
          <div className="section-card animate-fade-in delay-2">
            <div className="section-card-header">
              <div className="section-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Recent Needs
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/needs')}>View All →</button>
            </div>
            <div className="section-card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Need</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Location</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {(enrichedNeeds.length > 0 ? enrichedNeeds.slice(0, 5) : [
                    { id: 1, title: 'Medical supplies needed', category: 'Medical', urgency: 'High', location: 'Downtown Clinic', distance: null },
                    { id: 2, title: '50 blankets for shelter', category: 'Shelter', urgency: 'Medium', location: 'East Side Shelter', distance: null },
                    { id: 3, title: 'Food distribution setup', category: 'Food', urgency: 'High', location: 'Central Park Area', distance: null },
                    { id: 4, title: 'Transport for elderly', category: 'Logistics', urgency: 'Low', location: 'North District', distance: null },
                    { id: 5, title: 'School supplies for children', category: 'Education', urgency: 'Medium', location: 'Westside Family Center', distance: null },
                  ]).map(need => (
                    <tr key={need.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{need.title}</td>
                      <td><span className="badge badge-info">{need.category}</span></td>
                      <td>
                        <span className={`badge ${need.urgency === 'High' ? 'badge-critical' : need.urgency === 'Medium' ? 'badge-urgent' : 'badge-normal'}`}>
                          {need.urgency}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{need.location}</td>
                      <td>
                        {need.distance != null ? (
                          <span style={{ fontSize: '0.72rem', color: 'var(--primary-hover)', fontWeight: 600 }}>
                            📍 {formatDistance(need.distance)}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Activity Feed */}
        <div className="section-card animate-fade-in delay-3" style={{ alignSelf: 'start' }}>
          <div className="section-card-header">
            <div className="section-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Live Activity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span className="status-dot status-dot-success"></span>
              <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 600 }}>LIVE</span>
            </div>
          </div>
          <div className="section-card-body">
            <div className="activity-feed">
              {recentActivity.map((item, i) => (
                <div key={item.id} className="activity-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="activity-icon" style={{
                    background: item.type === 'critical' ? 'var(--danger-light)' :
                                item.type === 'success' ? 'var(--success-light)' : 'var(--primary-light)'
                  }}>
                    {item.icon}
                  </div>
                  <div className="activity-body">
                    <div className="activity-text">
                      <strong>{item.user}</strong> {item.action} <strong>{item.item}</strong>
                    </div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
