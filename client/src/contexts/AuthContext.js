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

  // Demo credentials
  const demoCredentials = [
    { email: 'demo@automation-platform.com', password: 'demo123', role: 'Admin', name: 'Demo Admin' },
    { email: 'agency@demo.com', password: 'agency123', role: 'Agency', name: 'Marketing Agency' },
    { email: 'consultant@demo.com', password: 'consultant123', role: 'Consultant', name: 'Business Consultant' }
  ];

  // Check for existing demo session
  useEffect(() => {
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check demo credentials
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
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.error('Registration not available in demo mode');
    setLoading(false);
    return { success: false, error: 'Registration not available in demo mode' };
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.error('Google login not available in demo mode');
    setLoading(false);
    return { success: false, error: 'Google login not available in demo mode' };
  };

  const logout = async () => {
    localStorage.removeItem('demoUser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('demoUser', JSON.stringify(updatedUser));
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
