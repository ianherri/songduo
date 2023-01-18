<template>
  <NavBar />
  <div v-if="loading" class="loading-container">loading</div>
  <div v-else class="song-edit-container">
    <form>
      <div class="title-container">
        <label>title</label>
        <input class="song-title-input" v-model="song.title" type="text" />
      </div>
      <div
        class="stanza-list-container"
        v-for="stanza in song.stanzas"
        :key="stanza.id"
      >
        <div class="stanza">
          <label>stanza: {{ stanza.id }}</label>
          <input class="stanza-input" v-model="stanza.text" />
        </div>
      </div>
      <button @click="addStanza">add stanza +</button>
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
  console.log(song.value)
  loading.value = false
  activeUser.value = auth.currentUser.displayName
  loading.value = false
})

function addStanza(event) {
  event.preventDefault()
  song.value.stanzas.push({
    id: stanzaCount.value,
    text: 'New stanza',
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
  width: 100px;
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
  border: 0.5px solid lightgray;
  padding: 2px 2px 2px 2px;
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
