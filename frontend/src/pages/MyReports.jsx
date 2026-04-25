import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORY_ICONS = { Medical: '🏥', Food: '🍲', Logistics: '🚛', General: '📦', Shelter: '🏠', Education: '📚' };
const URGENCY_COLORS = {
  High:   { bg: 'var(--danger-light)',  color: 'var(--danger)',  border: 'rgba(239,68,68,0.2)' },
  Medium: { bg: 'var(--warning-light)', color: 'var(--warning)', border: 'rgba(245,158,11,0.2)' },
  Low:    { bg: 'var(--success-light)', color: 'var(--success)', border: 'rgba(16,185,129,0.2)' },
};

// Initial sample reports for the current user
const SAMPLE_MY_REPORTS = [
  {
    id: 'r1', title: 'Emergency medical kits required', category: 'Medical', urgency: 'High',
    status: 'Active', location: 'City Hospital Emergency Wing', area: 'Downtown',
    landmark: 'Near Central Park', pincode: '500001',
    contactName: 'Maria Chen', contactPhone: '+91 98765 43210', contactEmail: 'maria.chen@carebridge.org',
    description: 'Urgent need for 200 first-aid kits and basic medical supplies for displaced families.',
    peopleAffected: 200, subCategory: 'First Aid Kits', postedAgo: '25 min ago', postedAt: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: 'r2', title: 'Hot meals for senior residents', category: 'Food', urgency: 'Medium',
    status: 'Active', location: 'Community Hall Kitchen', area: 'Sector 5',
    landmark: 'Near Bus Stand', pincode: '500002',
    contactName: 'Maria Chen', contactPhone: '+91 98765 43210', contactEmail: 'maria.chen@carebridge.org',
    description: 'Daily hot meal service for 80 elderly residents unable to access regular food services.',
    peopleAffected: 80, subCategory: 'Hot Meals', postedAgo: '3 hr ago', postedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 'r3', title: 'Clean water purification units', category: 'Medical', urgency: 'High',
    status: 'Resolved', location: 'River Camp Settlement', area: 'South Bank',
    landmark: 'Near River Bridge', pincode: '500003',
    contactName: 'Maria Chen', contactPhone: '+91 98765 43210', contactEmail: 'maria.chen@carebridge.org',
    description: 'Portable water purification systems for 300+ residents with disrupted municipal supply.',
    peopleAffected: 300, subCategory: 'Medical Equipment', postedAgo: '1 day ago', postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

const EditModal = ({ report, onSave, onClose }) => {
  const [form, setForm] = useState({ ...report });
  const categories = ['Medical', 'Food', 'Logistics', 'General', 'Shelter', 'Education'];

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', z: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 1000 }}>
      <div style={{ background: 'var(--surface-1)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflow: 'auto', border: '1px solid var(--surface-border)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }} className="animate-fade-scale">
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--surface-border)', position: 'sticky', top: 0, background: 'var(--surface-1)', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span style={{ fontSize: '1.25rem' }}>✏️</span>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Edit Report</h2>
          </div>
          <button onClick={onClose} style={{ background: 'var(--surface-2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: '1.5rem' }}>
          <div className="form-group">
            <label>Need Title</label>
            <input type="text" value={form.title} onChange={e => update('title', e.target.value)} />
          </div>

          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', marginTop: '0.25rem' }}>Contact Information</div>
          <div className="form-group">
            <label>Reporter Name</label>
            <input type="text" value={form.contactName} onChange={e => update('contactName', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" value={form.contactPhone} onChange={e => update('contactPhone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.contactEmail} onChange={e => update('contactEmail', e.target.value)} />
            </div>
          </div>

          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', marginTop: '0.5rem' }}>Location</div>
          <div className="form-group">
            <label>Location / Address</label>
            <input type="text" value={form.location} onChange={e => update('location', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Area</label>
              <input type="text" value={form.area} onChange={e => update('area', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Landmark</label>
              <input type="text" value={form.landmark} onChange={e => update('landmark', e.target.value)} />
            </div>
          </div>

          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', marginTop: '0.5rem' }}>Category</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {categories.map(cat => (
              <button key={cat} type="button" onClick={() => update('category', cat)}
                style={{ padding: '0.625rem', borderRadius: 'var(--radius-sm)', border: form.category === cat ? '2px solid var(--primary)' : '1px solid var(--surface-border)', background: form.category === cat ? 'var(--primary-light)' : 'var(--surface-2)', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem' }}>{CATEGORY_ICONS[cat]}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: form.category === cat ? 700 : 500, color: form.category === cat ? 'var(--primary)' : 'var(--text-secondary)' }}>{cat}</div>
              </button>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>How Many People Need Help?</label>
              <input type="number" value={form.peopleAffected} onChange={e => update('peopleAffected', e.target.value)} min="1" />
            </div>
            <div className="form-group">
              <label>Urgency</label>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['Low', 'Medium', 'High'].map(u => {
                  const c = URGENCY_COLORS[u];
                  return (
                    <button key={u} type="button" onClick={() => update('urgency', u)}
                      style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', background: form.urgency === u ? c.color : 'var(--surface-2)', color: form.urgency === u ? 'white' : 'var(--text-muted)', border: 'none' }}>
                      {u}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" value={form.description} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={() => onSave(form)} style={{ flex: 2 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirm = ({ report, onConfirm, onClose }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div style={{ background: 'var(--surface-1)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: '420px', width: '90%', border: '1px solid var(--danger-light)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }} className="animate-fade-scale">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🗑️</div>
        <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Delete Report?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
          "<strong>{report.title}</strong>" will be permanently deleted. This action cannot be undone.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Keep It</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: '0.625rem 1rem', borderRadius: 'var(--radius-sm)', background: 'var(--danger)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }}>
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

const MyReports = ({ needs, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  
  // Display needs that the current demo user authored
  const myReports = needs ? needs.filter(n => n.postedBy === 'Maria Chen' || n.contactName === 'Maria Chen' || n.reporter === 'You') : [];
  
  const [editingReport, setEditingReport] = useState(null);
  const [deletingReport, setDeletingReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (updated) => {
    if (onUpdate) onUpdate(updated);
    setEditingReport(null);
    showToast('Report updated successfully!');
  };

  const handleDelete = () => {
    if (onDelete && deletingReport) onDelete(deletingReport.id);
    setDeletingReport(null);
    showToast('Report deleted.', 'danger');
  };

  const handleMarkResolved = (id) => {
    const report = myReports.find(r => r.id === id);
    if (!report) return;
    const isCurrentlyResolved = report.status === 'Resolved' || report.status === 'resolved';
    const newStatus = isCurrentlyResolved ? 'Active' : 'Resolved';
    if (onUpdate) onUpdate({ ...report, status: newStatus });
    showToast(isCurrentlyResolved ? 'Marked as Active again.' : 'Marked as Resolved! 🎉');
  };

  const filtered = myReports
    .filter(r => filterStatus === 'All' || (filterStatus === 'Resolved' ? (r.status === 'Resolved' || r.status === 'resolved') : (r.status !== 'Resolved' && r.status !== 'resolved')))
    .sort((a, b) => {
      const aTime = a.postedAt ? new Date(a.postedAt).getTime() : 0;
      const bTime = b.postedAt ? new Date(b.postedAt).getTime() : 0;
      return sortBy === 'newest' ? bTime - aTime : aTime - bTime;
    });

  const stats = {
    total: myReports.length,
    active: myReports.filter(r => r.status !== 'Resolved' && r.status !== 'resolved').length,
    resolved: myReports.filter(r => r.status === 'Resolved' || r.status === 'resolved').length,
    people: myReports.reduce((s, r) => s + (Number(r.peopleAffected) || 0), 0),
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="animate-slide-up" style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 2000,
          background: toast.type === 'danger' ? 'var(--danger)' : 'var(--success)',
          color: 'white', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)',
          fontWeight: 600, fontSize: '0.88rem', boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          {toast.type === 'danger' ? '🗑️' : '✅'} {toast.msg}
        </div>
      )}

      {/* Edit & Delete modals */}
      {editingReport && <EditModal report={editingReport} onSave={handleSave} onClose={() => setEditingReport(null)} />}
      {deletingReport && <DeleteConfirm report={deletingReport} onConfirm={handleDelete} onClose={() => setDeletingReport(null)} />}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            My Reports
          </h1>
          <p className="page-subtitle">All needs you've reported · Edit, resolve, or remove your submissions</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/report')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Report New Need
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Submitted', value: stats.total, icon: '📋', color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Currently Active', value: stats.active, icon: '🟢', color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'var(--accent)', bg: 'var(--accent-light)' },
          { label: 'Total People Helped', value: stats.people, icon: '👥', color: 'var(--warning)', bg: 'var(--warning-light)' },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="stat-card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div className="stat-card-label">{s.label}</div>
                <span style={{ width: '30px', height: '30px', borderRadius: '6px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{s.icon}</span>
              </div>
              <div className="stat-card-value" style={{ color: s.color, fontSize: '1.75rem' }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Sort Bar */}
      <div className="section-card animate-fade-in" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {['All', 'Active', 'Resolved'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                style={{ padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', background: filterStatus === s ? 'var(--primary)' : 'transparent', color: filterStatus === s ? 'white' : 'var(--text-muted)', border: filterStatus === s ? 'none' : '1px solid var(--surface-border)', transition: 'all 0.2s' }}>
                {s === 'Active' ? '🟢' : s === 'Resolved' ? '✅' : ''} {s}
                {s !== 'All' && <span style={{ marginLeft: '0.375rem', fontSize: '0.7rem', opacity: 0.8 }}>({s === 'Active' ? stats.active : stats.resolved})</span>}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', minWidth: '130px', fontSize: '0.8rem', padding: '0.375rem 0.5rem' }}>
              <option value="newest">🕐 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      {filtered.length === 0 ? (
        <div className="section-card">
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3>No reports found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {filterStatus === 'Resolved' ? "You haven't resolved any needs yet." : "You haven't submitted any needs yet."}
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/report')}>Report a Need</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((report, i) => {
            const uc = URGENCY_COLORS[report.urgency] || URGENCY_COLORS.Low;
            const isResolved = report.status === 'Resolved';
            return (
              <div key={report.id} className="card animate-fade-in" style={{ animationDelay: `${i * 0.06}s`, borderLeft: `4px solid ${isResolved ? 'var(--success)' : uc.color}`, opacity: isResolved ? 0.85 : 1, transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  {/* Left: icon */}
                  <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: isResolved ? 'var(--success-light)' : uc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    {isResolved ? '✅' : CATEGORY_ICONS[report.category] || '📦'}
                  </div>

                  {/* Center: content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.375rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>{report.title}</h3>
                          <span className="badge" style={{ background: uc.bg, color: uc.color, fontSize: '0.62rem', border: `1px solid ${uc.border}` }}>{report.urgency}</span>
                          <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', background: isResolved ? 'var(--success-light)' : 'var(--warning-light)', color: isResolved ? 'var(--success)' : 'var(--warning)', border: `1px solid ${isResolved ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
                            {isResolved ? '✅ Resolved' : '🟢 Active'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          📍 {report.location} {report.area && `· ${report.area}`} · ⏱ {report.postedAgo}
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0.375rem 0 0.625rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {report.description}
                    </p>

                    {/* Contact & Impact row */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        {report.contactPhone}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        {report.contactEmail}
                      </span>
                      {report.peopleAffected && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                          {report.peopleAffected} people need help
                        </span>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {CATEGORY_ICONS[report.category]} {report.category}{report.subCategory && ` · ${report.subCategory}`}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {/* Mark Resolved / Reopen */}
                      <button onClick={() => handleMarkResolved(report.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: 'none', background: isResolved ? 'var(--warning-light)' : 'var(--success-light)', color: isResolved ? 'var(--warning)' : 'var(--success)', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        {isResolved
                          ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 11 16 11"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 11"></path></svg> Reopen</>
                          : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Mark Resolved</>
                        }
                      </button>

                      {/* Edit */}
                      <button onClick={() => setEditingReport(report)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--surface-border)', background: 'var(--surface-2)', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Edit
                      </button>

                      {/* View on board */}
                      <button onClick={() => navigate('/needs')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--surface-border)', background: 'var(--surface-2)', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        View on Board
                      </button>

                      {/* Delete */}
                      <button onClick={() => setDeletingReport(report)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--danger-light)', background: 'var(--danger-light)', color: 'var(--danger)', marginLeft: 'auto', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReports;
