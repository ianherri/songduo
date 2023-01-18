<template>
  <NavBar />
  <div class="user-page-container">
    <div class="user-page-body">
      <div v-if="loading" class="loading">loading</div>
      <div v-else class="user-heading">
        <h2>{{ activeUser }} the Songwriter</h2>
        <div class="song-list-container">
          <button @click="handleAddNewSong" class="add-song-button">
            Add new song
          </button>
          <div v-for="song in songs" :key="song.id" class="song-list">
            <SongButtonComponent
              :title="song.data.title"
              :authorId="song.data.authorId"
              :authorName="song.data.authorName"
              :songId="song.id"
              :time="song.data.time"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import NavBar from './NavBar.vue'
import SongButtonComponent from './SongButtonComponent.vue'
import useState from '../composables/state'

const activeUser = ref('')
const loading = ref(true)
const songs = ref([])
const router = useRouter()

onMounted(async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loading.value = false
      activeUser.value = user.displayName
    } else {
      // User is signed out
      // ...
      router.push({
        name: 'home',
      })
    }
  })

  songs.value = await returnSongs()
  console.log(songs.value)
})

const { addNewSong, returnSongs } = useState()

async function handleAddNewSong() {
  const id = await addNewSong()

  router.push({ name: 'editsong', params: { id: id } })

  // actually lets push to the new edit song page

  // load all songs again

  songs.value = await returnSongs()
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: auto;
  margin-top: 40px;
}

.user-page-body {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 600px;
  height: auto;
  gap: 24px;
}

.song-list-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 40px;
}

.add-song-button {
  height: 140px;
  width: 140px;
  border: 2px solid white;
}

@media (max-width: 800px) {
  .user-page-container {
    width: 100vw;
  }

  .user-page-body {
    width: 100vw;
  }
}
</style>
