import React, { useState } from 'react';

const Community = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteTab, setInviteTab] = useState('email');
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteMessage, setInviteMessage] = useState('Join me on CareBridge! Together we can make a real difference in our community by volunteering for urgent needs.');
  const [inviteRole, setInviteRole] = useState('General Volunteer');
  const [invitesSent, setInvitesSent] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const inviteLink = 'https://carebridge.org/join/ref-AD2026X';

  const volunteers = [
    { id: 1, name: 'Maria Chen', role: 'Medical Responder', tasks: 14, rating: 4.9, status: 'active', skills: ['Medical', 'First Aid'], avatar: 'MC', joinedVia: 'Direct' },
    { id: 2, name: 'James Wilson', role: 'Logistics Coordinator', tasks: 22, rating: 4.8, status: 'active', skills: ['Logistics', 'Driving'], avatar: 'JW', joinedVia: 'Referral' },
    { id: 3, name: 'Sarah Park', role: 'Food Services Lead', tasks: 18, rating: 4.7, status: 'active', skills: ['Food', 'Cooking'], avatar: 'SP', joinedVia: 'Direct' },
    { id: 4, name: 'David Kumar', role: 'Education Mentor', tasks: 9, rating: 4.6, status: 'idle', skills: ['Education', 'Teaching'], avatar: 'DK', joinedVia: 'Invite' },
    { id: 5, name: 'Emily Rodriguez', role: 'Emergency Responder', tasks: 31, rating: 5.0, status: 'active', skills: ['Medical', 'Logistics'], avatar: 'ER', joinedVia: 'Referral' },
    { id: 6, name: 'Alex Thompson', role: 'Supply Chain', tasks: 12, rating: 4.5, status: 'idle', skills: ['Logistics', 'General'], avatar: 'AT', joinedVia: 'Invite' },
    { id: 7, name: 'Priya Sharma', role: 'Shelter Coordinator', tasks: 16, rating: 4.8, status: 'active', skills: ['Shelter', 'Housing'], avatar: 'PS', joinedVia: 'Referral' },
    { id: 8, name: 'Tom Baker', role: 'Education Mentor', tasks: 11, rating: 4.7, status: 'active', skills: ['Education', 'Tutoring'], avatar: 'TB', joinedVia: 'Direct' },
  ];

  const topContributors = [...volunteers].sort((a, b) => b.tasks - a.tasks).slice(0, 3);

  const gradientColors = [
    'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    'linear-gradient(135deg, #a16207 0%, #92400e 100%)',
  ];

  const rankEmoji = ['🥇', '🥈', '🥉'];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const handleSendInvites = () => {
    const emails = inviteEmails.split(',').map(e => e.trim()).filter(e => e);
    if (emails.length === 0) return;
    const newInvites = emails.map(email => ({
      email,
      role: inviteRole,
      sentAt: new Date().toLocaleTimeString(),
      status: 'Pending'
    }));
    setInvitesSent(prev => [...newInvites, ...prev]);
    setInviteEmails('');
  };

  const handleShareSocial = (platform) => {
    const text = encodeURIComponent('Join CareBridge and help our community! Volunteer for urgent needs and make a real impact.');
    const url = encodeURIComponent(inviteLink);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </span>
            Community
          </h1>
          <p className="page-subtitle">Meet the volunteers making a difference in our community</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" id="invite-volunteer-btn" onClick={() => setShowInviteModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            Invite Volunteer
          </button>
        </div>
      </div>

      {/* Referral Stats Banner */}
      <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Members', value: volunteers.length, icon: '👥', color: 'var(--primary)' },
          { label: 'Invites Sent', value: invitesSent.length + 12, icon: '📨', color: 'var(--accent)' },
          { label: 'Joined via Referral', value: volunteers.filter(v => v.joinedVia === 'Referral' || v.joinedVia === 'Invite').length, icon: '🔗', color: 'var(--success)' },
          { label: 'Acceptance Rate', value: '78%', icon: '📊', color: 'var(--warning)' },
        ].map((stat, i) => (
          <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="stat-card-icon" style={{ background: `${stat.color}15`, fontSize: '1.25rem' }}>
              {stat.icon}
            </div>
            <div className="stat-card-content">
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-value" style={{ fontSize: '1.5rem' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Contributors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {topContributors.map((vol, i) => (
          <div key={vol.id} className="card animate-slide-up" style={{ animationDelay: `${i * 0.1}s`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: gradientColors[i] }}></div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{rankEmoji[i]}</div>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-gradient)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 0.75rem', color: 'white', fontWeight: 700, fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(var(--primary-rgb), 0.3)'
            }}>{vol.avatar}</div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{vol.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{vol.role}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.8rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{vol.tasks}</div>
                <div style={{ color: 'var(--text-muted)' }}>Tasks</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>⭐ {vol.rating}</div>
                <div style={{ color: 'var(--text-muted)' }}>Rating</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Volunteers Table */}
      <div className="section-card animate-fade-in delay-2">
        <div className="section-card-header">
          <div className="section-card-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            All Volunteers
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{volunteers.length} members</span>
        </div>
        <div className="section-card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Volunteer</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Tasks Completed</th>
                <th>Rating</th>
                <th>Joined Via</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(vol => (
                <tr key={vol.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.7rem'
                      }}>{vol.avatar}</div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{vol.name}</span>
                    </div>
                  </td>
                  <td>{vol.role}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {vol.skills.map(s => <span key={s} className="badge badge-info" style={{ fontSize: '0.65rem' }}>{s}</span>)}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{vol.tasks}</td>
                  <td>
                    <span style={{ color: 'var(--warning)' }}>⭐</span> {vol.rating}
                  </td>
                  <td>
                    <span className={`badge ${vol.joinedVia === 'Referral' ? 'badge-accent' : vol.joinedVia === 'Invite' ? 'badge-primary' : 'badge-info'}`} style={{ fontSize: '0.65rem' }}>
                      {vol.joinedVia}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span className={`status-dot ${vol.status === 'active' ? 'status-dot-success' : 'status-dot-warning'}`}></span>
                      <span style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{vol.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          INVITE VOLUNTEER MODAL
          ═══════════════════════════════════════════ */}
      {showInviteModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowInviteModal(false); }}
        >
          <div
            className="glass-panel"
            style={{
              width: '580px', maxHeight: '90vh', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              animation: 'slideUp 0.3s var(--ease-spring)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--surface-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Invite Volunteers</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Grow your community impact</p>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-xs)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', cursor: 'pointer', border: 'none',
                  background: 'transparent', transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--surface-2)'; e.target.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-muted)'; }}
                id="close-invite-modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Tabs */}
            <div style={{
              display: 'flex', padding: '0 1.5rem', borderBottom: '1px solid var(--surface-border)',
              gap: '0'
            }}>
              {[
                { id: 'email', label: 'Email Invite', icon: '📧' },
                { id: 'link', label: 'Share Link', icon: '🔗' },
                { id: 'social', label: 'Social', icon: '📱' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setInviteTab(tab.id)}
                  style={{
                    padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 600,
                    color: inviteTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: inviteTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                    background: 'transparent', cursor: 'pointer', border: 'none',
                    borderBottomStyle: 'solid',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.375rem'
                  }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              {/* Email Invite Tab */}
              {inviteTab === 'email' && (
                <div>
                  <div className="form-group">
                    <label htmlFor="invite-emails">Email Addresses</label>
                    <textarea
                      id="invite-emails"
                      rows="3"
                      placeholder="Enter email addresses separated by commas...&#10;e.g. alice@example.com, bob@example.com"
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="invite-role">Assign Role</label>
                      <select
                        id="invite-role"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                      >
                        <option value="General Volunteer">General Volunteer</option>
                        <option value="Medical Responder">Medical Responder</option>
                        <option value="Food Services">Food Services</option>
                        <option value="Logistics Coordinator">Logistics Coordinator</option>
                        <option value="Shelter Coordinator">Shelter Coordinator</option>
                        <option value="Education Mentor">Education Mentor</option>
                        <option value="Emergency Responder">Emergency Responder</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="invite-message">Personal Message</label>
                    <textarea
                      id="invite-message"
                      rows="3"
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.75rem' }}
                    onClick={handleSendInvites}
                    id="send-invites-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Send Invitations
                  </button>

                  {/* Sent Invites List */}
                  {invitesSent.length > 0 && (
                    <div style={{ marginTop: '1.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                        Recently Sent ({invitesSent.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {invitesSent.slice(0, 5).map((inv, i) => (
                          <div key={i} className="card-flat" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 0.875rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                              <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                background: 'var(--primary-light)', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 700
                              }}>{inv.email[0].toUpperCase()}</div>
                              <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{inv.email}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{inv.role} • Sent at {inv.sentAt}</div>
                              </div>
                            </div>
                            <span className="badge badge-urgent" style={{ fontSize: '0.6rem' }}>{inv.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Share Link Tab */}
              {inviteTab === 'link' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'var(--primary-light)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.75rem'
                    }}>🔗</div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Your Unique Invite Link</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Anyone with this link can join and be connected to your team</p>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'var(--surface-2)', border: '1px solid var(--surface-border)',
                    borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', marginBottom: '1rem'
                  }}>
                    <input
                      type="text"
                      value={inviteLink}
                      readOnly
                      style={{
                        background: 'transparent', border: 'none', flex: 1,
                        fontSize: '0.85rem', color: 'var(--primary-hover)', fontWeight: 500,
                        padding: 0
                      }}
                      onClick={(e) => e.target.select()}
                      id="invite-link-input"
                    />
                    <button
                      className={`btn btn-sm ${copySuccess ? 'btn-success' : 'btn-primary'}`}
                      onClick={handleCopyLink}
                      style={{ flexShrink: 0, transition: 'all 0.2s' }}
                      id="copy-link-btn"
                    >
                      {copySuccess ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <div className="card-flat" style={{ background: 'var(--info-light)', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.625rem' }}>
                      <span style={{ fontSize: '1rem' }}>💡</span>
                      <div>
                        <h4 style={{ fontSize: '0.8rem', marginBottom: '0.125rem' }}>Pro Tip</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                          Share this link in group chats, email signatures, or community forums to attract more volunteers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR-style visual placeholder */}
                  <div style={{
                    textAlign: 'center', padding: '1.5rem',
                    background: 'var(--surface-2)', borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--surface-border-hover)'
                  }}>
                    <div style={{
                      width: '120px', height: '120px', margin: '0 auto 0.75rem',
                      background: 'white', borderRadius: 'var(--radius-sm)',
                      display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gridTemplateRows: 'repeat(8, 1fr)',
                      gap: '1px', padding: '8px', overflow: 'hidden'
                    }}>
                      {/* Simulated QR Code pattern */}
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} style={{
                          background: [0,1,2,5,6,7,8,15,16,23,24,31,32,39,40,47,48,55,56,57,58,61,62,63,
                            9,10,11,20,27,34,41,42,43,44,13,14,18,19,25,26,33,50,51,52].includes(i)
                            ? '#1e293b' : 'transparent',
                          borderRadius: '1px'
                        }}></div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Scan to join CareBridge</p>
                  </div>
                </div>
              )}

              {/* Social Share Tab */}
              {inviteTab === 'social' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'var(--accent-light)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.75rem'
                    }}>📱</div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Share on Social Media</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Spread the word and recruit volunteers from your network</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {[
                      { platform: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25D366', bg: 'rgba(37, 211, 102, 0.1)' },
                      { platform: 'twitter', name: 'Twitter / X', icon: '🐦', color: '#1DA1F2', bg: 'rgba(29, 161, 242, 0.1)' },
                      { platform: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', bg: 'rgba(10, 102, 194, 0.1)' },
                      { platform: 'facebook', name: 'Facebook', icon: '👤', color: '#1877F2', bg: 'rgba(24, 119, 242, 0.1)' },
                    ].map(social => (
                      <button
                        key={social.platform}
                        onClick={() => handleShareSocial(social.platform)}
                        id={`share-${social.platform}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '1rem', borderRadius: 'var(--radius-md)',
                          background: social.bg, border: `1px solid ${social.color}25`,
                          cursor: 'pointer', transition: 'all 0.2s',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 16px ${social.color}30`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{social.name}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Share invite</div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* Share Preview */}
                  <div style={{ marginTop: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                      Share Preview
                    </div>
                    <div className="card-flat" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{
                          width: '48px', height: '48px', borderRadius: 'var(--radius-xs)',
                          background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="white"/>
                          </svg>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.85rem', marginBottom: '0.125rem' }}>Join CareBridge Community</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                            Help your community by volunteering for urgent needs. Powered by ML-driven priority matching.
                          </p>
                          <span style={{ fontSize: '0.65rem', color: 'var(--primary-hover)' }}>carebridge.org</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
