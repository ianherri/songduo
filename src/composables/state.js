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

import { Song } from '../config/models'

export default function useState() {
  initFirebase()

  async function addNewSong() {
    const auth = getAuth()

    const firestoreDB = getFirestore()
    const songsColl = collection(firestoreDB, 'songs')
    const song = new Song(
      [],
      auth.currentUser.uid,
      auth.currentUser.displayName,
      'public',
      [],
      `${auth.currentUser.displayName.split(' ')[0]}'s new song`,
      []
    )

    song.addStanza(
      auth.currentUser.uid,
      auth.currentUser.displayName,
      'New stanza',
      'verse',
      null
    )

    const songObject = song.toObject()

    console.log(songObject)

    try {
      const docRef = await addDoc(songsColl, songObject)
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
