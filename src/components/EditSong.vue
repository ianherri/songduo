<template>
  <NavBar />
  <div v-if="loading" class="loading-container">loading</div>
  <div v-else class="song-edit-container">
    <form>
      <div class="title-container">
        <textarea
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          class="song-title-input"
          v-model="songRef.title"
          type="text"
        ></textarea>
      </div>
      <div class="author-container">Author: {{ songRef.authorName }}</div>
      <div class="stanza-list-container">
        <EditStanza
          v-for="stanza in songRef.stanzas"
          :key="stanza.id"
          :stanzaId="stanza.id"
          :containerId="`container-${stanza.id}`"
        />
      </div>
    </form>
    <button class="add-stanza-button" @click.prevent="addParentStanza">
      add stanza +
    </button>
    <button @click.prevent="handleSaveSong">save changes -></button>
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
import EditStanza from './EditStanza.vue'

const { getSong, saveSong, loading, songRef, addParentStanza } = useState()
const activeUserName = ref({})
const activeUserId = ref({})
const route = useRoute()
const stanzaCount = ref(0)
const songId = route.params.id
const message = ref('')

// TODO - stanzaOrder is not getting updated

onMounted(async () => {
  const auth = getAuth()

  try {
    await getSong(songId)
  } catch (error) {
    console.log(error)
  }

  stanzaCount.value = await songRef.value.stanzas.length
  activeUserName.value = auth.currentUser.displayName
  activeUserId.value = auth.currentUser.uid
})

async function handleSaveSong() {
  await saveSong(songRef.value)

  message.value = 'Changes saved'

  setTimeout(() => {
    console.log('3 seconds have passed')
    message.value = ''
  }, 2000)
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

.add-stanza-button {
  max-width: 600px;
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
  height: 60px;
  color: white;
  border: none;
}

.song-title-input:focus {
  border: none;
  outline: none;
}

.author-container {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 40px;
  padding-left: 12px;
}

.stanza-list-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 600px;
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
