import React, { useState } from 'react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'Critical Need Reported', message: 'Emergency medical supplies urgently needed at Downtown Relief Center. 200+ affected residents.', time: '2 min ago', read: false, icon: '🚨', action: 'View Need' },
    { id: 2, type: 'volunteer', title: 'New Volunteer Joined', message: 'Sarah Park has joined as a Food Services Lead via your referral link. Welcome them to the team!', time: '15 min ago', read: false, icon: '👋', action: 'View Profile' },
    { id: 3, type: 'ml', title: 'ML Priority Updated', message: 'AI engine reclassified "Blankets for shelter" from Low → Medium priority based on weather forecast data.', time: '32 min ago', read: false, icon: '🤖', action: 'Review' },
    { id: 4, type: 'resolved', title: 'Need Resolved', message: '"Hot meals for 150 residents" has been successfully fulfilled by volunteers James Wilson and team.', time: '1 hr ago', read: true, icon: '✅', action: 'Details' },
    { id: 5, type: 'system', title: 'Weekly Report Ready', message: 'Your weekly community impact report is ready. 18 needs resolved, 24 active volunteers, 87% resolution rate.', time: '2 hr ago', read: true, icon: '📊', action: 'View Report' },
    { id: 6, type: 'volunteer', title: 'Volunteer Milestone', message: 'Emily Rodriguez has completed 30 tasks! She\'s now your all-time top contributor. Consider recognition.', time: '3 hr ago', read: true, icon: '🏆', action: 'Celebrate' },
    { id: 7, type: 'critical', title: 'Coverage Gap Detected', message: 'North District has 5 unassigned needs with no active volunteers in the area. Consider outreach.', time: '4 hr ago', read: true, icon: '⚠️', action: 'Assign' },
    { id: 8, type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance completed successfully. ML engine retrained with 150 new data points.', time: '6 hr ago', read: true, icon: '🔧', action: null },
    { id: 9, type: 'ml', title: 'Prediction Insight', message: 'ML engine predicts a 40% increase in logistics needs this weekend based on historical patterns.', time: '8 hr ago', read: true, icon: '📈', action: 'Prepare' },
    { id: 10, type: 'volunteer', title: 'Invite Accepted', message: 'David Kumar accepted your invitation and completed onboarding. He\'s ready to start volunteering.', time: '1 day ago', read: true, icon: '🎉', action: 'Assign Tasks' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeColor = (type) => {
    const map = {
      critical: 'var(--danger)',
      volunteer: 'var(--success)',
      ml: 'var(--primary)',
      resolved: 'var(--accent)',
      system: 'var(--text-muted)',
    };
    return map[type] || 'var(--text-muted)';
  };

  const getTypeBg = (type) => {
    const map = {
      critical: 'var(--danger-light)',
      volunteer: 'var(--success-light)',
      ml: 'var(--primary-light)',
      resolved: 'var(--accent-light)',
      system: 'var(--surface-2)',
    };
    return map[type] || 'var(--surface-2)';
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </span>
            Notifications
            {unreadCount > 0 && (
              <span style={{
                background: 'var(--danger)', color: 'white', fontSize: '0.7rem', fontWeight: 700,
                padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', marginLeft: '0.25rem'
              }}>{unreadCount} new</span>
            )}
          </h1>
          <p className="page-subtitle">Stay updated on critical needs, volunteer activity, and ML engine insights</p>
        </div>
        <div className="page-header-actions">
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={markAllRead} id="mark-all-read-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="animate-fade-in" style={{
        display: 'flex', gap: '0.375rem', padding: '0.375rem',
        background: 'var(--surface-1)', border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', width: 'fit-content'
      }}>
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'critical', label: '🚨 Critical' },
          { id: 'volunteer', label: '👥 Volunteers' },
          { id: 'ml', label: '🤖 ML Engine' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            id={`notif-filter-${tab.id}`}
            style={{
              padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
              background: filter === tab.id ? 'var(--primary)' : 'transparent',
              color: filter === tab.id ? 'white' : 'var(--text-muted)',
              border: 'none', transition: 'all 0.2s var(--ease-smooth)',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filteredNotifications.length === 0 ? (
          <div className="glass-panel empty-state animate-fade-scale">
            <div className="empty-state-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>All Clear!</h3>
            <p>No notifications match this filter. You're all caught up.</p>
          </div>
        ) : (
          filteredNotifications.map((notif, i) => (
            <div
              key={notif.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 0.04}s`,
                display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                padding: '1rem 1.25rem',
                background: notif.read ? 'var(--surface-1)' : 'rgba(var(--primary-rgb), 0.04)',
                border: `1px solid ${notif.read ? 'var(--surface-border)' : 'rgba(var(--primary-rgb), 0.15)'}`,
                borderRadius: 'var(--radius-md)',
                position: 'relative', cursor: 'pointer',
                transition: 'all 0.2s var(--ease-smooth)',
              }}
              onClick={() => markAsRead(notif.id)}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border-hover)'; e.currentTarget.style.transform = 'translateX(2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = notif.read ? 'var(--surface-border)' : 'rgba(var(--primary-rgb), 0.15)'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              {/* Unread indicator */}
              {!notif.read && (
                <div style={{
                  position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)',
                  width: '4px', height: '40%', borderRadius: '4px',
                  background: 'var(--primary-gradient)'
                }}></div>
              )}

              {/* Icon */}
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                background: getTypeBg(notif.type), display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0
              }}>{notif.icon}</div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: notif.read ? 500 : 700, margin: 0 }}>{notif.title}</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{notif.time}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{notif.message}</p>
                {notif.action && (
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: getTypeColor(notif.type) }}>
                    {notif.action} →
                  </button>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                  title="Dismiss"
                  style={{
                    width: '28px', height: '28px', borderRadius: 'var(--radius-xs)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', cursor: 'pointer', border: 'none',
                    background: 'transparent', transition: 'all 0.15s', opacity: 0.5
                  }}
                  onMouseEnter={(e) => { e.target.style.opacity = '1'; e.target.style.background = 'var(--danger-light)'; e.target.style.color = 'var(--danger)'; }}
                  onMouseLeave={(e) => { e.target.style.opacity = '0.5'; e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-muted)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Settings Shortcut */}
      <div className="card-flat animate-fade-in delay-3" style={{
        marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.1rem' }}>⚙️</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Notification Preferences</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Configure which alerts you receive and how</div>
          </div>
        </div>
        <a href="/settings" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
          Manage Settings →
        </a>
      </div>
    </div>
  );
};

export default Notifications;
