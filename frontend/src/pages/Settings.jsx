import React, { useState } from 'react';
import { useTheme } from '../hooks/useThemeContext';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    orgName: 'CareBridge Operations',
    orgEmail: 'ops@carebridge.org',
    notifications: true,
    emailAlerts: true,
    soundAlerts: false,
    autoAssign: true,
    mlConfidence: 75,
  });

  const sections = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'ml-engine', label: 'ML Engine', icon: '🤖' },
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Reusable toggle component
  const Toggle = ({ isOn, onToggle }) => (
    <button
      onClick={onToggle}
      style={{
        width: '44px', height: '24px', borderRadius: '12px',
        background: isOn ? 'var(--primary)' : 'var(--surface-3)',
        position: 'relative', transition: 'background var(--duration-normal)',
        cursor: 'pointer', border: 'none', flexShrink: 0
      }}
    >
      <span style={{
        position: 'absolute', top: '2px',
        left: isOn ? '22px' : '2px',
        width: '20px', height: '20px', borderRadius: '50%',
        background: 'white', transition: 'left var(--duration-normal) var(--ease-spring)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }}></span>
    </button>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </span>
            Settings
          </h1>
          <p className="page-subtitle">Configure your workspace, appearance, notifications, and ML engine parameters</p>
        </div>
      </div>

      {/* Settings Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }}>
        {/* Settings Nav */}
        <div className="animate-fade-in">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                id={`settings-${section.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-sm)',
                  background: activeSection === section.id ? 'var(--primary-light)' : 'transparent',
                  color: activeSection === section.id ? 'var(--primary-hover)' : 'var(--text-muted)',
                  fontWeight: activeSection === section.id ? 600 : 500,
                  fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left',
                  border: activeSection === section.id ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid transparent',
                  transition: 'all var(--duration-normal) var(--ease-smooth)',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="section-card animate-fade-in delay-1">

          {/* ═══ GENERAL ═══ */}
          {activeSection === 'general' && (
            <>
              <div className="section-card-header">
                <div className="section-card-title">General Settings</div>
              </div>
              <div className="section-card-body">
                <div className="form-group">
                  <label htmlFor="org-name">Organization Name</label>
                  <input id="org-name" type="text" value={settings.orgName} onChange={(e) => updateSetting('orgName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="org-email">Contact Email</label>
                  <input id="org-email" type="email" value={settings.orgEmail} onChange={(e) => updateSetting('orgEmail', e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* ═══ APPEARANCE ═══ */}
          {activeSection === 'appearance' && (
            <>
              <div className="section-card-header">
                <div className="section-card-title">Appearance</div>
              </div>
              <div className="section-card-body">
                {/* Theme Mode Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                    Theme Mode
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {/* Light Mode Card */}
                    <button
                      onClick={() => { if (isDark) toggleTheme(); }}
                      id="theme-light-btn"
                      style={{
                        padding: '1.25rem', borderRadius: 'var(--radius-md)',
                        border: !isDark ? '2px solid var(--primary)' : '2px solid var(--surface-border)',
                        background: !isDark ? 'var(--primary-light)' : 'var(--surface-2)',
                        cursor: 'pointer', textAlign: 'center',
                        transition: 'all 0.2s var(--ease-smooth)',
                        position: 'relative', overflow: 'hidden'
                      }}
                    >
                      {!isDark && (
                        <div style={{
                          position: 'absolute', top: '8px', right: '8px',
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: 'var(--primary)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      )}
                      {/* Light mode preview */}
                      <div style={{
                        width: '100%', height: '60px', borderRadius: 'var(--radius-xs)',
                        background: '#f8fafc', border: '1px solid #e2e8f0',
                        marginBottom: '0.75rem', display: 'flex', overflow: 'hidden'
                      }}>
                        <div style={{ width: '25%', background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '6px' }}>
                          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px' }}></div>
                          <div style={{ width: '70%', height: '3px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '3px' }}></div>
                          <div style={{ width: '70%', height: '3px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '3px' }}></div>
                          <div style={{ width: '70%', height: '3px', background: '#e2e8f0', borderRadius: '2px' }}></div>
                        </div>
                        <div style={{ flex: 1, padding: '6px' }}>
                          <div style={{ width: '60%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '6px' }}></div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ flex: 1, height: '20px', background: '#e2e8f0', borderRadius: '3px' }}></div>
                            <div style={{ flex: 1, height: '20px', background: '#e2e8f0', borderRadius: '3px' }}></div>
                            <div style={{ flex: 1, height: '20px', background: '#e2e8f0', borderRadius: '3px' }}></div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={!isDark ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="2">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: !isDark ? 'var(--primary)' : 'var(--text-muted)' }}>Light</span>
                      </div>
                    </button>

                    {/* Dark Mode Card */}
                    <button
                      onClick={() => { if (!isDark) toggleTheme(); }}
                      id="theme-dark-btn"
                      style={{
                        padding: '1.25rem', borderRadius: 'var(--radius-md)',
                        border: isDark ? '2px solid var(--primary)' : '2px solid var(--surface-border)',
                        background: isDark ? 'var(--primary-light)' : 'var(--surface-2)',
                        cursor: 'pointer', textAlign: 'center',
                        transition: 'all 0.2s var(--ease-smooth)',
                        position: 'relative', overflow: 'hidden'
                      }}
                    >
                      {isDark && (
                        <div style={{
                          position: 'absolute', top: '8px', right: '8px',
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: 'var(--primary)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      )}
                      {/* Dark mode preview */}
                      <div style={{
                        width: '100%', height: '60px', borderRadius: 'var(--radius-xs)',
                        background: '#0f172a', border: '1px solid #1e293b',
                        marginBottom: '0.75rem', display: 'flex', overflow: 'hidden'
                      }}>
                        <div style={{ width: '25%', background: '#0f172a', borderRight: '1px solid #1e293b', padding: '6px' }}>
                          <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', marginBottom: '4px' }}></div>
                          <div style={{ width: '70%', height: '3px', background: '#1e293b', borderRadius: '2px', marginBottom: '3px' }}></div>
                          <div style={{ width: '70%', height: '3px', background: '#1e293b', borderRadius: '2px', marginBottom: '3px' }}></div>
                          <div style={{ width: '70%', height: '3px', background: '#1e293b', borderRadius: '2px' }}></div>
                        </div>
                        <div style={{ flex: 1, padding: '6px' }}>
                          <div style={{ width: '60%', height: '4px', background: '#1e293b', borderRadius: '2px', marginBottom: '6px' }}></div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ flex: 1, height: '20px', background: '#1e293b', borderRadius: '3px' }}></div>
                            <div style={{ flex: 1, height: '20px', background: '#1e293b', borderRadius: '3px' }}></div>
                            <div style={{ flex: 1, height: '20px', background: '#1e293b', borderRadius: '3px' }}></div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="2">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isDark ? 'var(--primary)' : 'var(--text-muted)' }}>Dark</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quick toggle row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderTop: '1px solid var(--surface-border)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dark Mode</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Currently using <strong>{isDark ? 'Dark' : 'Light'}</strong> theme
                    </div>
                  </div>
                  <Toggle isOn={isDark} onToggle={toggleTheme} />
                </div>

                {/* Accent color info */}
                <div className="card-flat" style={{ marginTop: '1rem', background: 'var(--primary-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🎨</span>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Brand Colors</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                        Primary: Indigo (#6366f1) • Accent: Cyan (#06b6d4) • Secondary: Pink (#ec4899)
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {['#6366f1', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                          <div key={c} style={{ width: '24px', height: '24px', borderRadius: '6px', background: c, border: '2px solid rgba(255,255,255,0.1)' }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══ NOTIFICATIONS ═══ */}
          {activeSection === 'notifications' && (
            <>
              <div className="section-card-header">
                <div className="section-card-title">Notification Preferences</div>
              </div>
              <div className="section-card-body">
                {[
                  { key: 'notifications', label: 'Push Notifications', desc: 'Receive browser push notifications for critical needs' },
                  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Get daily digest and critical alerts via email' },
                  { key: 'soundAlerts', label: 'Sound Alerts', desc: 'Play audio notification for incoming critical needs' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--surface-border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                    <Toggle isOn={settings[item.key]} onToggle={() => updateSetting(item.key, !settings[item.key])} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ═══ ML ENGINE ═══ */}
          {activeSection === 'ml-engine' && (
            <>
              <div className="section-card-header">
                <div className="section-card-title">ML Engine Configuration</div>
                <span className="badge badge-accent">Scikit-learn</span>
              </div>
              <div className="section-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--surface-border)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Auto-Assign Priority</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automatically classify urgency using ML predictions</div>
                  </div>
                  <Toggle isOn={settings.autoAssign} onToggle={() => updateSetting('autoAssign', !settings.autoAssign)} />
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Confidence Threshold: {settings.mlConfidence}%</label>
                  <input
                    type="range" min="50" max="99"
                    value={settings.mlConfidence}
                    onChange={(e) => updateSetting('mlConfidence', parseInt(e.target.value))}
                    style={{ background: 'var(--surface-3)', padding: 0, border: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>Conservative (50%)</span>
                    <span>Aggressive (99%)</span>
                  </div>
                </div>

                <div className="card-flat" style={{ marginTop: '1rem', background: 'var(--info-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>💡</span>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Model Info</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                        Using Scikit-learn RandomForest classifier trained on 1,247 historical samples.
                        Last retrained: 2 hours ago. Accuracy: 94.2%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary" id="save-settings-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
