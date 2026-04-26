import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useThemeContext';

/* ── Quick-search data ───────────────────────────────── */
const SEARCH_INDEX = [
  { label: 'Dashboard', path: '/dashboard', icon: '🏠', type: 'Page' },
  { label: 'Needs Board', path: '/needs', icon: '📋', type: 'Page' },
  { label: 'Report a Need', path: '/report', icon: '✏️', type: 'Page' },
  { label: 'My Reports', path: '/my-reports', icon: '📁', type: 'Page' },
  { label: 'Volunteer Hub', path: '/volunteers', icon: '👥', type: 'Page' },
  { label: 'Analytics', path: '/analytics', icon: '📊', type: 'Page' },
  { label: 'Community', path: '/community', icon: '🌐', type: 'Page' },
  { label: 'Notifications', path: '/notifications', icon: '🔔', type: 'Page' },
  { label: 'Help & Support', path: '/support', icon: '❓', type: 'Page' },
  { label: 'Settings', path: '/settings', icon: '⚙️', type: 'Page' },
  { label: 'Profile', path: '/profile', icon: '👤', type: 'Page' },
  { label: 'Appearance Settings', path: '/settings', icon: '🎨', type: 'Settings' },
  { label: 'Notification Preferences', path: '/settings', icon: '🔔', type: 'Settings' },
  { label: 'ML Engine Config', path: '/settings', icon: '🤖', type: 'Settings' },
  { label: 'Medical Needs', path: '/needs', icon: '🏥', type: 'Category' },
  { label: 'Food & Nutrition Needs', path: '/needs', icon: '🍲', type: 'Category' },
  { label: 'Shelter & Housing', path: '/needs', icon: '🏠', type: 'Category' },
  { label: 'Education & Learning', path: '/needs', icon: '📚', type: 'Category' },
  { label: 'Logistics & Transport', path: '/needs', icon: '🚛', type: 'Category' },
  { label: 'My Location', path: '/needs', icon: '📍', type: 'Action' },
  { label: 'Nearby Recommendations', path: '/needs', icon: '🎯', type: 'Action' },
  { label: 'Dark / Light Mode', path: '/settings', icon: '🌙', type: 'Action' },
  { label: 'Invite Members', path: '/community', icon: '✉️', type: 'Action' },
];

const Layout = ({ role, children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* Search state */
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const searchResults = searchQuery.trim().length > 0
    ? SEARCH_INDEX.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 7)
    : SEARCH_INDEX.filter(i => i.type === 'Page').slice(0, 6);

  /* Close search dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ⌘K shortcut */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setSearchFocused(true);
      }
      if (e.key === 'Escape') setSearchFocused(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSearchSelect = (item) => {
    navigate(item.path);
    setSearchQuery('');
    setSearchFocused(false);
  };

  const getPageTitle = () => {
    const map = {
      '/': 'Dashboard', '/dashboard': 'Dashboard', '/needs': 'Needs Board',
      '/report': 'Report a Need', '/volunteers': 'Volunteer Hub',
      '/analytics': 'Analytics', '/community': 'Community',
      '/notifications': 'Notifications', '/support': 'Help & Support',
      '/settings': 'Settings', '/my-reports': 'My Reports',
      '/profile': 'Profile',
    };
    return map[location.pathname] || 'Dashboard';
  };

  const adminNavItems = [
    {
      label: 'COMMAND CENTER',
      items: [
        { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { to: '/needs', icon: 'needs', label: 'Needs Board' },
        { to: '/report', icon: 'report', label: 'Report a Need' },
        { to: '/my-reports', icon: 'myreports', label: 'My Reports' },
        { to: '/volunteers', icon: 'volunteers', label: 'Volunteer Hub' },
      ]
    },
    {
      label: 'INSIGHTS',
      items: [
        { to: '/analytics', icon: 'analytics', label: 'Analytics' },
        { to: '/community', icon: 'community', label: 'Community' },
        { to: '/notifications', icon: 'notifications', label: 'Notifications', badge: '3' },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { to: '/profile', icon: 'profile', label: 'My Profile' },
        { to: '/support', icon: 'support', label: 'Help & Support' },
        { to: '/settings', icon: 'settings', label: 'Settings' },
      ]
    }
  ];

  const volunteerNavItems = [
    {
      label: 'FIELD OPERATIONS',
      items: [
        { to: '/volunteers', icon: 'volunteers', label: 'Mission Board' },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { to: '/profile', icon: 'profile', label: 'My Profile' },
        { to: '/notifications', icon: 'notifications', label: 'Alerts', badge: '1' },
        { to: '/settings', icon: 'settings', label: 'Preferences' },
        { to: '/support', icon: 'support', label: 'Support' },
      ]
    }
  ];

  const navItems = role === 'volunteer' ? volunteerNavItems : adminNavItems;

  const icons = {
    dashboard: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>),
    needs: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>),
    report: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>),
    volunteers: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>),
    analytics: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>),
    community: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>),
    notifications: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>),
    support: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>),
    settings: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>),
    myreports: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>),
    profile: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>),
  };

  const typeBadgeColor = { Page: 'var(--primary)', Settings: 'var(--accent)', Category: 'var(--success)', Action: 'var(--warning)' };

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* ─── SIDEBAR ─── */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <NavLink to="/dashboard" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="white"/>
            </svg>
          </div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">CareBridge</span>
            <span className="sidebar-logo-tagline">Resource Intelligence</span>
          </div>
        </NavLink>

        <nav className="sidebar-nav">
          {navItems.map((section, sIdx) => (
            <React.Fragment key={sIdx}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map(item => (
                <NavLink
                  key={item.to} to={item.to}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  id={`nav-${item.icon}`}
                  onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                >
                  <span className="nav-item-icon">{icons[item.icon]}</span>
                  {item.label}
                  {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                </NavLink>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-user-card" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
            <div className="sidebar-avatar">{role === 'admin' ? 'AD' : 'VN'}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{role === 'admin' ? 'Active Dispatch' : 'Volunteer Node'}</div>
              <div className="sidebar-user-role">{role === 'admin' ? 'City Operations' : 'Field Agent'}</div>
            </div>
            <button className="sidebar-logout-btn" onClick={onLogout} title="Sign out" id="logout-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN WRAPPER ─── */}
      <div className="main-wrapper">
        <header className="top-header">
          <div className="top-header-left">
            {/* Hamburger */}
            <button className="header-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} id="menu-toggle-btn" title="Toggle Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {sidebarOpen ? (<><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>) : (<><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="15" y2="12"></line><line x1="3" y1="18" x2="18" y2="18"></line></>)}
              </svg>
            </button>

            {/* Brand */}
            <div className="header-brand">
              <div className="header-brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="white"/>
                </svg>
              </div>
              <span className="header-brand-name">Care<span className="header-brand-highlight">Bridge</span></span>
              <span className="header-brand-divider">|</span>
              <span className="header-brand-page">{getPageTitle()}</span>
            </div>
          </div>

          <div className="top-header-right">
            {/* ─── Advanced Search Bar ─── */}
            <div className="search-bar-wrapper" ref={searchRef}>
              <div className={`search-bar ${searchFocused ? 'search-bar-active' : ''}`}>
                <span className="search-bar-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, needs, settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  id="global-search"
                  autoComplete="off"
                />
                {searchQuery ? (
                  <button
                    className="search-clear-btn"
                    onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                ) : (
                  <span className="search-shortcut">⌘K</span>
                )}
              </div>

              {/* Dropdown Results */}
              {searchFocused && (
                <div className="search-dropdown">
                  <div className="search-dropdown-header">
                    {searchQuery ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"` : 'Quick Navigation'}
                  </div>
                  {searchResults.length > 0 ? (
                    searchResults.map((item, i) => (
                      <button
                        key={i}
                        className="search-result-item"
                        onClick={() => handleSearchSelect(item)}
                      >
                        <span className="search-result-icon">{item.icon}</span>
                        <span className="search-result-label">{item.label}</span>
                        <span className="search-result-type" style={{ background: `${typeBadgeColor[item.type]}18`, color: typeBadgeColor[item.type] }}>
                          {item.type}
                        </span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.3, marginLeft: 'auto' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    ))
                  ) : (
                    <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      No results for "{searchQuery}"
                    </div>
                  )}
                  <div className="search-dropdown-footer">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>Esc Close</span>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button className="header-icon-btn" id="theme-toggle-btn" title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'} onClick={toggleTheme}>
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* Notifications */}
            <button className="header-icon-btn" id="notifications-btn" title="Notifications" onClick={() => navigate('/notifications')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-dot"></span>
            </button>

            {/* Help */}
            <button className="header-icon-btn" id="help-btn" title="Help & Support" onClick={() => navigate('/support')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
          </div>
        </header>

        <main className="page-content">
          <div className="page-content-inner">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
