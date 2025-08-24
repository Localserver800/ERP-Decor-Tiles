// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { doc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFeEb7JZd-GjlKIltIlyaGgiF0LFsTpBY",
  authDomain: "west-africa-decor-tiles.firebaseapp.com",
  projectId: "west-africa-decor-tiles",
  storageBucket: "west-africa-decor-tiles.firebasestorage.app",
  messagingSenderId: "18335871707",
  appId: "1:18335871707:web:d511b3505fc1ebc46692fe",
  measurementId: "G-F6WPQXF33N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
  console.log("Offline persistence failed:", err);
});

// Use emulators if running locally
if (window.location.hostname === "localhost") {
  auth.useEmulator(`http://localhost:9099`);
  db.useEmulator("localhost", 8080);
  messaging.useEmulator("localhost", 8080); // Note: Messaging emulator port might vary
}

export const requestForToken = () => {
  return getToken(messaging, { 
    vapidKey: 'GR-S6NHtlvl5ny0UuwC682GLL5P2KkCwsTdtPvpoHYU' 
  }).then((currentToken) => {
    if (currentToken) {
      console.log('Current token for client: ', currentToken);
      // Save the token to the server
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
};

// Export the services your app needs to use
export { db, auth, messaging, signInWithEmailAndPassword };

// Function to get user role
export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      return 'customer'; // Default role
    }
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'customer';
  }
};