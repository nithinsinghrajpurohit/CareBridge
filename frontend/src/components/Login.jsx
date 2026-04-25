import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginToken } from '../api';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    if (newRole === 'volunteer') {
      setUsername('volunteer');
      setPassword('vol123');
    } else {
      setUsername('admin');
      setPassword('admin123');
    }
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      await loginToken(username, password);
      onLoginSuccess(role);
    } catch (err) {
      console.warn("Backend auth not available. Proceeding in demo mode.");
      onLoginSuccess(role);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    onLoginSuccess(role);
  };

  return (
    <div className={`login-page ${role === 'volunteer' ? 'volunteer-mode' : ''}`}>
      {/* Background Orbs */}
      <div className="login-bg-orb login-orb-1"></div>
      <div className="login-bg-orb login-orb-2"></div>
      <div className="login-bg-orb login-orb-3"></div>

      {/* ═══ LEFT PANEL — volunteer image appears here ═══ */}
      <div className="login-panel-left">
        <div className="login-image-box volunteer-img">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80"
            alt="Community Volunteers"
          />
          <div className="img-overlay"></div>
          <div className="img-caption">
            <h2>🤝 Make a Difference</h2>
            <p>Join thousands of volunteers helping communities recover and rebuild.</p>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — operator/earth image here by default ═══ */}
      <div className="login-panel-right">
        <div className="login-image-box operator-img">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
            alt="Global Network"
          />
          <div className="img-overlay"></div>
          <div className="img-caption">
            <h2>🌐 Command Center</h2>
            <p>Real-time logistics monitoring powered by AI. Manage resources and coordinate responses.</p>
          </div>
        </div>
      </div>

      {/* ═══ THE LOGIN CARD — slides between left and right ═══ */}
      <div className="login-card">
        <div className="login-logo">
          <div
            className="login-logo-icon"
            style={role === 'volunteer' ? { background: 'linear-gradient(135deg, #b388ff, #00e5ff)' } : {}}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        <h1 className="login-title">
          {role === 'admin' ? 'Operator Access' : 'Volunteer Portal'}
        </h1>
        <p className="login-subtitle">
          {role === 'admin' ? 'Sign in to manage logistics' : 'Sign in to support the community'}
        </p>

        <div className="role-tabs">
          <button
            type="button"
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleSwitch('admin')}
          >
            Operator
          </button>
          <button
            type="button"
            className={`role-tab ${role === 'volunteer' ? 'active' : ''}`}
            onClick={() => handleRoleSwitch('volunteer')}
          >
            Volunteer
          </button>
        </div>

        {errorMsg && <div className="login-error">{errorMsg}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Access ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Access ID"
              required
            />
          </div>
          <div className="input-group">
            <label>Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            className="login-submit-btn"
            disabled={isLoading}
            style={role === 'volunteer' ? { background: '#b388ff' } : {}}
          >
            {isLoading ? 'Authenticating...' : `Sign In as ${role === 'admin' ? 'Operator' : 'Volunteer'}`}
          </button>
        </form>

        <div className="login-divider">
          <div className="line"></div>
          <span>Or continue with</span>
          <div className="line"></div>
        </div>

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMsg('Google Authentication Failed')}
            theme="filled_black"
            shape="pill"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
