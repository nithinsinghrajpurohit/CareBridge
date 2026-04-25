import React, { useState } from 'react';

const Analytics = ({ needs }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredDay, setHoveredDay] = useState(null);

  const totalNeeds = needs.length || 26;
  const highNeeds = needs.filter(n => n.urgency === 'High').length || 9;
  const resolvedToday = 7;
  const totalPeople = needs.reduce((s, n) => s + (n.peopleAffected || 0), 0) || 1567;

  // Weekly chart data
  const weeklyData = [
    { day: 'Mon', reported: 4, resolved: 3, volunteers: 8 },
    { day: 'Tue', reported: 7, resolved: 5, volunteers: 12 },
    { day: 'Wed', reported: 3, resolved: 6, volunteers: 9 },
    { day: 'Thu', reported: 10, resolved: 7, volunteers: 15 },
    { day: 'Fri', reported: 6, resolved: 8, volunteers: 11 },
    { day: 'Sat', reported: 2, resolved: 4, volunteers: 6 },
    { day: 'Sun', reported: 4, resolved: 3, volunteers: 7 },
  ];
  const maxVal = Math.max(...weeklyData.map(d => Math.max(d.reported, d.resolved, d.volunteers)));

  // Hourly heatmap data (last 24h)
  const hourlyData = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: Math.floor(Math.random() * 8) + (h >= 8 && h <= 20 ? 3 : 0),
  }));
  const maxHourly = Math.max(...hourlyData.map(d => d.count));

  const categoryBreakdown = [
    { name: 'Medical', count: 8, pct: 31, color: 'var(--danger)', icon: '🏥' },
    { name: 'Food', count: 7, pct: 27, color: 'var(--warning)', icon: '🍲' },
    { name: 'Logistics', count: 6, pct: 23, color: 'var(--accent)', icon: '🚛' },
    { name: 'General', count: 5, pct: 19, color: 'var(--primary)', icon: '📦' },
  ];

  const performanceMetrics = [
    { label: 'Avg. Response Time', value: '2.4h', trend: '-18%', trendGood: true, icon: '⚡', color: 'var(--primary)' },
    { label: 'Resolution Rate', value: '87%', trend: '+5%', trendGood: true, icon: '✅', color: 'var(--success)' },
    { label: 'Volunteer Engagement', value: '92%', trend: '+12%', trendGood: true, icon: '👥', color: 'var(--accent)' },
    { label: 'Coverage Gap', value: '13%', trend: '-3%', trendGood: true, icon: '🛡️', color: 'var(--warning)' },
  ];

  const topReporters = [
    { name: 'Maria Chen', reports: 4, resolved: 3, avatar: 'MC' },
    { name: 'James Wilson', reports: 3, resolved: 2, avatar: 'JW' },
    { name: 'Sarah Park', reports: 3, resolved: 3, avatar: 'SP' },
    { name: 'David Kumar', reports: 2, resolved: 1, avatar: 'DK' },
    { name: 'Emily Rodriguez', reports: 2, resolved: 2, avatar: 'ER' },
  ];

  const mlInsights = [
    { icon: '📈', title: 'Medical Surge Detected', desc: 'Medical requests up 23% this week — recommend preemptive allocation of first-aid kits in Zone 3.', color: 'var(--danger-light)', badge: 'red', badgeLabel: 'Alert' },
    { icon: '🎯', title: 'ML Accuracy: 94.2%', desc: 'Priority classification across 1,247 data points. Model retrained 2 hours ago.', color: 'var(--success-light)', badge: 'green', badgeLabel: 'Optimal' },
    { icon: '⚡', title: 'Hot Zone: Downtown', desc: '3× average need density. Deploy 5 additional volunteers to Central Zone immediately.', color: 'var(--warning-light)', badge: 'amber', badgeLabel: 'Action' },
    { icon: '🔮', title: '48-Hour Forecast', desc: 'Food needs predicted to increase 40% over next 2 days based on weather and displacement patterns.', color: 'var(--primary-light)', badge: 'blue', badgeLabel: 'Forecast' },
    { icon: '🗺️', title: 'Coverage Analysis', desc: 'Northwest quadrant has 0 active volunteers. 6 pending needs with no assigned responder.', color: 'var(--accent-light)', badge: 'cyan', badgeLabel: 'Gap' },
    { icon: '🏆', title: 'Top Performer', desc: 'Volunteer Team Alpha resolved 12 needs in 4 hours — fastest response rate this month.', color: 'var(--success-light)', badge: 'green', badgeLabel: 'Award' },
  ];

  const badgeColors = {
    red: 'var(--danger)', green: 'var(--success)', amber: 'var(--warning)',
    blue: 'var(--primary)', cyan: 'var(--accent)',
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </span>
            Analytics
          </h1>
          <p className="page-subtitle">Data-driven insights into community needs, volunteer performance, and ML predictions</p>
        </div>
        <div className="page-header-actions">
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)} style={{ width: 'auto', minWidth: '140px' }} id="analytics-time-range">
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', padding: '4px', width: 'fit-content' }}>
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'performance', label: 'Performance', icon: '⚡' },
          { id: 'ml', label: 'ML Insights', icon: '🤖' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem',
              transition: 'all 0.2s',
            }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <>
          {/* KPI Cards */}
          <div className="grid-stats animate-fade-in" style={{ marginBottom: '1.5rem' }}>
            {[
              { label: 'Total Active Needs', value: totalNeeds, sub: `${highNeeds} critical`, icon: '📋', color: 'var(--warning)', gradient: 'var(--warning-light)' },
              { label: 'People Who Need Help', value: totalPeople.toLocaleString(), sub: 'across all needs', icon: '👥', color: 'var(--primary)', gradient: 'var(--primary-light)' },
              { label: 'Resolved Today', value: resolvedToday, sub: `${Math.round((resolvedToday/totalNeeds)*100)}% resolution rate`, icon: '✅', color: 'var(--success)', gradient: 'var(--success-light)' },
              { label: 'Active Volunteers', value: 47, sub: '↑ 12 since yesterday', icon: '🙋', color: 'var(--accent)', gradient: 'var(--accent-light)' },
            ].map((kpi, i) => (
              <div key={i} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="stat-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div className="stat-card-label">{kpi.label}</div>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: kpi.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{kpi.icon}</div>
                  </div>
                  <div className="stat-card-value" style={{ fontSize: '1.75rem', color: kpi.color }}>{kpi.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{kpi.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Weekly Activity Bar Chart */}
            <div className="section-card animate-fade-in delay-1">
              <div className="section-card-header">
                <div className="section-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  Weekly Activity
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem' }}>
                  {[['var(--primary)', 'Reported'], ['var(--success)', 'Resolved'], ['var(--accent)', 'Volunteers']].map(([c, l]) => (
                    <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c, display: 'inline-block' }}></span> {l}
                    </span>
                  ))}
                </div>
              </div>
              <div className="section-card-body">
                {/* Y-axis labels */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '200px', paddingBottom: '24px', alignItems: 'flex-end' }}>
                    {[maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0].map(v => (
                      <span key={v} style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{v}</span>
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    {/* Grid lines */}
                    <div style={{ position: 'relative', height: '200px' }}>
                      {[0, 25, 50, 75, 100].map(pct => (
                        <div key={pct} style={{ position: 'absolute', bottom: `${pct}%`, left: 0, right: 0, height: '1px', background: 'var(--surface-border)', opacity: 0.6 }}></div>
                      ))}
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '180px', padding: '0 0.5rem', position: 'relative' }}>
                        {weeklyData.map((d, i) => (
                          <div
                            key={i}
                            onMouseEnter={() => setHoveredDay(d.day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', position: 'relative' }}
                          >
                            <div style={{
                              display: 'flex', gap: '3px', alignItems: 'flex-end', height: '100%', width: '100%',
                              background: hoveredDay === d.day ? 'var(--surface-2)' : 'transparent',
                              borderRadius: '4px 4px 0 0', padding: '0 2px', transition: 'background 0.2s'
                            }}>
                              {[
                                { val: d.reported, bg: 'var(--primary-gradient)', label: 'Reported' },
                                { val: d.resolved, bg: 'linear-gradient(180deg,var(--success),#059669)', label: 'Resolved' },
                                { val: d.volunteers, bg: 'linear-gradient(180deg,var(--accent),#0891b2)', label: 'Volunteers' },
                              ].map((bar, j) => (
                                <div key={j} style={{
                                  flex: 1, height: `${(bar.val / maxVal) * 100}%`, background: bar.bg,
                                  borderRadius: '2px 2px 0 0', transition: 'all 0.6s var(--ease-spring)',
                                  minHeight: '4px', opacity: hoveredDay && hoveredDay !== d.day ? 0.4 : 1, cursor: 'pointer',
                                }}></div>
                              ))}
                            </div>
                            <span style={{ fontSize: '0.68rem', color: hoveredDay === d.day ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: hoveredDay === d.day ? 700 : 600, transition: 'all 0.2s' }}>{d.day}</span>
                            
                            {/* Floating Tooltip */}
                            {hoveredDay === d.day && (
                              <div style={{
                                position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                                background: 'var(--surface-1)', border: '1px solid var(--surface-border)',
                                borderRadius: 'var(--radius-md)', padding: '0.75rem', width: 'max-content',
                                zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.375rem',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)', animation: 'fadeInScale 0.2s var(--ease-spring)',
                                marginBottom: '0.5rem', pointerEvents: 'none'
                              }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
                                  Activity on {d.day}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>Reported Needs</span>
                                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.reported}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>Resolved Issues</span>
                                  <span style={{ fontWeight: 600, color: 'var(--success)' }}>{d.resolved}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>Active Volunteers</span>
                                  <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{d.volunteers}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="section-card animate-fade-in delay-2">
              <div className="section-card-header">
                <div className="section-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                  Category Distribution
                </div>
                <span className="badge badge-normal">{totalNeeds} total</span>
              </div>
              <div className="section-card-body">
                {/* Donut representation */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                      {categoryBreakdown.reduce((acc, cat, i) => {
                        const offset = acc.offset;
                        const dash = cat.pct * 1.005;
                        acc.els.push(
                          <circle key={i} cx="18" cy="18" r="15.9" fill="none"
                            stroke={cat.color} strokeWidth="4"
                            strokeDasharray={`${dash} ${100 - dash}`}
                            strokeDashoffset={-offset}
                            style={{ transition: 'all 1s ease' }}
                          />
                        );
                        acc.offset += dash;
                        return acc;
                      }, { offset: 0, els: [] }).els}
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{totalNeeds}</div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>needs</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {categoryBreakdown.map((cat, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{cat.icon}</span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{cat.name}</span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>{cat.count} <span style={{ color: cat.color }}>({cat.pct}%)</span></span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${cat.pct}%`, background: cat.color, transition: 'width 1s var(--ease-spring)' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Activity Heatmap */}
          <div className="section-card animate-fade-in delay-2" style={{ marginBottom: '1.5rem' }}>
            <div className="section-card-header">
              <div className="section-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                24-Hour Activity Heatmap
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Darker = more needs reported</span>
            </div>
            <div className="section-card-body">
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap', overflowX: 'auto' }}>
                {hourlyData.map((d) => {
                  const intensity = d.count / maxHourly;
                  return (
                    <div key={d.hour} title={`${d.hour}:00 — ${d.count} needs`}
                      style={{
                        flex: 1, minWidth: '28px', height: '56px', borderRadius: '6px',
                        background: `rgba(99, 102, 241, ${0.08 + intensity * 0.82})`,
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'flex-end', paddingBottom: '4px',
                        cursor: 'pointer', transition: 'transform 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scaleY(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = ''}
                    >
                      <span style={{ fontSize: '0.55rem', color: intensity > 0.5 ? 'white' : 'var(--text-muted)', fontWeight: 700 }}>
                        {d.hour}h
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>12 AM (Midnight)</span>
                <span>Peak hours: 9 AM – 6 PM</span>
                <span>11 PM</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── PERFORMANCE TAB ── */}
      {activeTab === 'performance' && (
        <>
          <div className="grid-stats animate-fade-in" style={{ marginBottom: '1.5rem' }}>
            {performanceMetrics.map((m, i) => (
              <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="stat-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div className="stat-card-label">{m.label}</div>
                    <span style={{ fontSize: '1.25rem' }}>{m.icon}</span>
                  </div>
                  <div className="stat-card-value" style={{ fontSize: '1.75rem', color: m.color }}>{m.value}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.375rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: m.trendGood ? 'var(--success)' : 'var(--danger)' }}>{m.trend}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>vs last period</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Reporters */}
          <div className="section-card animate-fade-in delay-1">
            <div className="section-card-header">
              <div className="section-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Top Reporters This Week
              </div>
              <span className="badge badge-accent">Community Heroes</span>
            </div>
            <div className="section-card-body">
              {topReporters.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0',
                  borderBottom: i < topReporters.length - 1 ? '1px solid var(--surface-border)' : 'none'
                }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: `hsl(${i * 55}, 70%, 50%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 800, color: 'white'
                    }}>{r.avatar}</div>
                    {i === 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '0.75rem' }}>🏆</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.reports} needs reported · {r.resolved} resolved</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.85rem' }}>
                      {Math.round((r.resolved / r.reports) * 100)}%
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>resolution</div>
                  </div>
                  <div className="progress-bar" style={{ width: '80px' }}>
                    <div className="progress-bar-fill" style={{ width: `${(r.reports / 5) * 100}%`, background: `hsl(${i * 55}, 70%, 50%)` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── ML INSIGHTS TAB ── */}
      {activeTab === 'ml' && (
        <>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem',
            background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
            border: '1px solid rgba(var(--primary-rgb),0.15)',
          }} className="animate-fade-in">
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <div>
              <div style={{ fontWeight: 700 }}>ML Engine Status: <span style={{ color: 'var(--success)' }}>Active</span></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Scikit-learn RandomForest v2.1 · 1,247 training samples · Last retrained 2h ago · Accuracy: <strong style={{ color: 'var(--success)' }}>94.2%</strong>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 8px var(--success)' }}></span>
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Live Inference</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {mlInsights.map((insight, i) => (
              <div key={i} className="card-flat animate-fade-in" style={{ animationDelay: `${i * 0.08}s`, background: insight.color, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{insight.icon}</span>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)', background: `${badgeColors[insight.badge]}22`,
                    color: badgeColors[insight.badge], textTransform: 'uppercase', letterSpacing: '0.04em'
                  }}>{insight.badgeLabel}</span>
                </div>
                <h4 style={{ fontSize: '0.88rem', marginBottom: '0.375rem', fontWeight: 700 }}>{insight.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{insight.desc}</p>
              </div>
            ))}
          </div>

          {/* Prediction Confidence Meter */}
          <div className="section-card animate-fade-in delay-2">
            <div className="section-card-header">
              <div className="section-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                Priority Prediction Breakdown
              </div>
              <span className="badge badge-normal">Last 24h predictions</span>
            </div>
            <div className="section-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'High Priority', pct: 35, count: 9, color: 'var(--danger)', icon: '🔴' },
                  { label: 'Medium Priority', pct: 42, count: 11, color: 'var(--warning)', icon: '🟡' },
                  { label: 'Low Priority', pct: 23, count: 6, color: 'var(--success)', icon: '🟢' },
                ].map((p, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: p.color }}>{p.pct}%</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.25rem' }}>{p.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{p.count} needs</div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${p.pct}%`, background: p.color, transition: 'width 1.2s var(--ease-spring)' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
