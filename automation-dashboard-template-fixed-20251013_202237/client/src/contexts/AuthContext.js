import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Check if we're in demo mode
  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';

  // Demo credentials
  const demoCredentials = [
    { email: 'demo@automation-platform.com', password: 'demo123', role: 'Admin', name: 'Demo Admin' },
    { email: 'agency@demo.com', password: 'agency123', role: 'Agency', name: 'Marketing Agency' },
    { email: 'consultant@demo.com', password: 'consultant123', role: 'Consultant', name: 'Business Consultant' }
  ];

  // Check for existing user session
  useEffect(() => {
    const demoUser = localStorage.getItem('demoUser');
    const regularUser = localStorage.getItem('user');
    
    if (demoUser) {
      setUser(JSON.parse(demoUser));
    } else if (regularUser) {
      setUser(JSON.parse(regularUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isDemoMode) {
      // Check demo credentials only in demo mode
      const validCredential = demoCredentials.find(cred => 
        cred.email === email && cred.password === password
      );

      if (validCredential) {
        const userData = {
          email: validCredential.email,
          role: validCredential.role,
          name: validCredential.name,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('demoUser', JSON.stringify(userData));
        setUser(userData);
        toast.success('Login successful!');
        setLoading(false);
        return { success: true };
      } else {
        toast.error('Invalid demo credentials');
        setLoading(false);
        return { success: false, error: 'Invalid demo credentials' };
      }
    } else {
      // Production mode - implement real authentication
      // For now, accept any email/password combination
      if (email && password) {
        const userData = {
          email: email,
          role: 'User',
          name: email.split('@')[0],
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Login successful!');
        setLoading(false);
        return { success: true };
      } else {
        toast.error('Please enter valid email and password');
        setLoading(false);
        return { success: false, error: 'Please enter valid email and password' };
      }
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isDemoMode) {
      toast.error('Registration not available in demo mode');
      setLoading(false);
      return { success: false, error: 'Registration not available in demo mode' };
    }
    
    // TODO: Implement real registration logic here
    toast.success('Registration successful!');
    setLoading(false);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isDemoMode) {
      toast.error('Google login not available in demo mode');
      setLoading(false);
      return { success: false, error: 'Google login not available in demo mode' };
    }
    
    // TODO: Implement real Google login logic here
    toast.success('Google login successful!');
    setLoading(false);
    return { success: true };
  };

  const logout = async () => {
    localStorage.removeItem('demoUser');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    // Save to appropriate storage based on user type
    if (isDemoMode) {
      localStorage.setItem('demoUser', JSON.stringify(updatedUser));
    } else {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
