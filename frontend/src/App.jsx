import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout
import Layout from './components/Layout';
import Login from './components/Login';

// Pages
import Dashboard from './pages/Dashboard';
import NeedsDashboard from './pages/NeedsDashboard';
import ReportNeed from './pages/ReportNeed';
import VolunteerHub from './pages/VolunteerHub';
import Analytics from './pages/Analytics';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import MyReports from './pages/MyReports';
import Landing from './pages/Landing';

// API & Data
import { fetchIssues, createIssue } from './api';
import { useLocation } from './hooks/useLocationContext';
import { generateDemoNeeds } from './data/demoNeeds';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || null);
  const [needs, setNeeds] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const { userLocation } = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, userLocation]);

  const loadData = async () => {
    try {
      const data = await fetchIssues();
      if (data && data.length > 0) {
        setNeeds(data);
      } else {
        throw new Error('No data');
      }
    } catch (e) {
      console.warn('Backend offline — generating location-based demo data');
      // Generate demo needs around user's actual location
      const lat = userLocation?.lat || 40.7128;
      const lng = userLocation?.lng || -74.0060;
      setNeeds(generateDemoNeeds(lat, lng));
    }
  };

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('user_role', role);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleAddNeed = async (newNeed) => {
    setIsPredicting(true);
    try {
      // Hackathon UI Delay to show off the ML Terminal
      await new Promise(resolve => setTimeout(resolve, 3200));
      const created = await createIssue(newNeed);
      setNeeds([created, ...needs]);
    } catch (e) {
      console.error('Failed to report need', e);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleUpdateNeed = (updatedNeed) => {
    setNeeds(current => current.map(n => n.id === updatedNeed.id ? updatedNeed : n));
  };

  const handleDeleteNeed = (id) => {
    setNeeds(current => current.filter(n => n.id !== id));
  };

  const handleVolunteer = (needId) => {
    setNeeds(currentNeeds => 
      currentNeeds.map(need => 
        need.id === needId 
          ? { ...need, volunteered: true, volunteerCount: (need.volunteerCount || 0) + 1 }
          : need
      )
    );
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Layout role={userRole} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to={userRole === 'admin' ? "/dashboard" : "/volunteers"} replace />} />
        
        {/* Admin / Operator Routes */}
        {userRole === 'admin' && (
          <>
            <Route path="/dashboard" element={<Dashboard needs={needs} />} />
            <Route path="/needs" element={<NeedsDashboard needs={needs} onVolunteer={handleVolunteer} />} />
            <Route path="/report" element={<ReportNeed onAddNeed={handleAddNeed} isPredicting={isPredicting} />} />
            <Route path="/analytics" element={<Analytics needs={needs} />} />
            <Route path="/community" element={<Community />} />
            <Route path="/my-reports" element={<MyReports needs={needs} onUpdate={handleUpdateNeed} onDelete={handleDeleteNeed} />} />
          </>
        )}

        {/* Volunteer Routes */}
        {userRole === 'volunteer' && (
          <Route path="/volunteers" element={<VolunteerHub needs={needs} onVolunteer={handleVolunteer} />} />
        )}

        {/* Admins can also see volunteer hub if needed, but keeping it strict per request for separated dashboards */}
        {userRole === 'admin' && (
           <Route path="/volunteers" element={<VolunteerHub needs={needs} onVolunteer={handleVolunteer} />} />
        )}

        {/* Shared Routes */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
        
        <Route path="*" element={<Navigate to={userRole === 'admin' ? "/dashboard" : "/volunteers"} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
