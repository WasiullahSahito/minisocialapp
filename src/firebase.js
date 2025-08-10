import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvDnZFXn1YSICLHT1OoJxCJpjln6llStM",
  authDomain: "social-media-app-575b2.firebaseapp.com",
  projectId: "social-media-app-575b2",
  storageBucket: "social-media-app-575b2.firebasestorage.app",
  messagingSenderId: "647612266152",
  appId: "1:647612266152:web:00cdc9ec067c750a4af49d",
  measurementId: "G-7MNWGSZ3TM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const timestamp = serverTimestamp;