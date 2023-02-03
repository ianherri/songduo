import { onAuthStateChanged } from 'firebase/auth'

import { initFirestore } from '../config/firebase'
import useAuth from './auth'

import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

import { Song, Stanza } from '../config/models'

import { ref, onMounted } from 'vue'

const songRef = ref({})
const songsRef = ref([])
const clickCounter = ref(0)
const loading = ref(true)
const activeUser = ref({})
const activeUserId = ref('')
const activeUserName = ref('')

const firestoreDB = initFirestore()

const { auth } = useAuth()

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
    console.log(songObject)
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
  const songDoc = doc(firestoreDB, 'songs', song.id)
  console.log(song)
  try {
    await updateDoc(songDoc, {
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

function updateStanzaOrder() {
  const newStanzaOrder = Array.from(
    document.getElementsByClassName('stanza-container')
  ).map((elem) => {
    return elem.id
  })

  songRef.value.stanzaOrder = newStanzaOrder
}

// Song: removeStanza(songId,) (stanzaId) (no database)

function removeStanza(stanzaId) {
  clickCounter.value += 1

  if (
    songRef.value.stanzas.filter((stanza) => stanza.id === stanzaId)[0].text ===
      '' &&
    clickCounter.value > 1
  ) {
    const song = createSong(songRef.value)
    console.log(songRef.value)
    song.removeStanza(stanzaId)
    songRef.value = song.toObject()
    console.log(songRef.value)
    clickCounter.value = 0

    // only order if there
    if (songRef.value.stanzas.length > 1) {
      orderStanzas()
    }
  }
}

// Song: addParentStanza (no database)
function addParentStanza() {
  event.preventDefault()
  const stanza = new Stanza(
    activeUserId.value,
    activeUserName.value,
    '',
    'verse',
    null
  )
  const stanzaObj = stanza.toObject()
  songRef.value.stanzas.push(stanzaObj)
  songRef.value.stanzaOrder.push(stanzaObj.id)
  orderStanzas()
}

// reorder the stanzas according to the ordering in stanzaorder
// should modify the songRef.value.stanzas array

function orderStanzas() {
  const stanzas = songRef.value.stanzas
  const stanzaOrder = songRef.value.stanzaOrder

  const newStanzas = []
  for (let i = 0; i < stanzas.length; i++) {
    newStanzas.push(stanzas.filter((stanza) => stanza.id === stanzaOrder[i])[0])
  }
  console.log('new', newStanzas)
  songRef.value.stanzas = newStanzas
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

// return new Song from songRef object
function createSong(song) {
  const {
    id,
    authorId,
    authorName,
    coauthors,
    title,
    stanzas,
    stanzaOrder,
    visibility,
    timeCreated,
  } = song

  console.log('createsong', coauthors)

  const newSong = new Song(
    authorId,
    authorName,
    coauthors,
    title,
    stanzas,
    stanzaOrder,
    visibility,
    timeCreated
  )

  newSong.setId(id)
  console.log(newSong)
  return newSong
}

// update state to handle ctrl + z for each song
function handleCache(songId) {
  const songCache = []
  const songCacheKey = 'cache-' + songId
  songCache.push(songRef.value)
  const sessionCache = sessionStorage.getItem(songCacheKey)

  if (sessionCache === null) {
    sessionStorage.setItem(songCacheKey, JSON.stringify(songCache))
  }
  if (event.key === 'z' && event.ctrlKey) {
    let newState = JSON.parse(sessionCache)
    newState.shift()
    // songRef.value = newState[-1]
    sessionStorage.setItem(songCacheKey, JSON.stringify(newState))
  } else {
    let newState = JSON.parse(sessionCache)
    if (newState.length > 10) {
      let newCache = songCache.concat(...newState)
      // remove one save element from the beginning of the array
      newCache.pop()
      sessionStorage.setItem(songCacheKey, JSON.stringify(newCache))
    } else {
      let newCache = songCache.concat(...newState)
      sessionStorage.setItem(songCacheKey, JSON.stringify(newCache))
    }
  }
}

// state function, whenever invoked it calls return songs which sets the value of
// songRef to the songs in the database
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
    handleCache,
    orderStanzas,
    updateStanzaOrder,
  }
}
