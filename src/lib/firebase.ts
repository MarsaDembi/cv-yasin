import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-dnh-PQAKtYS9eRAavIHncRnx0DeMwtA",
  authDomain: "cv-sin.firebaseapp.com",
  projectId: "cv-sin",
  storageBucket: "cv-sin.firebasestorage.app",
  messagingSenderId: "703728960637",
  appId: "1:703728960637:web:021d6ca24a4f40df229d14",
  measurementId: "G-9C9063HKDV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
