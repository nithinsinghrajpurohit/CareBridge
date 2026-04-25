import React, { useState } from 'react';

const Support = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'general', priority: 'medium', message: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { id: 1, category: 'Getting Started', question: 'How do I report a community need?', answer: 'Navigate to "Report a Need" from the sidebar. Fill in the title, location, category, and a detailed description. Our ML engine will automatically predict the urgency level based on your input. The more detail you provide, the more accurate the prediction.' },
    { id: 2, category: 'Getting Started', question: 'How does the ML Priority Engine work?', answer: 'CareBridge uses a Scikit-learn RandomForest classifier trained on historical community data. When you submit a need, the model analyzes the text description, category, and location to predict urgency (High, Medium, Low). The model is periodically retrained for improved accuracy, currently at 94.2%.' },
    { id: 3, category: 'Volunteering', question: 'How do I volunteer for a task?', answer: 'Go to the "Volunteer Hub" page, filter tasks by your skills/category, and click "Volunteer for this Task" on any need card. You can track your claimed tasks and see your community impact score on the same page.' },
    { id: 4, category: 'Volunteering', question: 'Can I invite others to join as volunteers?', answer: 'Yes! Go to the Community page and click "Invite Volunteer." You can send email invitations with role assignment, share a unique referral link, or post on social media. Track your invites and see acceptance rates in the referral stats.' },
    { id: 5, category: 'Dashboard', question: 'What do the map markers represent?', answer: 'Each marker on the Google Maps view represents an active community need. Red markers indicate Critical/High priority, yellow for Medium, and green for Low. Click any marker to see details including the title, category, urgency level, and location.' },
    { id: 6, category: 'Dashboard', question: 'How are analytics calculated?', answer: 'Analytics are computed in real-time from your community data. Response time measures how quickly needs get volunteers. Resolution rate tracks completed vs. total needs. Volunteer engagement shows active participation percentage. The ML engine also generates predictive insights.' },
    { id: 7, category: 'Account', question: 'How do I change notification preferences?', answer: 'Go to Settings → Notifications to toggle push notifications, email alerts, and sound alerts. You can also filter notification types from the Notifications page using the filter tabs.' },
    { id: 8, category: 'Technical', question: 'What technologies power CareBridge?', answer: 'CareBridge is built with React (Vite) for the frontend, Django REST Framework for the backend API, and Scikit-learn for the ML priority prediction engine. Maps use Google Maps for real-time geospatial visualization. Authentication is handled via JWT tokens.' },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

  const faqCategories = [...new Set(faqs.map(f => f.category))];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketForm.subject || !ticketForm.message) return;
    setTicketSubmitted(true);
    setTimeout(() => { setTicketSubmitted(false); setTicketForm({ subject: '', category: 'general', priority: 'medium', message: '' }); }, 4000);
  };

  const guides = [
    { icon: '🚀', title: 'Quick Start Guide', desc: 'Get up and running with CareBridge in 5 minutes', tag: 'Beginner', color: 'var(--primary)' },
    { icon: '🤖', title: 'ML Engine Deep Dive', desc: 'Understanding priority predictions and accuracy', tag: 'Advanced', color: 'var(--accent)' },
    { icon: '📊', title: 'Analytics & Reporting', desc: 'Making data-driven community decisions', tag: 'Intermediate', color: 'var(--warning)' },
    { icon: '👥', title: 'Volunteer Management', desc: 'Recruiting, onboarding, and retaining volunteers', tag: 'Guide', color: 'var(--success)' },
    { icon: '🗺️', title: 'Maps & Geolocation', desc: 'Using Google Maps for need distribution tracking', tag: 'Feature', color: 'var(--secondary)' },
    { icon: '🔒', title: 'Security & Authentication', desc: 'JWT tokens, roles, and access management', tag: 'Security', color: 'var(--danger)' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </span>
            Help & Support
          </h1>
          <p className="page-subtitle">Find answers, explore guides, or reach out to our support team</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="animate-fade-in" style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: 'var(--surface-1)', border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-lg)', padding: '0.875rem 1.25rem',
        marginBottom: '1.5rem', transition: 'all 0.2s'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search for help articles, FAQs, guides..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setActiveSection('faq'); }}
          style={{ background: 'transparent', border: 'none', flex: 1, fontSize: '0.95rem', padding: 0 }}
          id="support-search"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      {/* Quick Action Cards */}
      <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '❓', title: 'FAQ', desc: 'Browse common questions', section: 'faq', color: 'var(--primary-light)', border: 'var(--primary)' },
          { icon: '📚', title: 'Guides', desc: 'Step-by-step tutorials', section: 'guides', color: 'var(--accent-light)', border: 'var(--accent)' },
          { icon: '🎫', title: 'Contact Support', desc: 'Submit a support ticket', section: 'contact', color: 'var(--success-light)', border: 'var(--success)' },
        ].map((card, i) => (
          <button
            key={card.section}
            onClick={() => setActiveSection(card.section)}
            id={`support-${card.section}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem',
              background: activeSection === card.section ? card.color : 'var(--surface-1)',
              border: `1px solid ${activeSection === card.section ? card.border + '40' : 'var(--surface-border)'}`,
              borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s var(--ease-smooth)'
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>{card.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{card.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{card.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <div className="animate-fade-in">
          {searchQuery && (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Found <strong style={{ color: 'var(--text-primary)' }}>{filteredFaqs.length}</strong> result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
          )}

          {faqCategories.map(cat => {
            const catFaqs = filteredFaqs.filter(f => f.category === cat);
            if (catFaqs.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{cat}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {catFaqs.map(faq => (
                    <div
                      key={faq.id}
                      style={{
                        background: 'var(--surface-1)', border: '1px solid var(--surface-border)',
                        borderRadius: 'var(--radius-md)', overflow: 'hidden',
                        transition: 'all 0.2s'
                      }}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.875rem 1.25rem', background: 'transparent', border: 'none',
                          cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.9rem',
                          fontWeight: expandedFaq === faq.id ? 700 : 500, textAlign: 'left'
                        }}
                      >
                        <span>{faq.question}</span>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
                          style={{ transition: 'transform 0.2s', transform: expandedFaq === faq.id ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, marginLeft: '0.5rem' }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      {expandedFaq === faq.id && (
                        <div style={{
                          padding: '0 1.25rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)',
                          lineHeight: 1.7, borderTop: '1px solid var(--surface-border)',
                          animation: 'fadeIn 0.2s ease-out'
                        }}>
                          <div style={{ paddingTop: '0.75rem' }}>{faq.answer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Guides Section */}
      {activeSection === 'guides' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {guides.map((guide, i) => (
              <div key={i} className="card" style={{ animationDelay: `${i * 0.06}s`, display: 'flex', gap: '1rem', cursor: 'pointer' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: 'var(--radius-sm)',
                  background: `${guide.color}18`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0
                }}>{guide.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{guide.title}</h4>
                    <span className="badge" style={{ background: `${guide.color}18`, color: guide.color, fontSize: '0.6rem', borderColor: `${guide.color}30` }}>{guide.tag}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{guide.desc}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0, alignSelf: 'center' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact / Ticket Section */}
      {activeSection === 'contact' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
            {/* Ticket Form */}
            <div className="section-card">
              <div className="section-card-header">
                <div className="section-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  Submit a Support Ticket
                </div>
              </div>
              <div className="section-card-body">
                {ticketSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', animation: 'fadeInScale 0.4s var(--ease-spring)' }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'var(--success-light)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--success)'
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 style={{ marginBottom: '0.375rem' }}>Ticket Submitted!</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>We'll get back to you within 24 hours. Ticket #CB-2026-0418</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTicket}>
                    <div className="form-group">
                      <label htmlFor="ticket-subject">Subject</label>
                      <input id="ticket-subject" type="text" placeholder="Brief description of your issue" value={ticketForm.subject} onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="ticket-category">Category</label>
                        <select id="ticket-category" value={ticketForm.category} onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}>
                          <option value="general">General Question</option>
                          <option value="bug">Bug Report</option>
                          <option value="feature">Feature Request</option>
                          <option value="account">Account Issue</option>
                          <option value="ml">ML Engine</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="ticket-priority">Priority</label>
                        <select id="ticket-priority" value={ticketForm.priority} onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ticket-message">Message</label>
                      <textarea id="ticket-message" rows="5" placeholder="Describe your issue in detail..." value={ticketForm.message} onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })} style={{ resize: 'vertical' }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} id="submit-ticket-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      Submit Ticket
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card-flat" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💬</div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Live Chat</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Available Mon-Fri, 9am-6pm</p>
                <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Start Chat</button>
              </div>

              <div className="card-flat" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📧</div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email Us</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>support@carebridge.org</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Response within 24 hours</p>
              </div>

              <div className="card-flat" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📖</div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Documentation</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Full API & platform docs</p>
                <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>View Docs</button>
              </div>

              <div className="card-flat" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="status-dot status-dot-success"></span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>System Status</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--success)', margin: 0 }}>All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
