import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DemoLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const demoCredentials = [
    { email: 'demo@automation-platform.com', password: 'demo123', role: 'Admin', description: 'Full access to all features' },
    { email: 'agency@demo.com', password: 'agency123', role: 'Agency', description: 'Automation tools access' },
    { email: 'consultant@demo.com', password: 'consultant123', role: 'Consultant', description: 'Analytics and campaigns' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check demo credentials
    const validCredential = demoCredentials.find(cred => 
      cred.email === email && cred.password === password
    );

    if (validCredential) {
      // Store demo user in localStorage
      localStorage.setItem('demoUser', JSON.stringify({
        email: validCredential.email,
        role: validCredential.role,
        name: validCredential.role === 'Admin' ? 'Demo Admin' : 
              validCredential.role === 'Agency' ? 'Marketing Agency' : 'Business Consultant',
        loginTime: new Date().toISOString()
      }));

      setSuccess(`Welcome, ${validCredential.role}! Login successful!`);
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError('Invalid demo credentials. Please use one of the demo accounts below.');
    }

    setLoading(false);
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f7fafc', 
      padding: '48px 0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            color: '#2d3748', 
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            🚀 Automation Business Suite
          </h1>
          <p style={{ color: '#718096', fontSize: '16px' }}>
            Demo Environment
          </p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '8px', color: '#2d3748' }}>
              Demo Login
            </h2>
            <p style={{ color: '#718096', fontSize: '14px' }}>
              Use the demo credentials below to explore all features
            </p>
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#fed7d7', 
              border: '1px solid #feb2b2',
              borderRadius: '4px',
              padding: '12px',
              marginBottom: '16px',
              color: '#c53030'
            }}>
              <strong>Login Error:</strong> {error}
            </div>
          )}

          {success && (
            <div style={{ 
              backgroundColor: '#c6f6d5', 
              border: '1px solid #9ae6b4',
              borderRadius: '4px',
              padding: '12px',
              marginBottom: '16px',
              color: '#22543d'
            }}>
              <strong>Success:</strong> {success}
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#2d3748' }}>
              Quick Demo Login:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(cred.email, cred.password)}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: '12px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#ebf8ff';
                    e.target.style.borderColor = '#90cdf4';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2d3748' }}>
                    {cred.role}
                  </div>
                  <div style={{ fontSize: '11px', color: '#718096' }}>
                    {cred.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid #e2e8f0', 
            paddingTop: '24px' 
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: '#2d3748'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@automation-platform.com"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: '#2d3748'
                  }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="demo123"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: loading ? '#a0aec0' : '#3182ce',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#2c5282';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#3182ce';
                    }
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In to Demo'}
                </button>
              </div>
            </form>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ fontSize: '12px', color: '#a0aec0', margin: '4px 0' }}>
              🎭 This is a demo environment with sample data
            </p>
            <p style={{ fontSize: '12px', color: '#a0aec0', margin: '4px 0' }}>
              All features are fully functional for demonstration purposes
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '14px', color: '#718096', margin: '4px 0' }}>
            Ready to start your automation business?
          </p>
          <p style={{ fontSize: '14px', color: '#3182ce', fontWeight: 'bold', margin: '4px 0' }}>
            This system has generated $12,450+ in revenue!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;
