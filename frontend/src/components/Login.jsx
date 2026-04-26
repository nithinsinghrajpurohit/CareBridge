import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginToken } from '../api';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('admin');
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shakeForm, setShakeForm] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // 2FA state
  const [show2FA, setShow2FA] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const otpRefs = useRef([]);

  // Validation states
  const [emailValid, setEmailValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  // Real-time email validation
  useEffect(() => {
    if (!email) { setEmailValid(null); return; }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(re.test(email));
  }, [email]);

  // Real-time password strength
  useEffect(() => {
    if (!password || !isSignUp) { setPasswordStrength(null); return; }
    if (password.length < 6) setPasswordStrength('weak');
    else if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [password, isSignUp]);

  // Real-time confirm password match
  useEffect(() => {
    if (!confirmPassword) { setPasswordsMatch(null); return; }
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setErrorMsg('');
  };

  const toggleMode = () => {
    setIsSignUp(prev => !prev);
    setErrorMsg('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setOrgName('');
    setExpertise('');
    setAgreeTerms(false);
    setEmailValid(null);
    setPasswordStrength(null);
    setPasswordsMatch(null);
    setShow2FA(false);
    setOtpDigits(['', '', '', '', '', '']);
  };

  const triggerShake = (msg) => {
    setErrorMsg(msg);
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!username.trim()) return triggerShake('Please enter your Access ID.');
    if (!password.trim()) return triggerShake('Please enter your passcode.');

    // Sign Up validations
    if (isSignUp) {
      if (!email || !emailValid) return triggerShake('Please enter a valid email address.');
      if (password.length < 6) return triggerShake('Password must be at least 6 characters.');
      if (password !== confirmPassword) return triggerShake('Passwords do not match.');
      if (!agreeTerms) return triggerShake('You must agree to the Terms & Privacy Policy.');
      if (role === 'admin' && !orgName.trim()) return triggerShake('Please enter your organization name.');
      if (role === 'volunteer' && !expertise) return triggerShake('Please select your area of expertise.');
    }

    setIsLoading(true);
    setErrorMsg('');

    // Simulate network request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);

    if (isSignUp) {
      // Sign up: go directly (demo mode)
      try { await loginToken(username, password); } catch {}
      onLoginSuccess(role);
    } else {
      // Sign in: show 2FA step
      setShow2FA(true);
    }
  };

  // ── 2FA OTP Handling ──
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setOtpDigits(newDigits);
    const nextEmpty = newDigits.findIndex(d => !d);
    otpRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleVerify2FA = async () => {
    const code = otpDigits.join('');
    if (code.length < 6) return triggerShake('Please enter the full 6-digit code.');

    setOtpVerifying(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOtpVerifying(false);

    // Store remember me preference
    if (rememberMe) {
      localStorage.setItem('carebridge_remember', 'true');
    }

    try { await loginToken(username, password); } catch {}
    onLoginSuccess(role);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    onLoginSuccess(role);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
  };

  const handleBack2FA = () => {
    setShow2FA(false);
    setOtpDigits(['', '', '', '', '', '']);
    setErrorMsg('');
  };

  // SVG Icons
  const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
  );
  const XIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff1744" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  );

  return (
    <div className={`login-page ${role === 'volunteer' ? 'volunteer-mode' : ''}`}>
      {/* Background Orbs */}
      <div className="login-bg-orb login-orb-1"></div>
      <div className="login-bg-orb login-orb-2"></div>
      <div className="login-bg-orb login-orb-3"></div>

      {/* ═══ LEFT PANEL ═══ */}
      <div className="login-panel-left">
        <div className="login-image-box volunteer-img">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80" alt="Community Volunteers" />
          <div className="img-overlay"></div>
          <div className="img-caption">
            <h2>🤝 Make a Difference</h2>
            <p>Join thousands of volunteers helping communities recover and rebuild.</p>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL ═══ */}
      <div className="login-panel-right">
        <div className="login-image-box operator-img">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" alt="Global Network" />
          <div className="img-overlay"></div>
          <div className="img-caption">
            <h2>🌐 Command Center</h2>
            <p>Real-time logistics monitoring powered by AI. Manage resources and coordinate responses.</p>
          </div>
        </div>
      </div>

      {/* ═══ THE LOGIN CARD ═══ */}
      <div className={`login-card ${shakeForm ? 'shake' : ''}`}>
        <div className="login-logo">
          <div className="login-logo-icon" style={role === 'volunteer' ? { background: 'linear-gradient(135deg, #b388ff, #00e5ff)' } : {}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        {/* ═══ 2FA VERIFICATION VIEW ═══ */}
        {show2FA ? (
          <div className="twofa-container" key="2fa">
            <div className="twofa-icon">🔐</div>
            <h1 className="login-title">Two-Factor Verification</h1>
            <p className="login-subtitle">
              We've sent a 6-digit code to your registered device. Enter it below to complete sign-in.
            </p>

            {errorMsg && <div className="login-error">{errorMsg}</div>}

            <div className="otp-input-group" onPaste={handleOtpPaste}>
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={el => otpRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`otp-box ${digit ? 'filled' : ''}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <p className="otp-hint">
              Didn't receive a code? <button type="button" className="mode-toggle-btn" onClick={() => { setOtpDigits(['', '', '', '', '', '']); otpRefs.current[0]?.focus(); }}>Resend</button>
            </p>

            <button
              className="login-submit-btn"
              onClick={handleVerify2FA}
              disabled={otpVerifying}
              style={role === 'volunteer' ? { background: '#b388ff' } : {}}
            >
              {otpVerifying ? (
                <span className="btn-loading">
                  <span className="spinner-dots"><span></span><span></span><span></span></span>
                  Verifying...
                </span>
              ) : 'Verify & Sign In'}
            </button>

            <button type="button" className="back-btn" onClick={handleBack2FA}>
              ← Back to Sign In
            </button>
          </div>
        ) : (
          /* ═══ NORMAL LOGIN / SIGNUP VIEW ═══ */
          <>
            <h1 className="login-title">
              {isSignUp
                ? (role === 'admin' ? 'Create Operator Account' : 'Join as Volunteer')
                : (role === 'admin' ? 'Operator Access' : 'Volunteer Portal')
              }
            </h1>
            <p className="login-subtitle">
              {isSignUp
                ? (role === 'admin' ? 'Set up your command center credentials' : 'Sign up to support your community')
                : (role === 'admin' ? 'Sign in to manage logistics' : 'Sign in to support the community')
              }
            </p>

            <div className="role-tabs">
              <button type="button" className={`role-tab ${role === 'admin' ? 'active' : ''}`} onClick={() => handleRoleSwitch('admin')}>
                Operator
              </button>
              <button type="button" className={`role-tab ${role === 'volunteer' ? 'active' : ''}`} onClick={() => handleRoleSwitch('volunteer')}>
                Volunteer
              </button>
            </div>

            {errorMsg && <div className="login-error">{errorMsg}</div>}

            <div className="form-crossfade-wrapper" key={isSignUp ? 'signup' : 'signin'}>
              <form className="login-form" onSubmit={handleSubmit}>

                {/* ── Sign Up: Email ── */}
                {isSignUp && (
                  <div className="input-group">
                    <label>Email Address</label>
                    <div className="input-with-icon">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                      {emailValid !== null && (
                        <span className="input-validation-icon">{emailValid ? <CheckIcon /> : <XIcon />}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Access ID ── */}
                <div className="input-group">
                  <label>{isSignUp ? 'Username' : 'Access ID'}</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={isSignUp ? 'Choose a username' : 'Enter your Access ID'} required />
                </div>

                {/* ── Password ── */}
                <div className="input-group">
                  <label>Passcode</label>
                  <div className="input-with-icon">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {isSignUp && passwordStrength && (
                    <div className="password-strength">
                      <div className={`strength-bar ${passwordStrength}`}><div className="strength-fill"></div></div>
                      <span className={`strength-label ${passwordStrength}`}>
                        {passwordStrength === 'weak' && 'Weak'}
                        {passwordStrength === 'medium' && 'Medium'}
                        {passwordStrength === 'strong' && 'Strong'}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── Confirm Password (Sign Up) ── */}
                {isSignUp && (
                  <div className="input-group">
                    <label>Confirm Passcode</label>
                    <div className="input-with-icon">
                      <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
                      <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                      {passwordsMatch !== null && (
                        <span className="input-validation-icon" style={{ right: '42px' }}>{passwordsMatch ? <CheckIcon /> : <XIcon />}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Role-specific Sign Up fields ── */}
                {isSignUp && role === 'admin' && (
                  <div className="input-group">
                    <label>Organization Name</label>
                    <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g., Red Cross Chapter" required />
                  </div>
                )}
                {isSignUp && role === 'volunteer' && (
                  <div className="input-group">
                    <label>Area of Expertise</label>
                    <select className="login-select" value={expertise} onChange={(e) => setExpertise(e.target.value)} required>
                      <option value="" disabled>Select your skill</option>
                      <option value="medical">🏥 Medical & First Aid</option>
                      <option value="logistics">📦 Logistics & Transport</option>
                      <option value="food">🍲 Food Distribution</option>
                      <option value="shelter">🏠 Shelter & Housing</option>
                      <option value="education">📚 Education & Tutoring</option>
                      <option value="tech">💻 Tech & Communications</option>
                      <option value="general">🙋 General Volunteer</option>
                    </select>
                  </div>
                )}

                {/* ── Forgot Password + Remember Me (Sign In only) ── */}
                {!isSignUp && (
                  <div className="signin-options-row">
                    <label className="remember-checkbox">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                      <span className="custom-checkbox-sm">{rememberMe && <CheckIcon />}</span>
                      <span>Remember me for 30 days</span>
                    </label>
                    <button type="button" className="forgot-password-link" onClick={() => setShowForgotModal(true)}>
                      Forgot passcode?
                    </button>
                  </div>
                )}

                {/* ── Terms Checkbox (Sign Up only) ── */}
                {isSignUp && (
                  <label className="terms-checkbox">
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                    <span className="custom-checkbox">{agreeTerms && <CheckIcon />}</span>
                    <span className="terms-text">
                      I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                    </span>
                  </label>
                )}

                {/* ── Submit ── */}
                <button className="login-submit-btn" disabled={isLoading} style={role === 'volunteer' ? { background: '#b388ff' } : {}}>
                  {isLoading ? (
                    <span className="btn-loading">
                      <span className="spinner-dots"><span></span><span></span><span></span></span>
                      Authenticating...
                    </span>
                  ) : isSignUp
                    ? `Create ${role === 'admin' ? 'Operator' : 'Volunteer'} Account`
                    : `Sign In as ${role === 'admin' ? 'Operator' : 'Volunteer'}`
                  }
                </button>
              </form>
            </div>

            {/* ── Divider ── */}
            <div className="login-divider">
              <div className="line"></div>
              <span>Or continue with</span>
              <div className="line"></div>
            </div>

            {/* ── Google Login ── */}
            <div className="google-login-wrapper">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setErrorMsg('Google Authentication Failed')} theme="filled_black" shape="pill" width="100%" />
            </div>

            {/* ── Mode Toggle ── */}
            <p className="mode-toggle-text">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button type="button" className="mode-toggle-btn" onClick={toggleMode}>
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </>
        )}
      </div>

      {/* ═══ FORGOT PASSWORD MODAL ═══ */}
      {showForgotModal && (
        <div className="forgot-modal-overlay" onClick={() => { setShowForgotModal(false); setForgotSent(false); setForgotEmail(''); }}>
          <div className="forgot-modal" onClick={(e) => e.stopPropagation()}>
            <button className="forgot-modal-close" onClick={() => { setShowForgotModal(false); setForgotSent(false); setForgotEmail(''); }}>✕</button>
            {!forgotSent ? (
              <>
                <div className="forgot-modal-icon">🔑</div>
                <h2>Reset Your Passcode</h2>
                <p>Enter your email address and we'll send you a reset link.</p>
                <form onSubmit={handleForgotSubmit}>
                  <div className="input-group">
                    <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="Enter your email" required />
                  </div>
                  <button className="login-submit-btn" type="submit">Send Reset Link</button>
                </form>
              </>
            ) : (
              <div className="forgot-success">
                <div className="forgot-success-icon">✅</div>
                <h2>Email Sent!</h2>
                <p>Check your inbox for the reset link. Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
