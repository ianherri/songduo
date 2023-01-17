import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
} from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'

import { initFirebase } from '../config/firebase'

export default function useState() {
  initFirebase()

  async function addNewSong() {
    const auth = getAuth()

    const firestoreDB = getFirestore()
    const songsColl = collection(firestoreDB, 'songs')

    try {
      await addDoc(songsColl, {
        author: auth.currentUser.uid,
        title: `${auth.currentUser.displayName.split(' ')[0]}'s new song`,
        stanzas: [],
        time: new Date(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function returnSongs() {
    const firestoreDB = getFirestore()
    const songsColl = collection(firestoreDB, 'songs')

    const q = query(songsColl)
    try {
      const songs = await getDocs(q)
      const parsedSongs = []
      songs.forEach((doc) => {
        parsedSongs.push({ id: doc.id, data: doc.data() })
      })
      return parsedSongs
    } catch (error) {
      console.log(error)
    }
  }

  async function getSong(id) {
    const firestoreDB = getFirestore()
    const songRef = doc(firestoreDB, 'songs', id)

    try {
      const docSnap = await getDoc(songRef)
      return docSnap.data()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    addNewSong,
    returnSongs,
    getSong,
  }
}
