import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/main";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signout,
    signin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
