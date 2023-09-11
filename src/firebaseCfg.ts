import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function getFbAuth(fbApiKey: string) {
  const firebaseConfig = {
    apiKey: fbApiKey,
    authDomain: "social-network-a5d55.firebaseapp.com",
    projectId: "social-network-a5d55",
    storageBucket: "social-network-a5d55.appspot.com",
    messagingSenderId: "173062262693",
    appId: "1:173062262693:web:0c91bbc0eb342d8423224c",
    measurementId: "G-NDTV4X0SMY",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return auth;
}

export { getFbAuth };
