// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAJGSqJ4rQu39U5UkO1Qv0GgwWYEk1niiE",
  authDomain: "createaccount-ifeed1.firebaseapp.com",
  projectId: "createaccount-ifeed1",
  storageBucket: "createaccount-ifeed1.appspot.com", // ✅ FIXED: .appspot.com
  messagingSenderId: "362037626035",
  appId: "1:362037626035:web:602285d7ece472d3a1dcc6",
  measurementId: "G-SKYBLBFBQX"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
