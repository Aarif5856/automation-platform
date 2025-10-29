// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPmdDZCskcc2dTNWQBE0w0InJ5ipZw4sA",
  authDomain: "automation-fefa6.firebaseapp.com",
  projectId: "automation-fefa6",
  storageBucket: "automation-fefa6.firebasestorage.app",
  messagingSenderId: "1056442700432",
  appId: "1:1056442700432:web:74f8c83e190a7cddd3fe15",
  measurementId: "G-FEMRGQRL8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure auth settings for production
if (process.env.NODE_ENV === 'production') {
  // Set the auth domain for production
  auth.settings.appVerificationDisabledForTesting = false;
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Try to enable network, fallback to offline mode if needed
try {
  enableNetwork(db);
} catch (error) {
  console.log('Firestore offline mode enabled');
}

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
