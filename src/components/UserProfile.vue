<template>
  <NavBar />
  <div class="user-page-container">
    <div class="user-page-body">
      <div v-if="loading" class="loading">loading</div>
      <div v-else class="user-heading">
        <h2 class="user-heading">
          Write a song, {{ activeUserName.split(' ')[0] }}
        </h2>
        <p class="beta-notice">
          Note, this is app is a beta. Do not share sensitive personal data, all
          content published is available to all other users.
        </p>
        <div class="song-list-container">
          <button @click="handleAddNewSong" class="add-song-button">
            Add new song
          </button>
          <div v-for="song in songsRef" :key="song.id" class="song-list">
            <SongButtonComponent
              :title="song.title"
              :authorId="song.authorId"
              :authorName="song.authorName"
              :songId="song.id"
              :timeCreated="song.timeCreated"
              :activeUserId="activeUserId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import NavBar from './NavBar.vue'
import SongButtonComponent from './SongButtonComponent.vue'
import useState from '../composables/state'

const router = useRouter()
const {
  addNewSong,
  songsRef,
  loading,
  activeUser,
  activeUserId,
  activeUserName,
} = useState()

onMounted(async () => {
  if (!activeUser) {
    // User is signed out
    // ...
    router.push({
      name: 'home',
    })
  }
})

async function handleAddNewSong() {
  const id = await addNewSong()

  router.push({ name: 'editsong', params: { id: id } })
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

.user-heading {
  font-size: 36px;
}

.beta-notice {
  font-size: 12px;
  font-style: italic;
  color: rgb(227, 117, 33);
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

  .song-list-container {
    justify-content: center;
  }

  .user-heading {
    text-align: center;
  }
}
</style>
