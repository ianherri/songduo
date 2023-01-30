import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

import { getAuth, connectAuthEmulator } from 'firebase/auth'

export const authEmulator = getAuth()
connectAuthEmulator(authEmulator, 'http://localhost:9099')

// firebaseApps previously initialized using initializeApp()

export function initFirebaseEmulator() {
  const firestore = getFirestore()
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  return firestore
}
