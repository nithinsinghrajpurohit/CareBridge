import { useState, useEffect, createContext, useContext } from 'react';

const LocationContext = createContext(null);

export const useLocation = () => useContext(LocationContext);

// Haversine formula — distance between two lat/lng points in km
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const formatDistance = (km) => {
  if (km < 1) return `${Math.round(km * 1000)}m away`;
  if (km < 10) return `${km.toFixed(1)} km away`;
  return `${Math.round(km)} km away`;
};

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setUserLocation(coords);
        setIsLocating(false);

        // Reverse geocode to get readable address
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=16&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          if (data.address) {
            const parts = [];
            if (data.address.suburb || data.address.neighbourhood) parts.push(data.address.suburb || data.address.neighbourhood);
            if (data.address.city || data.address.town || data.address.village) parts.push(data.address.city || data.address.town || data.address.village);
            if (data.address.state) parts.push(data.address.state);
            setLocationName(parts.join(', ') || data.display_name?.split(',').slice(0, 3).join(','));
          }
        } catch (e) {
          console.warn('Reverse geocoding failed:', e);
          setLocationName(`${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E`);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setLocationError(error.message);
        setIsLocating(false);
        // Fallback location (New York)
        setUserLocation({ lat: 40.7128, lng: -74.0060, accuracy: 0 });
        setLocationName('New York, NY (default)');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, locationError, isLocating, locationName }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
