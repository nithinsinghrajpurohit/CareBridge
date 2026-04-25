import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation as useGeoLocation } from '../hooks/useLocationContext';

const ReportNeed = ({ onAddNeed, isPredicting }) => {
  const navigate = useNavigate();
  const { userLocation, locationName } = useGeoLocation();
  const [formData, setFormData] = useState({
    title: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    location: '',
    area: '',
    landmark: '',
    pincode: '',
    category: '',
    subCategory: '',
    urgencyHint: 'medium',
    peopleAffected: '',
    description: '',
  });
  const [useMyLocation, setUseMyLocation] = useState(false);

  // Auto-fill location when "Use my location" is toggled
  useEffect(() => {
    if (useMyLocation && locationName) {
      setFormData(prev => ({
        ...prev,
        location: locationName,
        area: locationName.split(',')[0] || '',
      }));
    }
  }, [useMyLocation, locationName]);

  const categories = [
    { value: 'Medical', icon: '🏥', subs: ['First Aid Kits', 'Medications', 'Medical Equipment', 'Blood Donation', 'Mental Health'] },
    { value: 'Food', icon: '🍲', subs: ['Hot Meals', 'Groceries', 'Baby Food', 'Drinking Water', 'Special Diet'] },
    { value: 'Logistics', icon: '🚛', subs: ['Transport', 'Equipment', 'Debris Clearing', 'Communication', 'Fuel'] },
    { value: 'Shelter', icon: '🏠', subs: ['Blankets', 'Tents', 'Clothing', 'Bedding', 'Heating/Cooling'] },
    { value: 'Education', icon: '📚', subs: ['Books', 'School Supplies', 'Tutoring', 'Digital Devices', 'Skill Training'] },
    { value: 'General', icon: '📦', subs: ['Volunteers', 'Coordination', 'Donations', 'Legal Aid', 'Other'] },
  ];

  const selectedCategory = categories.find(c => c.value === formData.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) return;
    onAddNeed({
      ...formData,
      latitude: userLocation?.lat,
      longitude: userLocation?.lng,
    });
    navigate('/needs');
  };

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (isPredicting) {
      const texts = [
        "[0.00s] Initializing Scikit-Learn NLP Pipeline...",
        "[0.42s] Tokenizing descriptive text payload...",
        "[1.05s] Extracting Key Entities [Location, Quantity, Category]...",
        "[1.78s] Loading ML Weights vs Historical Density Vectors...",
        "[2.45s] Assigning Global Urgency Coefficient...",
        "[3.00s] Classification Complete. Broadcasting -> MongoDB."
      ];
      texts.forEach((text, i) => {
        setTimeout(() => setLoadingStep(i), (i * 500));
      });
    } else {
      setLoadingStep(0);
    }
  }, [isPredicting]);

  if (isPredicting) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px' }}>
        <div className="page-header animate-fade-in">
          <div className="page-header-info">
            <h1 className="page-title">
              <span className="page-title-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </span>
              Processing Resource Allocation
            </h1>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top visual processing bars */}
          <div className="section-card animate-slide-up" style={{ padding: '2rem', textAlign: 'center', background: 'var(--glass-bg)', borderColor: 'var(--primary)', boxShadow: 'var(--shadow-glow)' }}>
             <div style={{ 
               width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem',
               border: '4px solid var(--surface-border)', borderTopColor: 'var(--primary)', 
               borderRightColor: 'var(--accent)', animation: 'spin 0.6s linear infinite'
             }}></div>
             <h2 style={{ fontFamily: 'monospace', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
               Neural Analysis Active
             </h2>
             <div style={{ width: '100%', height: '4px', background: 'var(--surface-border)', borderRadius: '2px', overflow: 'hidden', marginTop: '1.5rem' }}>
               <div style={{ height: '100%', background: 'var(--primary-gradient)', width: `${(loadingStep / 5) * 100}%`, transition: 'width 0.5s ease-out' }}></div>
             </div>
          </div>

          {/* Terminal Console */}
          <div className="section-card animate-fade-in delay-2" style={{ 
            flex: 1, background: '#0a0a0a', border: '1px solid var(--surface-border)', 
            padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#00e676',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
          }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
              Terminal — CareBridge ML Node (v2.1)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                "Initializing Scikit-Learn NLP Pipeline...",
                "Tokenizing descriptive text payload...",
                "Extracting Key Entities [Location, Quantity, Category]...",
                "Loading ML Weights vs Historical Density Vectors...",
                "Assigning Global Urgency Coefficient...",
                "Classification Complete. Broadcasting -> MongoDB."
              ].map((text, index) => (
                 <div key={index} style={{ 
                   opacity: loadingStep >= index ? 1 : 0, 
                   transform: loadingStep >= index ? 'translateY(0)' : 'translateY(10px)',
                   transition: 'all 0.3s ease-out',
                   color: index === 4 ? 'var(--warning)' : index === 5 ? 'var(--primary)' : 'inherit'
                 }}>
                   <span style={{ color: '#555', marginRight: '1rem' }}>[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
                   &gt; {text}
                 </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </span>
            Report a Need
          </h1>
          <p className="page-subtitle">Submit a community resource need. Our ML engine will auto-classify urgency.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/needs')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Board
        </button>
      </div>

      {/* Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        {/* Main Form */}
        <div className="section-card animate-fade-in">
          <div className="section-card-header">
            <div className="section-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
              Resource Request Form
            </div>
            <span className="badge badge-accent">ML-Powered</span>
          </div>
          <div className="section-card-body">
            <form onSubmit={handleSubmit}>
              {/* ── Title ── */}
              <div className="form-group">
                <label htmlFor="need-title">Need Title <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input
                  id="need-title" type="text"
                  placeholder="e.g. Emergency medical kits for 200 residents"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>

              {/* ── Contact Information ── */}
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.06em', marginBottom: '0.625rem', marginTop: '0.5rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Contact Information
              </div>

              <div className="form-group">
                <label htmlFor="contact-name">Reporter Name</label>
                <input id="contact-name" type="text" placeholder="Your full name" value={formData.contactName} onChange={(e) => updateField('contactName', e.target.value)} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-phone">Mobile Number</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                      fontSize: '0.85rem', color: 'var(--text-muted)', pointerEvents: 'none',
                      display: 'flex', alignItems: 'center', gap: '0.25rem'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </span>
                    <input
                      id="contact-phone" type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                      style={{ paddingLeft: '2.25rem' }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                      fontSize: '0.85rem', color: 'var(--text-muted)', pointerEvents: 'none'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </span>
                    <input
                      id="contact-email" type="email"
                      placeholder="your@email.com"
                      value={formData.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      style={{ paddingLeft: '2.25rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Location Section ── */}
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.06em', marginBottom: '0.625rem', marginTop: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Location Details
                </span>
                <button
                  type="button"
                  onClick={() => setUseMyLocation(!useMyLocation)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-full)',
                    background: useMyLocation ? 'var(--primary)' : 'var(--surface-2)',
                    color: useMyLocation ? 'white' : 'var(--text-muted)',
                    fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4m0 12v4m10-10h-4M6 12H2"></path></svg>
                  {useMyLocation ? '📍 Using GPS' : 'Use My Location'}
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="need-location">Location / Address</label>
                <input
                  id="need-location" type="text"
                  placeholder="Full address or landmark description"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="need-area">Area / Neighborhood</label>
                  <input
                    id="need-area" type="text"
                    placeholder="e.g. Banjara Hills, Sector 12"
                    value={formData.area}
                    onChange={(e) => updateField('area', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="need-landmark">Nearest Landmark</label>
                  <input
                    id="need-landmark" type="text"
                    placeholder="e.g. Near City Hospital"
                    value={formData.landmark}
                    onChange={(e) => updateField('landmark', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ maxWidth: '200px' }}>
                <label htmlFor="need-pincode">PIN / ZIP Code</label>
                <input
                  id="need-pincode" type="text"
                  placeholder="500034"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  maxLength={6}
                />
              </div>

              {userLocation && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 0.75rem', background: 'var(--primary-light)',
                  borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem',
                  fontSize: '0.72rem', color: 'var(--primary-hover)'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  GPS: {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
                  {locationName && <span style={{ marginLeft: '0.25rem', color: 'var(--text-muted)' }}>({locationName})</span>}
                </div>
              )}

              {/* ── Category Selection ── */}
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.06em', marginBottom: '0.625rem', marginTop: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
                Category & Classification <span style={{ color: 'var(--danger)' }}>*</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {categories.map(cat => (
                  <button
                    key={cat.value} type="button"
                    onClick={() => updateField('category', cat.value)}
                    style={{
                      padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                      border: formData.category === cat.value ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                      background: formData.category === cat.value ? 'var(--primary-light)' : 'var(--surface-2)',
                      cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.15s var(--ease-smooth)',
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{cat.icon}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: formData.category === cat.value ? 700 : 500, color: formData.category === cat.value ? 'var(--primary)' : 'var(--text-secondary)' }}>{cat.value}</div>
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="form-group animate-fade-in">
                  <label>Sub-Category</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {selectedCategory.subs.map(sub => (
                      <button
                        key={sub} type="button"
                        onClick={() => updateField('subCategory', sub)}
                        style={{
                          padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem', fontWeight: formData.subCategory === sub ? 700 : 500,
                          background: formData.subCategory === sub ? 'var(--primary)' : 'var(--surface-2)',
                          color: formData.subCategory === sub ? 'white' : 'var(--text-muted)',
                          border: formData.subCategory === sub ? 'none' : '1px solid var(--surface-border)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Impact & Description ── */}
              <div className="form-row" style={{ marginTop: '0.5rem' }}>
                <div className="form-group">
                  <label htmlFor="people-affected">
                    How Many People Need Help?
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.375rem' }}>
                      (approx. count)
                    </span>
                  </label>
                  <input
                    id="people-affected" type="number"
                    placeholder="e.g. 150 people"
                    value={formData.peopleAffected}
                    onChange={(e) => updateField('peopleAffected', e.target.value)}
                    min="1"
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                    💡 Estimate how many individuals/families will benefit if this need is fulfilled
                  </span>
                </div>
                <div className="form-group">
                  <label>Urgency Hint</label>
                  <div style={{ display: 'flex', gap: '0.375rem' }}>
                    {[
                      { v: 'low', label: 'Low', color: 'var(--success)' },
                      { v: 'medium', label: 'Medium', color: 'var(--warning)' },
                      { v: 'high', label: 'Critical', color: 'var(--danger)' },
                    ].map(u => (
                      <button
                        key={u.v} type="button"
                        onClick={() => updateField('urgencyHint', u.v)}
                        style={{
                          flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                          background: formData.urgencyHint === u.v ? `${u.color}` : 'var(--surface-2)',
                          color: formData.urgencyHint === u.v ? 'white' : 'var(--text-muted)',
                          border: formData.urgencyHint === u.v ? 'none' : '1px solid var(--surface-border)',
                          transition: 'all 0.15s',
                        }}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="need-description">Detailed Description <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea
                  id="need-description" rows="4"
                  placeholder="Describe the need in detail — what's required, how many units, any time constraints..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  style={{ resize: 'vertical' }}
                ></textarea>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {formData.description.length} / 1000 characters
                </div>
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/needs')} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 2 }} id="submit-need-btn"
                  disabled={!formData.title || !formData.description || !formData.category}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  Submit to ML Priority Engine
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar — Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* How it works */}
          <div className="section-card animate-fade-in delay-1">
            <div className="section-card-header" style={{ padding: '0.875rem 1.25rem' }}>
              <div className="section-card-title" style={{ fontSize: '0.85rem' }}>How It Works</div>
            </div>
            <div className="section-card-body" style={{ padding: '0.875rem 1.25rem' }}>
              {[
                { step: '1', title: 'Submit', desc: 'Fill in the details about the community need', color: 'var(--primary)' },
                { step: '2', title: 'ML Analysis', desc: 'Our engine predicts urgency using text & geo data', color: 'var(--accent)' },
                { step: '3', title: 'Map & Match', desc: 'Need appears on the map, volunteers are matched', color: 'var(--success)' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: i < 2 ? '0.875rem' : 0 }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: `${s.color}18`, color: s.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800, flexShrink: 0
                  }}>{s.step}</div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{s.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {[
            { icon: '🤖', title: 'ML Classification', desc: 'Scikit-learn model auto-predicts urgency based on your text and location' },
            { icon: '📍', title: 'Geo-Mapping', desc: 'Your GPS coordinates pin the need on the real-time community map' },
            { icon: '🔗', title: 'Auto-Matching', desc: 'Nearby volunteers are automatically notified based on skills & distance' },
            { icon: '📱', title: 'Contact Info', desc: 'Your phone & email allow volunteers to coordinate response directly' },
          ].map((info, i) => (
            <div key={i} className="card-flat animate-fade-in" style={{ animationDelay: `${0.3 + i * 0.08}s`, padding: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.25rem' }}>{info.icon}</span>
                <div>
                  <h4 style={{ fontSize: '0.82rem', marginBottom: '0.125rem' }}>{info.title}</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{info.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportNeed;
