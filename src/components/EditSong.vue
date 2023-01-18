<template>
  <NavBar />
  <div v-if="loading" class="loading-container">loading</div>
  <div v-else class="song-edit-container">
    <form>
      <div class="title-container">
        <input class="song-title-input" v-model="song.title" type="text" />
      </div>
      <div class="author-container">Author: {{ activeUser }}</div>
      <div
        class="stanza-list-container"
        v-for="stanza in song.stanzas"
        :key="stanza.id"
      >
        <div class="stanza">
          <input
            class="stanza-input"
            @keyup.delete="() => removeStanza(stanza.id)"
            v-model="stanza.text"
          />
        </div>
      </div>
      <button class="add-stanza-button" @click="addStanza">add stanza +</button>
    </form>
    <button @click="saveSong">save changes -></button>
  </div>
</template>

<script setup>
import useState from '../composables/state'
import { getAuth } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './NavBar.vue'

const { getSong, modifySong } = useState()
const activeUser = ref({})
const route = useRoute()
const loading = ref(true)
const song = ref({})
const stanzaCount = ref(0)
const songId = route.params.id

onMounted(async () => {
  const auth = getAuth()
  song.value = await getSong(songId)
  stanzaCount.value = song.value.stanzas.length
  loading.value = false
  activeUser.value = auth.currentUser.displayName
  loading.value = false
})

function addStanza(event) {
  event.preventDefault()
  song.value.stanzas.push({
    id: stanzaCount.value,
    text: ' ',
    type: 'Verse',
    stanza_author: activeUser.value,
  })
  stanzaCount.value += 1
}

/**
 * calls modifySong(id, {title: "String", stanzas: [{id: int, text: Strnig, type: String, stanza_author: uid}]})
 */
async function saveSong(event) {
  console.log('save song')
  event.preventDefault()
  const data = { title: song.value.title, stanzas: song.value.stanzas }
  console.log(song.value)
  await modifySong(songId, data)
}

function removeStanza(id) {
  console.log(id)
  console.log()
  if (song.value.stanzas.filter((stanza) => stanza.id === id)[0].text === '') {
    song.value.stanzas = song.value.stanzas.filter((stanza) => stanza.id != id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song-edit-container {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  width: 24px;
}

button {
  font-size: 16px;
  margin-top: 12px;
}

.title-container {
  display: flex;
  flex-direction: row;
  width: 600px;
  margin-bottom: 20px;
}

.song-title-input {
  width: 100%;
  background-color: black;
  font-size: 36px;
  font-weight: 900;
  color: white;
  border: none;
}

.song-title-input:focus,
.stanza-input:focus {
  border: none;
  outline: none;
}

.author-container {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 40px;
}

.stanza-list-container {
  width: 600px;
}

.stanza {
  display: flex;
  flex-direction: row;
}

.stanza-input {
  width: 100%;
  height: auto;
  font-size: 16px;
  border: none;
  padding: 4px 12px 4px 12px;
}

.add-stanza-button {
  width: 100%;
  height: 40px;
  background-color: white;
  color: black;
}

@media (max-width: 800px) {
  .stanza-list-container {
    width: 98vw;
  }

  .title-container {
    width: 98vw;
  }
}
</style>
