import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebasePlaceholder } from "@/lib/firebase";
import { FamilyPlanState } from "@/types/plan";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  savePlanToCloud: (plan: FamilyPlanState) => Promise<void>;
  loadPlanFromCloud: () => Promise<FamilyPlanState | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check if we are in demo mode (using placeholder keys)
    if (isFirebasePlaceholder()) {
      setIsDemoMode(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    if (isDemoMode) {
      // Simulate login for demo mode
      setUser({
        uid: "demo-user-123",
        email: email,
        emailVerified: true,
      } as User);
      toast.success("Demo Mode: Logged in successfully!");
      return;
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const register = async (email: string, pass: string) => {
    if (isDemoMode) {
      setUser({
        uid: "demo-user-123",
        email: email,
        emailVerified: true,
      } as User);
      toast.success("Demo Mode: Registered successfully!");
      return;
    }
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    if (isDemoMode) {
      setUser(null);
      toast.success("Demo Mode: Logged out!");
      return;
    }
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    if (isDemoMode) {
      toast.success("Demo Mode: Password reset email simulated!");
      return;
    }
    await sendPasswordResetEmail(auth, email);
  };

  const savePlanToCloud = async (plan: FamilyPlanState) => {
    if (!user) return;
    if (isDemoMode) {
      localStorage.setItem(`ligtas_plan_${user.uid}`, JSON.stringify(plan));
      return;
    }

    try {
      const docRef = doc(db, "family_plans", user.uid);
      await setDoc(docRef, {
        plan,
        updatedAt: new Date().toISOString(),
        email: user.email
      });
    } catch (error) {
      console.error("Error saving plan to Firestore:", error);
      throw error;
    }
  };

  const loadPlanFromCloud = async (): Promise<FamilyPlanState | null> => {
    if (!user) return null;
    if (isDemoMode) {
      const saved = localStorage.getItem(`ligtas_plan_${user.uid}`);
      return saved ? JSON.parse(saved) : null;
    }

    try {
      const docRef = doc(db, "family_plans", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().plan as FamilyPlanState;
      }
      return null;
    } catch (error) {
      console.error("Error loading plan from Firestore:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isDemoMode,
      login,
      register,
      logout,
      resetPassword,
      savePlanToCloud,
      loadPlanFromCloud
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};