import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange 
} from '../firebase/auth';

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
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmail(email, password);
      
      if (result.success) {
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast.error('Login failed');
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const result = await signUpWithEmail(userData.email, userData.password, userData);
      
      if (result.success) {
        toast.success('Registration successful!');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast.error('Registration failed');
      return { success: false, error: 'Registration failed' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        toast.success('Google login successful!');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast.error('Google login failed');
      return { success: false, error: 'Google login failed' };
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
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
