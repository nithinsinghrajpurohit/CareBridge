import React, { useState } from 'react';

const Profile = ({ role }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Demo profile data
  const [profile, setProfile] = useState({
    name: role === 'admin' ? 'Nithin Singh' : 'Alex Rivera',
    email: role === 'admin' ? 'nithin@carebridge.org' : 'alex.rivera@volunteer.org',
    phone: '+91 98765 43210',
    location: 'Rajasthan, India',
    bio: role === 'admin'
      ? 'Operations lead coordinating disaster relief and community logistics across the eastern district.'
      : 'Dedicated volunteer with 3 years of experience in medical aid and food distribution.',
    orgName: 'CareBridge Relief Foundation',
    expertise: 'Medical & First Aid',
    availability: 'Weekdays 6PM–10PM, Weekends Full Day',
    missionsCompleted: role === 'admin' ? 142 : 38,
    hoursLogged: role === 'admin' ? 820 : 215,
    teamSize: role === 'admin' ? 47 : null,
    joinDate: 'March 2024',
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="profile-page">
      {/* ─── Header Banner ─── */}
      <div className="profile-banner">
        <div className="profile-banner-bg"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-large">
            <span>{initials}</span>
            <div className="avatar-status-ring"></div>
          </div>
          <div className="profile-header-info">
            <div className="profile-name-row">
              <h1>{profile.name}</h1>
              <span className={`profile-role-badge ${role === 'admin' ? 'badge-operator' : 'badge-volunteer'}`}>
                {role === 'admin' ? '🛡️ Operator' : '🤝 Volunteer'}
              </span>
            </div>
            <p className="profile-bio">{profile.bio}</p>
            <div className="profile-meta-row">
              <span className="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {profile.location}
              </span>
              <span className="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Joined {profile.joinDate}
              </span>
            </div>
          </div>
          <div className="profile-header-actions">
            {!isEditing ? (
              <button className="profile-edit-btn" onClick={handleEdit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Edit Profile
              </button>
            ) : (
              <div className="profile-edit-actions">
                <button className="profile-save-btn" onClick={handleSave}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Save Changes
                </button>
                <button className="profile-cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Stats Row ─── */}
      <div className="profile-stats-row">
        <div className="profile-stat-card">
          <div className="profile-stat-icon" style={{ background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div className="profile-stat-info">
            <div className="profile-stat-value">{profile.missionsCompleted}</div>
            <div className="profile-stat-label">{role === 'admin' ? 'Missions Managed' : 'Missions Completed'}</div>
          </div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-icon" style={{ background: 'rgba(179, 136, 255, 0.1)', color: '#b388ff' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="profile-stat-info">
            <div className="profile-stat-value">{profile.hoursLogged}</div>
            <div className="profile-stat-label">Hours Logged</div>
          </div>
        </div>
        {role === 'admin' && (
          <div className="profile-stat-card">
            <div className="profile-stat-icon" style={{ background: 'rgba(0, 230, 118, 0.1)', color: '#00e676' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="profile-stat-info">
              <div className="profile-stat-value">{profile.teamSize}</div>
              <div className="profile-stat-label">Team Members</div>
            </div>
          </div>
        )}
        <div className="profile-stat-card">
          <div className="profile-stat-icon" style={{ background: 'rgba(255, 234, 0, 0.1)', color: '#ffea00' }}>⭐</div>
          <div className="profile-stat-info">
            <div className="profile-stat-value">4.9</div>
            <div className="profile-stat-label">Rating</div>
          </div>
        </div>
      </div>

      {/* ─── Content Grid ─── */}
      <div className="profile-grid">
        {/* Personal Info */}
        <div className="profile-section-card">
          <div className="profile-section-header">
            <h2>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Personal Information
            </h2>
          </div>
          <div className="profile-section-body">
            <div className="profile-field">
              <label>Full Name</label>
              {isEditing ? (
                <input type="text" value={editData.name} onChange={(e) => handleChange('name', e.target.value)} />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
            <div className="profile-field">
              <label>Email Address</label>
              {isEditing ? (
                <input type="email" value={editData.email} onChange={(e) => handleChange('email', e.target.value)} />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
            <div className="profile-field">
              <label>Phone Number</label>
              {isEditing ? (
                <input type="tel" value={editData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>
            <div className="profile-field">
              <label>Location</label>
              {isEditing ? (
                <input type="text" value={editData.location} onChange={(e) => handleChange('location', e.target.value)} />
              ) : (
                <p>{profile.location}</p>
              )}
            </div>
            <div className="profile-field full-width">
              <label>Bio</label>
              {isEditing ? (
                <textarea value={editData.bio} onChange={(e) => handleChange('bio', e.target.value)} rows={3} />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Role-Specific Info */}
        <div className="profile-section-card">
          <div className="profile-section-header">
            <h2>
              {role === 'admin' ? (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> Organization Details</>
              ) : (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Skills & Availability</>
              )}
            </h2>
          </div>
          <div className="profile-section-body">
            {role === 'admin' ? (
              <>
                <div className="profile-field">
                  <label>Organization Name</label>
                  {isEditing ? (
                    <input type="text" value={editData.orgName} onChange={(e) => handleChange('orgName', e.target.value)} />
                  ) : (
                    <p>{profile.orgName}</p>
                  )}
                </div>
                <div className="profile-field">
                  <label>Role</label>
                  <p>Operations Lead</p>
                </div>
                <div className="profile-field">
                  <label>Coverage Area</label>
                  {isEditing ? (
                    <input type="text" value={editData.location} onChange={(e) => handleChange('location', e.target.value)} />
                  ) : (
                    <p>{profile.location}</p>
                  )}
                </div>
                <div className="profile-field">
                  <label>Active Since</label>
                  <p>{profile.joinDate}</p>
                </div>
              </>
            ) : (
              <>
                <div className="profile-field">
                  <label>Primary Expertise</label>
                  {isEditing ? (
                    <select value={editData.expertise} onChange={(e) => handleChange('expertise', e.target.value)}>
                      <option>Medical & First Aid</option>
                      <option>Logistics & Transport</option>
                      <option>Food Distribution</option>
                      <option>Shelter & Housing</option>
                      <option>Education & Tutoring</option>
                      <option>Tech & Communications</option>
                      <option>General Volunteer</option>
                    </select>
                  ) : (
                    <p>🏥 {profile.expertise}</p>
                  )}
                </div>
                <div className="profile-field">
                  <label>Availability</label>
                  {isEditing ? (
                    <input type="text" value={editData.availability} onChange={(e) => handleChange('availability', e.target.value)} />
                  ) : (
                    <p>{profile.availability}</p>
                  )}
                </div>
                <div className="profile-field">
                  <label>Certifications</label>
                  <div className="profile-tags">
                    <span className="profile-tag">CPR Certified</span>
                    <span className="profile-tag">First Aid Level 2</span>
                    <span className="profile-tag">Disaster Response</span>
                  </div>
                </div>
                <div className="profile-field">
                  <label>Preferred Radius</label>
                  <p>15 km from home location</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── Recent Activity ─── */}
      <div className="profile-section-card" style={{ marginTop: '1.5rem' }}>
        <div className="profile-section-header">
          <h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Recent Activity
          </h2>
        </div>
        <div className="profile-section-body">
          <div className="profile-activity-list">
            {[
              { action: 'Completed mission', detail: 'Medical supplies to Block C', time: '2 hours ago', color: '#00e676' },
              { action: 'Updated availability', detail: 'Set to available for weekends', time: '1 day ago', color: '#00e5ff' },
              { action: 'Joined community', detail: 'Eastern District Response Team', time: '3 days ago', color: '#b388ff' },
              { action: 'Earned badge', detail: '⭐ Top Responder — April 2026', time: '1 week ago', color: '#ffea00' },
            ].map((item, i) => (
              <div className="profile-activity-item" key={i}>
                <div className="activity-dot" style={{ background: item.color }}></div>
                <div className="activity-content">
                  <p className="activity-action">{item.action}</p>
                  <p className="activity-detail">{item.detail}</p>
                </div>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
