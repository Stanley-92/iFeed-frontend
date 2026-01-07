// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAJGSqJ4rQu39U5UkO1Qv0GgwWYEk1niiE",
  authDomain: "createaccount-ifeed1.firebaseapp.com",
  projectId: "createaccount-ifeed1",
  storageBucket: "createaccount-ifeed1.firebasestorage.app",
  messagingSenderId: "362037626035",
  appId: "1:362037626035:web:8fea5a12b3e9bfd0a1dcc6",
  measurementId: "G-3ZBPGZ7LM1"
};


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
