import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import app from "../firebase/firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
  const [user, setUser] = useState({});

  // create user with email and password
  const createUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfileUser(name);
        emailVerification();
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // update profile name
  const updateProfileUser = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // google sign in
  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // email verification
  const emailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast("Check your email, for verify email");
    });
  };

  // logout
  const logOut = () => {
    signOut(auth)
      .then(toast.warning("Logged out successfully"))
      .catch((error) => console.log(error.message));
  };

  // login user
  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("logg in done");
      })
      .catch((error) => console.log(error.message));
  };

  // memorize user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = { user, createUser, handleGoogleSignIn, logOut, logIn };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
