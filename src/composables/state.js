import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { initFirebase } from '../config/firebase'

import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore/lite'

import { Song, Stanza } from '../config/models'

import { ref, onMounted } from 'vue'

const songRef = ref({})
const songsRef = ref([])
const clickCounter = ref(0)
const loading = ref(true)
const activeUser = ref({})
const activeUserId = ref('')
const activeUserName = ref('')

const firestoreDB = initFirebase()
const auth = getAuth()

function parseDoc(doc) {
  const {
    authorId,
    authorName,
    coauthors,
    stanzaOrder,
    stanzas,
    title,
    visibility,
    timeCreated,
  } = doc.data()
  const song = new Song(
    authorId,
    authorName,
    coauthors,
    title,
    stanzas,
    stanzaOrder,
    visibility,
    timeCreated
  )

  song.setId(doc.id)

  return song
}

/**
 * @params none
 * @returns songId
 */
async function addNewSong() {
  const songsColl = collection(firestoreDB, 'songs')
  const song = new Song(
    auth.currentUser.uid,
    auth.currentUser.displayName,
    [],
    `${auth.currentUser.displayName.split(' ')[0]}'s new song`,
    [],
    [],
    'public'
  )

  song.addStanza(
    auth.currentUser.uid,
    auth.currentUser.displayName,
    'New stanza',
    'verse',
    null
  )

  const songObject = song.toObject()

  try {
    const docRef = await addDoc(songsColl, songObject)
    return docRef.id
  } catch (error) {
    console.log(error)
  }
}

// TODO: only return songs that are authored by requestor
// or that are set to public visibility
// or that are shared with a group
async function returnSongs() {
  const songsColl = collection(firestoreDB, 'songs')
  songsRef.value = []

  const q = query(songsColl)

  try {
    const songs = await getDocs(q)
    songs.forEach((doc) => {
      const song = parseDoc(doc)
      songsRef.value.push(song)
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param songId
 * @returns song reactive obj
 */
async function getSong(id) {
  const songDoc = doc(firestoreDB, 'songs', id)

  try {
    const doc = await getDoc(songDoc)
    const song = await parseDoc(doc)
    songRef.value = song
    loading.value = false
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
async function saveSong(song) {
  const songRef = doc(firestoreDB, 'songs', song.id)
  console.log(song)
  try {
    await updateDoc(songRef, {
      title: song.title,
      stanzas: song.stanzas,
      stanzaOrder: song.stanzaOrder,
      visibility: song.visibility,
      coauthors: song.coauthors,
    })
  } catch (error) {
    console.log(error)
  }

  await returnSongs()
}

// Song: removeStanza(songId,) (stanzaId) (no database)

function removeStanza(stanzaId) {
  clickCounter.value += 1
  if (
    songRef.value.stanzas.filter((stanza) => stanza.id === stanzaId)[0].text ===
      '' &&
    clickCounter.value > 1
  ) {
    songRef.value.stanzas = songRef.value.stanzas.filter(
      (stanza) => stanza.id != stanzaId
    )
    clickCounter.value = 0
  }
}

// Song: addParentStanza (no database)
function addParentStanza() {
  const stanza = new Stanza(
    activeUserId.value,
    activeUserName.value,
    '',
    'verse',
    null
  )

  const stanzaObj = stanza.toObject()
  songRef.value.stanzas.push(stanzaObj)
}

// Stanza: addChildStanza(id) (no database)

function addChildStanza(parentStanzaId) {
  const childStanza = new Stanza(
    activeUserId.value,
    activeUserName.value,
    '',
    'verse',
    null
  )

  const childStanzaObj = childStanza.toObject()

  const target = songRef.value.stanzas.find(
    (stanza) => stanza.id === parentStanzaId
  )
  target.children.push(childStanzaObj)
}

// Stanza: editStanza (no database)
function getStanza(stanzaId) {
  const stanza = songRef.value.stanzas.find((s) => s.id === stanzaId)
  return stanza
}

export default function useState() {
  onMounted(async () => {
    if (loading.value) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          activeUser.value = user
          activeUserName.value = user.displayName
          activeUserId.value = user.uid
        }
      })

      await returnSongs()
      loading.value = false
    }
  })
  return {
    addNewSong,
    returnSongs,
    getSong,
    saveSong,
    songRef,
    songsRef,
    removeStanza,
    loading,
    addParentStanza,
    addChildStanza,
    activeUser,
    activeUserId,
    activeUserName,
    getStanza,
  }
}
