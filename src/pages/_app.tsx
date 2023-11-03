import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { setIsAuthed } from "@/redux/slices/auth/slice";
import store from "@/redux/store";
import { FirebaseContext } from "@/contexts/firebase";
import { getUser as getUserThunk } from "@/redux/slices/user/thunks";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(setIsAuthed(true));
        store.dispatch(getUserThunk(user.uid));
      } else {
        store.dispatch(setIsAuthed(false));
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={{ auth, db }}>
        <Component {...pageProps} />
        <ToastContainer />
      </FirebaseContext.Provider>
    </Provider>
  );
}
