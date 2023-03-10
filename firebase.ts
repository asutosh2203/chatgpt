// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDVPKaJZnLrYrgGs4YQdDthTAluXB-Z0uI',
  authDomain: 'chatgpt-messenger-77a0c.firebaseapp.com',
  projectId: 'chatgpt-messenger-77a0c',
  storageBucket: 'chatgpt-messenger-77a0c.appspot.com',
  messagingSenderId: '68202012888',
  appId: '1:68202012888:web:156c2ae67ad461e9ebb7ad',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
