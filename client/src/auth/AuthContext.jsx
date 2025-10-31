




import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Create context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Get user initials
export const getInitials = (user) => {
  if (!user?.displayName) return user?.email?.[0]?.toUpperCase() || "";
  return user.displayName
    .split(" ")
    .map((n) => n[0])
    .join("");
};

// Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /** Sign up with email */
  const signupEmail = async (name, email, password) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: name });
    setCurrentUser({ ...userCred.user, displayName: name });
    return userCred.user;
  };

  /** Login with email */
  const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

  /** Login with Google */
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Link with email/password if Google-only
    const hasPassword = user.providerData.some((p) => p.providerId === "password");
    if (!hasPassword) {
      let pwd = "";
      while (!pwd) {
        pwd = prompt(
          `Welcome ${user.displayName || user.email}! Please set a password for future email login:`
        );
      }
      const credential = EmailAuthProvider.credential(user.email, pwd);
      await linkWithCredential(user, credential);
    }

    setCurrentUser(user);
    return user;
  };

  /** Logout */
  const logout = () => signOut(auth).then(() => setCurrentUser(null));

  /** Listen to auth state changes */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signupEmail,
        loginEmail,
        loginWithGoogle,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
