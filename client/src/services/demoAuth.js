/**
 * Demo Authentication Service
 * ==========================
 * 
 * This service provides demo authentication that bypasses Firebase
 * when in demo mode, allowing users to login with demo credentials.
 */

import { DEMO_CONFIG } from '../demo-config';

class DemoAuthService {
  constructor() {
    this.isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';
    this.currentUser = null;
    this.listeners = [];
  }

  // Check if we're in demo mode
  isDemoModeEnabled() {
    return this.isDemoMode;
  }

  // Demo login function
  async signInWithEmail(email, password) {
    if (!this.isDemoModeEnabled()) {
      throw new Error('Demo mode not enabled');
    }

    // Find demo user
    const demoUser = DEMO_CONFIG.users.find(
      user => user.email === email && user.password === password
    );

    if (!demoUser) {
      throw new Error('Invalid demo credentials');
    }

    // Create user object (without password)
    const { password: _, ...userData } = demoUser;
    this.currentUser = {
      ...userData,
      uid: `demo_${userData.role}_${Date.now()}`,
      provider: 'demo'
    };

    // Store in localStorage
    localStorage.setItem('demo_user', JSON.stringify(this.currentUser));
    localStorage.setItem('demo_token', `demo_token_${Date.now()}`);

    // Notify listeners
    this.notifyListeners(this.currentUser);

    return {
      success: true,
      user: this.currentUser
    };
  }

  // Demo sign up (for demo purposes)
  async signUpWithEmail(email, password, userData) {
    if (!this.isDemoModeEnabled()) {
      throw new Error('Demo mode not enabled');
    }

    // In demo mode, just sign in as a demo user
    return this.signInWithEmail(email, password);
  }

  // Demo sign out
  async signOut() {
    if (!this.isDemoModeEnabled()) {
      throw new Error('Demo mode not enabled');
    }

    this.currentUser = null;
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_token');
    
    // Notify listeners
    this.notifyListeners(null);

    return { success: true };
  }

  // Get current user
  getCurrentUser() {
    if (!this.isDemoModeEnabled()) {
      return null;
    }

    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to get from localStorage
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }

    return null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Get auth token
  getToken() {
    if (!this.isDemoModeEnabled()) {
      return null;
    }

    return localStorage.getItem('demo_token');
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    if (!this.isDemoModeEnabled()) {
      return () => {};
    }

    this.listeners.push(callback);

    // Call immediately with current user
    const currentUser = this.getCurrentUser();
    callback(currentUser);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  notifyListeners(user) {
    this.listeners.forEach(callback => {
      try {
        callback(user);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }

  // Demo Google sign in (just returns demo user)
  async signInWithGoogle() {
    if (!this.isDemoModeEnabled()) {
      throw new Error('Demo mode not enabled');
    }

    // Return admin demo user for Google sign in
    return this.signInWithEmail('demo@automation-suite.com', 'demo123');
  }

  // Initialize demo auth
  initialize() {
    if (!this.isDemoModeEnabled()) {
      return;
    }

    // Check for existing session
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.notifyListeners(currentUser);
    }
  }
}

// Create singleton instance
const demoAuth = new DemoAuthService();

// Auto-initialize
demoAuth.initialize();

export default demoAuth;
