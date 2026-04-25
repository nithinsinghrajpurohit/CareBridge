import React, { useState, useMemo } from 'react';
import MapContainer from '../components/MapContainer';
import { useLocation, getDistance, formatDistance } from '../hooks/useLocationContext';

const NeedsDashboard = ({ needs, onVolunteer }) => {
  const { userLocation, locationName, isLocating } = useLocation();

  // Filter state
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  const enrichedNeeds = useMemo(() => {
    if (!userLocation) return needs.map(n => ({ ...n, distance: null }));
    return needs.map(n => ({
      ...n,
      distance: getDistance(userLocation.lat, userLocation.lng, n.latitude, n.longitude),
    }));
  }, [needs, userLocation]);

  const filteredNeeds = useMemo(() => {
    let result = enrichedNeeds;

    // Text search
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(n =>
        n.title?.toLowerCase().includes(q) ||
        n.description?.toLowerCase().includes(q) ||
        n.location?.toLowerCase().includes(q) ||
        n.postedBy?.toLowerCase().includes(q) ||
        n.category?.toLowerCase().includes(q)
      );
    }

    // Category
    if (categoryFilter !== 'All') result = result.filter(n => n.category === categoryFilter);

    // Urgency
    if (urgencyFilter !== 'All') result = result.filter(n => n.urgency === urgencyFilter);

    // Distance
    if (distanceFilter !== 'all' && userLocation) {
      const maxKm = parseFloat(distanceFilter);
      result = result.filter(n => n.distance != null && n.distance <= maxKm);
    }

    // Sort
    if (sortBy === 'distance' && userLocation)
      result = [...result].sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    else if (sortBy === 'urgency') {
      const order = { High: 0, Medium: 1, Low: 2 };
      result = [...result].sort((a, b) => (order[a.urgency] ?? 3) - (order[b.urgency] ?? 3));
    } else if (sortBy === 'recent')
      result = [...result].reverse();
    else if (sortBy === 'people')
      result = [...result].sort((a, b) => (b.peopleAffected || 0) - (a.peopleAffected || 0));

    return result;
  }, [enrichedNeeds, searchText, categoryFilter, urgencyFilter, distanceFilter, sortBy, userLocation]);

  const nearbyRecommendations = useMemo(() => {
    if (!userLocation) return [];
    return [...enrichedNeeds]
      .sort((a, b) => (a.distance || 999) - (b.distance || 999))
      .slice(0, 4);
  }, [enrichedNeeds, userLocation]);

  const activeFilterCount = [
    categoryFilter !== 'All', urgencyFilter !== 'All',
    distanceFilter !== 'all', searchText.trim() !== '',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchText(''); setCategoryFilter('All');
    setUrgencyFilter('All'); setDistanceFilter('all');
  };

  const categories = ['All', 'Medical', 'Food', 'Logistics', 'General', 'Shelter', 'Education'];
  const urgencyStyles = {
    High:   { bg: 'var(--danger-light)',  color: 'var(--danger)',  border: 'rgba(239,68,68,0.2)',   gradient: 'linear-gradient(135deg,#ef4444,#dc2626)' },
    Medium: { bg: 'var(--warning-light)', color: 'var(--warning)', border: 'rgba(245,158,11,0.2)',  gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    Low:    { bg: 'var(--success-light)', color: 'var(--success)', border: 'rgba(16,185,129,0.2)',  gradient: 'linear-gradient(135deg,#10b981,#059669)' },
  };
  const categoryIcons = { Medical: '🏥', Food: '🍲', Logistics: '🚛', General: '📦', Shelter: '🏠', Education: '📚' };

  const stats = {
    total: needs.length,
    critical: needs.filter(n => n.urgency === 'High').length,
    people: needs.reduce((s, n) => s + (n.peopleAffected || 0), 0),
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </span>
            Needs Board
          </h1>
          <p className="page-subtitle">Real-time community needs · ML-powered prioritization</p>
        </div>
        <div className="page-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--surface-1)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.875rem' }}>
            {isLocating ? <><span className="spinner spinner-sm"></span> Detecting...</> : <><span style={{ color: 'var(--primary)' }}>📍</span><span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{locationName || 'Location unavailable'}</span></>}
          </div>
          <span className="badge badge-normal" style={{ padding: '0.5rem 0.875rem' }}>
            <span className="status-dot status-dot-success"></span>
            {filteredNeeds.length}/{needs.length} needs
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Total Active', value: stats.total, icon: '📋', color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Critical / High', value: stats.critical, icon: '🔴', color: 'var(--danger)', bg: 'var(--danger-light)' },
          { label: 'Showing Now', value: filteredNeeds.length, icon: '🔍', color: 'var(--accent)', bg: 'var(--accent-light)' },
          { label: 'People Needing Help', value: stats.people.toLocaleString(), icon: '👥', color: 'var(--success)', bg: 'var(--success-light)' },
        ].map((s, i) => (
          <div key={i} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div className="stat-card-label" style={{ fontSize: '0.72rem' }}>{s.label}</div>
                <span style={{ width: '28px', height: '28px', borderRadius: '6px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{s.icon}</span>
              </div>
              <div className="stat-card-value" style={{ color: s.color, fontSize: '1.5rem' }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Nearby Recommendations ── */}
      {nearbyRecommendations.length > 0 && (
        <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>🎯</span>
              <div>
                <h3 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 700 }}>Recommended Near You</h3>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Closest needs requiring urgent attention</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s ease-in-out infinite' }}></span>
              <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 600 }}>Live</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {nearbyRecommendations.map((need, i) => {
              const s = urgencyStyles[need.urgency] || urgencyStyles.Low;
              return (
                <div key={need.id} className="animate-slide-up"
                  style={{ animationDelay: `${i * 0.08}s`, background: 'var(--surface-1)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', padding: '1rem', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.transform = ''; }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.gradient }}></div>
                  {need.distance != null && <div style={{ position: 'absolute', top: '0.625rem', right: '0.625rem', background: 'var(--primary-light)', color: 'var(--primary-hover)', fontSize: '0.62rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)' }}>{formatDistance(need.distance)}</div>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', margin: '0.25rem 0 0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>{categoryIcons[need.category] || '📦'}</span>
                    <span className="badge" style={{ background: s.bg, color: s.color, fontSize: '0.58rem', border: `1px solid ${s.border}` }}>{need.urgency}</span>
                  </div>
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{need.title}</h4>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    📍 {need.location}
                    {need.peopleAffected && <span style={{ marginLeft: '0.5rem' }}>· 👥 {need.peopleAffected}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Map */}
      <div className="section-card" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{ height: '340px' }}>
          <MapContainer needs={needs} />
        </div>
      </div>

      {/* ── ADVANCED FILTER BAR ── */}
      <div className="section-card animate-fade-in" style={{ marginBottom: '1.25rem' }}>
        {/* Primary row: search + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem' }}>
          {/* Search input */}
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input
              type="text" placeholder="Search by title, location, reporter, category..."
              value={searchText} onChange={e => setSearchText(e.target.value)}
              style={{ paddingLeft: '2.25rem', paddingRight: searchText ? '2.25rem' : '0.875rem', width: '100%' }}
            />
            {searchText && (
              <button onClick={() => setSearchText('')} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
          {/* Filter toggle button */}
          <button onClick={() => setShowFilters(!showFilters)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem',
            borderRadius: 'var(--radius-sm)', border: showFilters ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
            background: showFilters ? 'var(--primary-light)' : 'var(--surface-2)',
            color: showFilters ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', transition: 'all 0.2s',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filters
            {activeFilterCount > 0 && (
              <span style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{activeFilterCount}</span>
            )}
          </button>
          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', minWidth: '150px', fontSize: '0.82rem', padding: '0.5rem 0.625rem' }} id="sort-needs">
            <option value="distance">📍 Nearest First</option>
            <option value="urgency">🔥 Urgency Level</option>
            <option value="recent">🕐 Most Recent</option>
            <option value="people">👥 Most People</option>
          </select>
          {/* View mode */}
          <div style={{ display: 'flex', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            {[
              { mode: 'grid', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg> },
              { mode: 'list', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> },
            ].map(({ mode, icon }) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: '0.5rem 0.625rem', border: 'none', cursor: 'pointer', background: viewMode === mode ? 'var(--primary)' : 'transparent', color: viewMode === mode ? 'white' : 'var(--text-muted)', transition: 'all 0.15s' }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Expanded filter panel */}
        {showFilters && (
          <div className="animate-fade-in" style={{ padding: '0 1.25rem 1rem', borderTop: '1px solid var(--surface-border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', paddingTop: '1rem' }}>
              {/* Category pills */}
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Category</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      style={{ padding: '0.3rem 0.625rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', background: categoryFilter === cat ? 'var(--primary)' : 'var(--surface-2)', color: categoryFilter === cat ? 'white' : 'var(--text-muted)', border: categoryFilter === cat ? 'none' : '1px solid var(--surface-border)', transition: 'all 0.15s' }}>
                      {cat === 'All' ? 'All' : `${categoryIcons[cat] || '📦'} ${cat}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Urgency Level</div>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {['All', 'High', 'Medium', 'Low'].map(u => {
                    const clr = u === 'High' ? 'var(--danger)' : u === 'Medium' ? 'var(--warning)' : u === 'Low' ? 'var(--success)' : null;
                    return (
                      <button key={u} onClick={() => setUrgencyFilter(u)}
                        style={{ padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', background: urgencyFilter === u ? (clr || 'var(--primary)') : 'var(--surface-2)', color: urgencyFilter === u ? 'white' : (clr || 'var(--text-muted)'), border: 'none', transition: 'all 0.15s' }}>
                        {u === 'High' ? '🔴' : u === 'Medium' ? '🟡' : u === 'Low' ? '🟢' : ''} {u}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Distance */}
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Distance from You</div>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {[
                    { val: 'all', label: 'Any' },
                    { val: '0.5', label: '< 500m' },
                    { val: '1', label: '< 1 km' },
                    { val: '5', label: '< 5 km' },
                    { val: '10', label: '< 10 km' },
                  ].map(opt => (
                    <button key={opt.val} onClick={() => setDistanceFilter(opt.val)}
                      style={{ padding: '0.3rem 0.625rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', background: distanceFilter === opt.val ? 'var(--accent)' : 'var(--surface-2)', color: distanceFilter === opt.val ? 'white' : 'var(--text-muted)', border: distanceFilter === opt.val ? 'none' : '1px solid var(--surface-border)', transition: 'all 0.15s' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filters summary & clear */}
            {activeFilterCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--surface-border)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{filteredNeeds.length} of {needs.length} needs match</span>
                <div style={{ flex: 1, display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {categoryFilter !== 'All' && <span style={{ fontSize: '0.7rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>Category: {categoryFilter}</span>}
                  {urgencyFilter !== 'All' && <span style={{ fontSize: '0.7rem', background: 'var(--warning-light)', color: 'var(--warning)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>Urgency: {urgencyFilter}</span>}
                  {distanceFilter !== 'all' && <span style={{ fontSize: '0.7rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>Within {distanceFilter} km</span>}
                  {searchText && <span style={{ fontSize: '0.7rem', background: 'var(--surface-3)', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>Search: "{searchText}"</span>}
                </div>
                <button onClick={clearAllFilters} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)', background: 'var(--danger-light)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.625rem', cursor: 'pointer' }}>Clear All</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── NEEDS CARDS ── */}
      {filteredNeeds.length === 0 ? (
        <div className="section-card">
          <div className="empty-state">
            <div className="empty-state-icon" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', fontSize: '2rem' }}>🔍</div>
            <h3>No needs match your filters</h3>
            <p>Try adjusting your search or filters to see more results</p>
            <button className="btn btn-secondary" onClick={clearAllFilters} style={{ marginTop: '1rem' }}>Clear Filters</button>
          </div>
        </div>
      ) : (
        <div style={viewMode === 'grid'
          ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))', gap: '1rem' }
          : { display: 'flex', flexDirection: 'column', gap: '0.625rem' }
        }>
          {filteredNeeds.map((need, i) => {
            const s = urgencyStyles[need.urgency] || urgencyStyles.Low;
            const isExpanded = expandedCard === need.id;
            return (
              <div key={need.id} className="card animate-fade-in"
                style={{ animationDelay: `${i * 0.04}s`, position: 'relative', overflow: 'hidden', borderTop: viewMode === 'grid' ? `3px solid ${s.color}` : 'none', borderLeft: viewMode === 'list' ? `4px solid ${s.color}` : 'none' }}>

                {viewMode === 'list' ? (
                  /* List view layout */
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{categoryIcons[need.category] || '📦'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{need.title}</h3>
                        <span className="badge" style={{ background: s.bg, color: s.color, fontSize: '0.6rem', border: `1px solid ${s.border}`, flexShrink: 0 }}>{need.urgency}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>📍 {need.location} {need.distance != null && `· ${formatDistance(need.distance)}`} · 👤 {need.postedBy}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      {need.peopleAffected && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>👥 {need.peopleAffected} need help</span>}
                      {need.volunteerCount > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', whiteSpace: 'nowrap', fontWeight: 600 }}>🙋 {need.volunteerCount} volunteer{need.volunteerCount !== 1 ? 's' : ''}</span>}
                    </div>
                    <button 
                      className={`btn ${need.volunteered ? 'btn-success' : 'btn-primary'} btn-sm`} 
                      style={{ fontSize: '0.75rem', flexShrink: 0 }}
                      onClick={() => !need.volunteered && onVolunteer && onVolunteer(need.id)}
                      disabled={need.volunteered}
                    >
                      {need.volunteered ? 'Volunteered ✅' : 'Volunteer'}
                    </button>
                  </div>
                ) : (
                  /* Grid view layout */
                  <>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{categoryIcons[need.category] || '📦'}</span>
                        <span className="badge" style={{ background: s.bg, color: s.color, fontSize: '0.62rem', fontWeight: 700, border: `1px solid ${s.border}` }}>{need.category}</span>
                        <span className="badge" style={{ background: s.bg, color: s.color, fontSize: '0.62rem', fontWeight: 700, border: `1px solid ${s.border}` }}>{need.urgency}</span>
                      </div>
                      {need.distance != null && (
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary-hover)', background: 'var(--primary-light)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>
                          📍 {formatDistance(need.distance)}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.35 }}>{need.title}</h3>
                    {need.description && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{need.description}</p>
                    )}

                    {/* Location */}
                    <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{need.location}</span>
                      </div>
                      {need.address && <div style={{ paddingLeft: '1rem', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{need.address}</div>}
                      {need.distance != null && <div style={{ paddingLeft: '1rem', fontSize: '0.68rem', color: 'var(--primary-hover)', fontWeight: 600, marginTop: '0.15rem' }}>↗ {formatDistance(need.distance)} from your location</div>}
                    </div>

                    {/* Reporter contact toggle */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <button onClick={() => setExpandedCard(isExpanded ? null : need.id)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.625rem', borderRadius: 'var(--radius-sm)', background: isExpanded ? 'var(--primary-light)' : 'var(--surface-2)', border: isExpanded ? '1px solid rgba(var(--primary-rgb),0.2)' : '1px solid var(--surface-border)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isExpanded ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isExpanded ? 'var(--primary)' : 'var(--text-secondary)' }}>{need.postedBy || 'Anonymous'}</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>· {need.postedAgo}</span>
                        </div>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isExpanded ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="2.5" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>

                      {isExpanded && (
                        <div className="animate-fade-in" style={{ marginTop: '0.375rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', border: '1px solid rgba(var(--primary-rgb),0.15)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Info</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                              {(need.postedBy || 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{need.postedBy || 'Anonymous'}</div>
                          </div>
                          {need.contactPhone && (
                            <a href={`tel:${need.contactPhone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.35rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.15)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)' }}>{need.contactPhone}</span>
                              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>Call</span>
                            </a>
                          )}
                          {need.contactEmail && (
                            <a href={`mailto:${need.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.35rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.15)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)' }}>{need.contactEmail}</span>
                              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>Email</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {need.peopleAffected && `👥 ${need.peopleAffected} need help`}
                        {need.volunteerCount > 0 && <span style={{ marginLeft: '8px', color: 'var(--primary)', fontWeight: 600 }}>· 🙋 {need.volunteerCount} volunteer{need.volunteerCount !== 1 ? 's' : ''}</span>}
                      </span>
                      <button 
                        className={`btn ${need.volunteered ? 'btn-success' : 'btn-primary'} btn-sm`} 
                        style={{ fontSize: '0.75rem', transition: 'all 0.2s' }}
                        onClick={() => !need.volunteered && onVolunteer && onVolunteer(need.id)}
                        disabled={need.volunteered}
                      >
                        {need.volunteered ? (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Volunteered
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                            Volunteer
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NeedsDashboard;
