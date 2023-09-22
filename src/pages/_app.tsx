import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";

import { setIsAuthed } from "@/redux/slices/auth/slice";
import store from "@/redux/store";
import { FirebaseContext } from "@/contexts/firebase";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/globals.css";

const firebaseConfig = {
  apiKey: "AIzaSyChS_7eX32-sx4De1n8PK9UiShJS-qT4Mk",
  authDomain: "social-network-a5d55.firebaseapp.com",
  projectId: "social-network-a5d55",
  storageBucket: "social-network-a5d55.appspot.com",
  messagingSenderId: "173062262693",
  appId: "1:173062262693:web:0c91bbc0eb342d8423224c",
  measurementId: "G-NDTV4X0SMY",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App({ Component, pageProps }: AppProps) {
  const [isAuthStateLoading, setIsAuthStateLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(setIsAuthed(true));
      }
      setIsAuthStateLoading(false);
    });
  }, []);

  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={{ auth, db, isAuthStateLoading }}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </Provider>
  );
}
