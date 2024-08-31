import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-9dbfa.firebaseapp.com",
  projectId: "netflix-clone-9dbfa",
  storageBucket: "netflix-clone-9dbfa.appspot.com",
  messagingSenderId: "1089462010750",
  appId: "1:1089462010750:web:f1eb00a795e75fb197e92f",
  measurementId: "G-EDGBDR8B3R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;