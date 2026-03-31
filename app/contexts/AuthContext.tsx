"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import {
//   User,
//   onAuthStateChanged,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut
// } from "firebase/auth";
import type { User } from "firebase/auth"; // Keep type for TS
// import { auth } from "../lib/firebase";
// import { getUserProfile } from "../data/users";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileComplete: boolean;
  profileChecked: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkProfileComplete: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  // Mock user for development
  const MOCK_USER: User = {
    uid: "mock-user-123",
    email: "demo@roomieverse.com",
    displayName: "Người dùng Demo",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: async () => { },
    getIdToken: async () => "",
    getIdTokenResult: async () => ({} as any),
    reload: async () => { },
    toJSON: () => ({}),
    phoneNumber: null,
    providerId: "firebase",
  };

  useEffect(() => {
    // Check local storage specific key to simulate persistence
    const storedAuth = localStorage.getItem("roomieverse_mock_auth");
    if (storedAuth === "true") {
      setUser(MOCK_USER);
    }
    setIsLoading(false);
    setProfileChecked(true); // Always true for mock
    setIsProfileComplete(true); // Always true for mock for now
  }, []);

  const checkProfileComplete = async (): Promise<boolean> => {
    // Always return true for mock environment to let user pass
    return true;
  };

  const loginWithGoogle = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(MOCK_USER);
        localStorage.setItem("roomieverse_mock_auth", "true");
        setIsProfileComplete(true);
        resolve();
      }, 800);
    });
  };

  const logout = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem("roomieverse_mock_auth");
        resolve();
      }, 500);
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      isProfileComplete,
      profileChecked,
      loginWithGoogle,
      logout,
      checkProfileComplete
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
