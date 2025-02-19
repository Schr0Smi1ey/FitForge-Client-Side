import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../API/firebase.init.js";
import { toast, Flip } from "react-toastify";
import useCustomAxios from "../../Hooks/useCustomAxios.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const customAxios = useCustomAxios();
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      // if (user?.email) {
      //   const currentUser = { email: user.email };
      //   customAxios
      //     .post("/jwt", currentUser, {
      //       withCredentials: true,
      //     })
      //     // eslint-disable-next-line no-unused-vars
      //     .then((res) => {
      //       setLoading(false);
      //     });
      // } else {
      //   customAxios
      //     .post("/logout", {}, { withCredentials: true })
      //     // eslint-disable-next-line no-unused-vars
      //     .then((res) => {
      //       setLoading(false);
      //     });
      // }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [customAxios]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    return signOut(auth);
  };
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  const Toast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      toastClassName: "rounded-lg bg-[#f5f5f5] text-black w-96",
      bodyClassName: "font-medium text-lg",
    });
  };
  const authInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    setUser,
    updateUserProfile,
    loading,
    setLoading,
    Toast,
    resetPassword,
    image_hosting_api,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
