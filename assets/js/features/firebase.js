// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ✅ Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAHM4vwhzApIWoCcl4eXpZbt0IK7cpxmJo",
  authDomain: "learnico-fdb58.firebaseapp.com",
  projectId: "learnico-fdb58",
  storageBucket: "learnico-fdb58.firebasestorage.app",
  messagingSenderId: "245064037037",
  appId: "1:245064037037:web:c4597ef60a253624e64c24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services so you can import anywhere
export const auth = getAuth(app);
export const db = getFirestore(app);
