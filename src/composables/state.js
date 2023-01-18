import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
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
      const docRef = await addDoc(songsColl, {
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName,
        title: `${auth.currentUser.displayName.split(' ')[0]}'s new song`,
        stanzas: [
          {
            id: 0,
            text: 'First verse stanza',
            type: 'Verse',
            stanza_author: auth.currentUser.displayName,
          },
        ],
        time: new Date(),
      })

      return docRef.id
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
    initFirebase()
    const firestoreDB = getFirestore()
    const songRef = doc(firestoreDB, 'songs', id)

    try {
      const docSnap = await getDoc(songRef)
      return docSnap.data()
    } catch (error) {
      console.log(error)
    }
  }

  /**
   *
   * @param {*} id
   * @param {*} data {title: String, stanzas: []stanza}
   * @returns void
   */
  async function modifySong(id, data) {
    const firestoreDB = getFirestore()
    const songRef = doc(firestoreDB, 'songs', id)
    console.log(data)
    try {
      await updateDoc(songRef, {
        title: data.title,
        stanzas: data.stanzas,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    addNewSong,
    returnSongs,
    getSong,
    modifySong,
  }
}
