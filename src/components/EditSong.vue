<template>
  <NavBar />
  <div v-if="loading" class="loading-container">loading</div>
  <div v-else class="song-edit-container">
    <form>
      <div class="title-container">
        <textarea
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          class="song-title-input"
          v-model="song.title"
          type="text"
        ></textarea>
      </div>
      <div class="author-container">Author: {{ activeUser }}</div>
      <div
        class="stanza-list-container"
        v-for="(stanza, index) in song.stanzas"
        :key="stanza.id"
      >
        <div class="stanza">
          <textarea
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            class="stanza-input"
            :class="{ 'odd-number': index % 2 !== 0 }"
            @keyup.delete="() => removeStanza(stanza.id)"
            @focus="ct = 0"
            v-model="stanza.text"
          ></textarea>
        </div>
      </div>
      <button class="add-stanza-button" @click="addStanza">add stanza +</button>
    </form>
    <button @click="saveSong">save changes -></button>
    <Transition name="fade">
      <div class="notification-message" v-if="message != ''">{{ message }}</div>
    </Transition>
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
const message = ref('')
let ct = 0

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
    text: '',
    type: 'Verse',
    stanza_author: activeUser.value,
  })
  stanzaCount.value += 1
}

/**
 * calls modifySong(id, {title: "String", stanzas: [{id: int, text: Strnig, type: String, stanza_author: uid}]})
 */
async function saveSong(event) {
  event.preventDefault()
  const data = { title: song.value.title, stanzas: song.value.stanzas }

  await modifySong(songId, data)

  message.value = 'Changes saved'

  setTimeout(() => {
    console.log('3 seconds have passed')
    message.value = ''
  }, 2000)
}

function removeStanza(id) {
  ct += 1
  console.log(ct)
  if (
    song.value.stanzas.filter((stanza) => stanza.id === id)[0].text === '' &&
    ct > 1
  ) {
    song.value.stanzas = song.value.stanzas.filter((stanza) => stanza.id != id)
    ct = 0
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
  gap: 24px;
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
  flex-wrap: wrap;
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
  padding: 2px;
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
  font-size: 16px;
  border: none;
}

.odd-number {
  background-color: rgb(239, 239, 239);
}

.add-stanza-button {
  width: 100%;
  height: 40px;
  background-color: white;
  color: black;
}

.notification-message {
  color: rgb(226, 134, 14);
  font-weight: 900;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
