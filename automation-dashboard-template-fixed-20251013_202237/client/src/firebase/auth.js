import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import demoAuth from '../services/demoAuth';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (email, password, userData) => {
  // Use demo auth if in demo mode
  if (demoAuth.isDemoModeEnabled()) {
    return demoAuth.signUpWithEmail(email, password, userData);
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, {
      displayName: userData.name
    });
    
    // Try to save additional user data to Firestore
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: user.email,
        company: userData.company || '',
        phone: userData.phone || '',
        provider: 'email',
        createdAt: new Date().toISOString(),
        isActive: true
      });
    } catch (firestoreError) {
      console.log('Firestore offline - using local storage fallback');
      // Store user data in localStorage as fallback
      const fallbackUserData = {
        uid: user.uid,
        name: userData.name,
        email: user.email,
        company: userData.company || '',
        phone: userData.phone || '',
        provider: 'email',
        createdAt: new Date().toISOString(),
        isActive: true
      };
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(fallbackUserData));
    }
    
    return {
      success: true,
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        company: userData.company || '',
        phone: userData.phone || '',
        provider: 'email'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  // Use demo auth if in demo mode
  if (demoAuth.isDemoModeEnabled()) {
    return demoAuth.signInWithEmail(email, password);
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Try to get user data from Firestore
    let userData = null;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      userData = userDoc.data();
    } catch (firestoreError) {
      console.log('Firestore offline - checking local storage');
      // Try to get user data from localStorage as fallback
      const localData = localStorage.getItem(`user_${user.uid}`);
      if (localData) {
        userData = JSON.parse(localData);
      }
    }
    
    return {
      success: true,
      user: {
        uid: user.uid,
        name: user.displayName || userData?.name,
        email: user.email,
        company: userData?.company || '',
        phone: userData?.phone || '',
        provider: 'email'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  // Use demo auth if in demo mode
  if (demoAuth.isDemoModeEnabled()) {
    return demoAuth.signInWithGoogle();
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Try to check/create user document in Firestore
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          provider: 'google',
          createdAt: new Date().toISOString(),
          isActive: true
        });
      }
    } catch (firestoreError) {
      console.log('Firestore offline - using local storage fallback');
      // Store user data in localStorage as fallback
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        provider: 'google',
        createdAt: new Date().toISOString(),
        isActive: true
      };
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(userData));
    }
    
    return {
      success: true,
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        provider: 'google'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign out
export const signOutUser = async () => {
  // Use demo auth if in demo mode
  if (demoAuth.isDemoModeEnabled()) {
    return demoAuth.signOut();
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  // Use demo auth if in demo mode
  if (demoAuth.isDemoModeEnabled()) {
    return demoAuth.onAuthStateChanged(callback);
  }

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Try to get user data from Firestore
      let userData = null;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        userData = userDoc.data();
      } catch (firestoreError) {
        console.log('Firestore offline - checking local storage');
        // Try to get user data from localStorage as fallback
        const localData = localStorage.getItem(`user_${user.uid}`);
        if (localData) {
          userData = JSON.parse(localData);
        }
      }
      
      callback({
        uid: user.uid,
        name: user.displayName || userData?.name,
        email: user.email,
        avatar: user.photoURL,
        company: userData?.company || '',
        phone: userData?.phone || '',
        provider: userData?.provider || 'email'
      });
    } else {
      callback(null);
    }
  });
};
