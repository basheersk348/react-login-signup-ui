import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [shakingFields, setShakingFields] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const triggerFieldShake = (errors) => {
    setShakingFields({});
    setTimeout(() => {
      const shakeState = {};
      if (errors.email) shakeState.email = true;
      if (errors.password) shakeState.password = true;
      if (errors.confirmPassword) shakeState.confirmPassword = true;
      setShakingFields(shakeState);
    }, 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a full valid email (e.g. name@gmail.com)';
    }

    if (!validatePassword(formData.password)) {
      errors.password = 'Must be min 8 chars: 1 upper, 1 lower, 1 number, 1 symbol (@$!%*?&)';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match!';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      triggerFieldShake(errors);
      return;
    }

    const result = signup({ name: formData.name, email: formData.email, password: formData.password });

    if (result && !result.success) {
      const registeredError = { email: result.message };
      setFieldErrors(registeredError);
      triggerFieldShake(registeredError);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="john@gmail.com" 
            className={fieldErrors.email ? 'input-error' : ''}
          />
          {fieldErrors.email && (
            <span 
              className={`field-error-text ${shakingFields.email ? 'shake-animation' : ''}`}
              onAnimationEnd={() => setShakingFields((prev) => ({ ...prev, email: false }))}
            >
              {fieldErrors.email}
            </span>
          )}
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="••••••••" 
              className={fieldErrors.password ? 'input-error' : ''}
            />
            <button 
              type="button" 
              className="toggle-password-btn" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <span 
              className={`field-error-text ${shakingFields.password ? 'shake-animation' : ''}`}
              onAnimationEnd={() => setShakingFields((prev) => ({ ...prev, password: false }))}
            >
              {fieldErrors.password}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              placeholder="••••••••" 
              className={fieldErrors.confirmPassword ? 'input-error' : ''}
            />
            <button 
              type="button" 
              className="toggle-password-btn" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <span 
              className={`field-error-text ${shakingFields.confirmPassword ? 'shake-animation' : ''}`}
              onAnimationEnd={() => setShakingFields((prev) => ({ ...prev, confirmPassword: false }))}
            >
              {fieldErrors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
  );
};

export default SignUp;