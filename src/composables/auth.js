import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  connectAuthEmulator,
} from 'firebase/auth'

//import { initFirebase } from '../config/firebase'

// export const authEmulator = getAuth()
//
import {
  // initFirestoreEmulator,
  // firestoreEmulator,
  authEmulator,
} from '../config/firebase_emulator'

const env = process.env.SERVER_ENV

export default function useAuth() {
  const auth = getAuth()
  if (env === 'local') {
    connectAuthEmulator(authEmulator, 'http://localhost:9099')
  }
  console.log(env)
  function doSignOut() {
    try {
      signOut(auth).then(
        () => console.log('signed out'),
        (error) => console.log(error)
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function signIn() {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken

      // The signed-in user info.
      const user = result.user
      // ...
      console.log(token, user)
      return user
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...

      console.error(errorCode, errorMessage, email, credential)
    }
  }

  return {
    doSignOut,
    signIn,
  }
}
