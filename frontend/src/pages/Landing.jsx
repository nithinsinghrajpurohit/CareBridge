import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Ambient Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* ─── Navbar ─── */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="logo-icon-heart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span>Care<strong>Bridge</strong></span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#impact">Impact</a>
        </div>
        <button className="nav-login-btn" onClick={() => navigate('/login')}>
          Sign In →
        </button>
      </nav>

      {/* ─── Hero ─── */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI-Powered Community Logistics
          </div>
          <h1>
            Connecting needs<br />
            with <span className="gradient-text">rapid response.</span>
          </h1>
          <p className="hero-desc">
            CareBridge uses real-time mapping and ML-driven priority routing to match
            critical community needs with the nearest available volunteers — instantly.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => navigate('/login')}>
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button className="btn-hero-ghost" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
          <div className="hero-metrics">
            <div className="metric"><strong>2.4s</strong><span>Avg Response Time</span></div>
            <div className="metric-divider"></div>
            <div className="metric"><strong>94.2%</strong><span>ML Accuracy</span></div>
            <div className="metric-divider"></div>
            <div className="metric"><strong>1,200+</strong><span>Needs Resolved</span></div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="landing-section" id="features">
        <div className="section-label">Features</div>
        <h2 className="section-title">Everything you need, in one place</h2>
        <p className="section-sub">A unified command center for community resource management.</p>
        <div className="features-grid">
          {[
            { icon: '📍', title: 'Live Mission Map', desc: 'Track needs, volunteers, and resources on an interactive real-time geospatial map with GPS integration.' },
            { icon: '🤖', title: 'ML Priority Engine', desc: 'Scikit-learn powered NLP model auto-classifies urgency from text descriptions and geo-density data.' },
            { icon: '👥', title: 'Volunteer Matching', desc: 'Automatically pairs nearby volunteers with open tasks based on skills, distance, and availability.' },
            { icon: '📊', title: 'Analytics Dashboard', desc: 'Data-driven insights with weekly charts, heatmaps, category breakdowns, and performance metrics.' },
            { icon: '📋', title: 'Needs Board', desc: 'A full Kanban-style board to report, track, and resolve community needs with contact details.' },
            { icon: '🔗', title: 'Community Network', desc: 'Invite volunteers via email, link, or social media. Track referrals and grow your response team.' },
          ].map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="feature-icon-box">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="landing-section dark-section" id="how-it-works">
        <div className="section-label">Workflow</div>
        <h2 className="section-title">Three steps to impact</h2>
        <p className="section-sub">From need identification to resolution in minutes, not days.</p>
        <div className="steps-row">
          {[
            { num: '01', title: 'Report a Need', desc: 'Community members submit needs with location, category, and details. GPS auto-tags coordinates.', color: '#00e5ff' },
            { num: '02', title: 'AI Analyzes & Routes', desc: 'Our ML engine predicts urgency, maps the need, and identifies the optimal volunteer match.', color: '#b388ff' },
            { num: '03', title: 'Volunteers Respond', desc: 'Matched volunteers get instant alerts, claim tasks, and coordinate response with live tracking.', color: '#00e676' },
          ].map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num" style={{ color: s.color }}>{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < 2 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Impact Stories ─── */}
      <section className="landing-section" id="stories">
        <div className="section-label">Stories</div>
        <h2 className="section-title">How we've helped communities</h2>
        <p className="section-sub">Real stories of CareBridge making a difference when it matters most.</p>
        <div className="stories-grid">
          {[
            {
              img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
              tag: 'Food Relief',
              tagColor: '#f59e0b',
              tagBg: 'rgba(245, 158, 11, 0.15)',
              title: 'Hot meals for 200+ flood-affected families',
              desc: 'Volunteers coordinated through CareBridge to deliver hot meals and clean water to displaced families in the eastern district within 4 hours of the emergency.',
              people: '200+',
              time: '4 hrs',
            },
            {
              img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80',
              tag: 'Medical Aid',
              tagColor: '#ef4444',
              tagBg: 'rgba(239, 68, 68, 0.15)',
              title: 'Emergency medical camp for rural village',
              desc: 'Our ML engine detected a surge in medical requests and auto-dispatched 12 medical volunteers with first-aid kits to the underserved community.',
              people: '350+',
              time: '2.5 hrs',
            },
            {
              img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80',
              tag: 'Community',
              tagColor: '#00e676',
              tagBg: 'rgba(0, 230, 118, 0.15)',
              title: 'Neighborhood cleanup drive after storm',
              desc: 'CareBridge matched 30 nearby volunteers for debris clearing and supply distribution. GPS tracking enabled real-time coordination.',
              people: '150+',
              time: '6 hrs',
            },
          ].map((story, i) => (
            <div className="story-card" key={i}>
              <div className="story-image">
                <img src={story.img} alt={story.title} loading="lazy" />
                <span className="story-tag" style={{ background: story.tagBg, color: story.tagColor }}>
                  {story.tag}
                </span>
              </div>
              <div className="story-body">
                <h3>{story.title}</h3>
                <p>{story.desc}</p>
                <div className="story-meta">
                  <span className="story-stat">👥 {story.people} helped</span>
                  <span className="story-stat">⚡ {story.time} response</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Impact Numbers ─── */}
      <section className="landing-section" id="impact">
        <div className="section-label">Impact</div>
        <h2 className="section-title">Built for real-world scale</h2>
        <p className="section-sub">Trusted by communities to deliver when it matters most.</p>
        <div className="impact-grid">
          {[
            { value: '1,567', label: 'People Helped', icon: '❤️' },
            { value: '47', label: 'Active Volunteers', icon: '🙋' },
            { value: '87%', label: 'Resolution Rate', icon: '✅' },
            { value: '<3min', label: 'Avg Dispatch Time', icon: '⚡' },
          ].map((item, i) => (
            <div className="impact-card" key={i}>
              <span className="impact-icon">{item.icon}</span>
              <div className="impact-value">{item.value}</div>
              <div className="impact-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Footer ─── */}
      <section className="landing-cta">
        <div className="cta-content">
          <h2>Ready to bridge the gap?</h2>
          <p>Join CareBridge and help build stronger, more resilient communities.</p>
          <div className="cta-buttons">
            <button className="btn-hero-primary" onClick={() => navigate('/login')}>
              Start as Operator
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button className="btn-hero-ghost" onClick={() => navigate('/login')}>
              Join as Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-icon-heart small">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span>CareBridge</span>
          </div>
          <p>© 2026 CareBridge. Built with ❤️ for communities everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
