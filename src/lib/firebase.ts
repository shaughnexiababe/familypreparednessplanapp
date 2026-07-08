import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These are placeholder keys. Users can replace these with their actual Firebase project keys.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder-api-key-ligtas-camnorte",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ligtas-camnorte.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ligtas-camnorte",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ligtas-camnorte.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Helper to check if Firebase is using placeholder keys
export const isFirebasePlaceholder = () => {
  return firebaseConfig.apiKey === "placeholder-api-key-ligtas-camnorte";
};

export { auth, db };