<template>
  <div @click="handleSongClick" class="song-container">
    <h1 class="song-title">{{ props.title }}</h1>
    <h2 class="song-author">by:{{ props.authorName }}</h2>
    <p class="created-date">
      {{ new Date(props.time.seconds * 1000).toISOString().split('T')[0] }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  title: String,
  time: Date,
  songId: String,
  authorId: String,
  authorName: String,
})
const router = useRouter()

function handleSongClick() {
  console.log(props.songId)
  router.push({ name: 'editsong', params: { id: props.songId } })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song-container {
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: white;
  color: black;
}

.song-title {
  margin: 0;
  padding: 12px;
  font-size: 18px;
  text-align: center;
}

.song-author {
  margin: 0;
  padding: 0px 12px 0px 12px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
}

.created-date {
  margin: 0;
  font-weight: 400;
  font-size: 12px;
}
</style>
