// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore'

// firebaseApps previously initialized using initializeApp()

const FIREBASEAPI = process.env.VUE_APP_FIREBASE_API_KEY
// const env = process.env.SERVER_ENV

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASEAI,
  authDomain: 'songduo-5425e.firebaseapp.com',
  projectId: 'songduo-5425e',
  storageBucket: 'songduo-5425e.appspot.com',
  messagingSenderId: '107270487234',
  appId: '1:107270487234:web:b204a075a2de119b1ccf5b',
  measurementId: 'G-PCG8Z8QT2Y',
}

// Initialize Firebase
export function initFirebase() {
  const app = initializeApp(firebaseConfig)
  const firestoreEmulator = initializeFirestore(app)

  connectFirestoreEmulator(firestoreEmulator, 'localhost', 8080)
  return firestoreEmulator
}
