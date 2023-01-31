// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const FIREBASEAPI = process.env.VUE_APP_FIREBASE_API_KEY
const env = process.env.VUE_APP_SERVER_ENV

const firebaseConfig = {
  apiKey: FIREBASEAPI,
  authDomain: 'songduo-5425e.firebaseapp.com',
  projectId: 'songduo-5425e',
  storageBucket: 'songduo-5425e.appspot.com',
  messagingSenderId: '107270487234',
  appId: '1:107270487234:web:b204a075a2de119b1ccf5b',
  measurementId: 'G-PCG8Z8QT2Y',
}

// Initialize Firebase
export function initFirestore() {
  const app = initializeApp(firebaseConfig)
  const firestoreEmulator = getFirestore(app)
  console.log(env)
  if (env === 'local') {
    connectFirestoreEmulator(firestoreEmulator, 'localhost', 8080)
  }

  return firestoreEmulator
}

export function initFirebase() {
  const app = initializeApp(firebaseConfig)
  return app
}
