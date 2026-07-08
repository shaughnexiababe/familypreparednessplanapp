import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These are fallback keys using your specific Firebase project details.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder-api-key-famprepplan",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "famprepplan-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "famprepplan-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "famprepplan-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1079491465028",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1079491465028:web:placeholderappid"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Helper to check if Firebase is using placeholder keys
export const isFirebasePlaceholder = () => {
  return firebaseConfig.apiKey.startsWith("placeholder-api-key");
};

export { auth, db };