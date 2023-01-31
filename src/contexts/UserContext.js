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
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import app from "../firebase/firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);

  // create user with email and password
  const createUser = (email, password, name) => {
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfileUser(name);
        emailVerification();
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
    setLoader(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        //
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
    setLoader(true);

    signOut(auth)
      .then((result) => {
        toast.warning("Logged out successfully");
      })
      .catch((error) => console.log(error.message));
  };

  // login user
  const logIn = (email, password) => {
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password);
  };

  // memorize user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    createUser,
    handleGoogleSignIn,
    logOut,
    logIn,
    loader,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
