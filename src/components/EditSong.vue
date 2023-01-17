<template>
  <div v-if="loading" class="loading-container">loading</div>
  <div v-else class="song-edit-container">{{ song.title }}</div>
</template>

<script setup>
import useState from '../composables/state'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const { getSong } = useState()

const route = useRoute()
const songId = route.params.id
const loading = ref(true)
const song = ref({})

onMounted(async () => {
  song.value = await getSong(songId)
  loading.value = false
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song-edit-container {
}

.song-title {
  margin: 0;
  font-size: 24px;
  text-align: center;
}

.song-author {
  margin: 0;
  font-size: 18px;
}
</style>
