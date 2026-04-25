import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from '../hooks/useLocationContext';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons based on urgency
const getIcon = (urgency) => {
  const colors = { 'High': '#ef4444', 'Medium': '#f59e0b', 'Low': '#10b981' };
  const color = colors[urgency] || '#6366f1';

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.4"/></filter></defs>
      <path filter="url(#s)" fill="${color}" stroke="white" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

// User location icon — pulsing blue dot
const userIcon = L.divIcon({
  className: 'user-location-icon',
  html: `<div style="position:relative;width:24px;height:24px">
    <div style="position:absolute;inset:0;background:rgba(99,102,241,0.2);border-radius:50%;animation:pulse 2s ease-in-out infinite"></div>
    <div style="position:absolute;top:6px;left:6px;width:12px;height:12px;background:#6366f1;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(99,102,241,0.5)"></div>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Helper — auto-center map when user location is available
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 14, { animate: true });
  }, [lat, lng]);
  return null;
};

const MapContainer = ({ needs }) => {
  const { userLocation, locationName, isLocating } = useLocation();

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [40.7128, -74.0060];

  return (
    <div className="map-container-wrapper" style={{ position: 'relative' }}>
      {/* Location status badge */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px', zIndex: 1000,
        background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)',
        borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        border: '1px solid rgba(255,255,255,0.1)', maxWidth: '280px'
      }}>
        {isLocating ? (
          <>
            <span className="spinner spinner-sm"></span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Locating you...</span>
          </>
        ) : (
          <>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,0.6)',
              flexShrink: 0
            }}></span>
            <span style={{ fontSize: '0.72rem', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              📍 {locationName || 'Your Location'}
            </span>
          </>
        )}
      </div>

      <LeafletMap center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        {/* Google Maps Tiles */}
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
          attribution='Map data &copy; Google'
          maxZoom={20}
        />

        {/* Auto-center on user */}
        {userLocation && <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />}

        {/* User location marker */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={500}
              pathOptions={{
                color: '#6366f1',
                fillColor: '#6366f1',
                fillOpacity: 0.06,
                weight: 1.5,
                dashArray: '6 4'
              }}
            />
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>📍 Your Location</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{locationName}</span>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Need markers */}
        {needs.map(need => (
          <Marker
            key={need.id}
            position={[need.latitude, need.longitude]}
            icon={getIcon(need.urgency)}
          >
            <Popup>
              <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '200px' }}>
                <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>{need.title}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-block', padding: '2px 8px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 700,
                    background: need.urgency === 'High' ? '#fef2f2' : need.urgency === 'Medium' ? '#fffbeb' : '#f0fdf4',
                    color: need.urgency === 'High' ? '#ef4444' : need.urgency === 'Medium' ? '#f59e0b' : '#10b981'
                  }}>{need.urgency}</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{need.category}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#1e293b', marginBottom: '4px' }}>📍 {need.location}</div>
                {need.address && <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '4px' }}>{need.address}</div>}
                {need.peopleAffected && <div style={{ fontSize: '0.7rem', color: '#64748b' }}>👥 {need.peopleAffected} people affected</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
