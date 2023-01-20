<template>
  <div @click="handleSongClick" class="song-container">
    <h1 class="song-title">{{ props.title }}</h1>
    <h2 class="song-author">by:{{ props.authorName }}</h2>
    <p class="created-date">
      {{ props.timeCreated.seconds }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  title: String,
  timeCreated: Date,
  songId: String,
  authorId: String,
  authorName: String,
  activeUserId: String,
})
const router = useRouter()

function handleSongClick() {
  if (props.activeUserId === props.authorId) {
    router.push({ name: 'editsong', params: { id: props.songId } })
  } else {
    // the user is not the author
    // push them to the suggestion page.
    router.push({ name: 'suggestsong', params: { id: props.songId } })
  }
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
  cursor: pointer;
}

.song-title {
  margin: 0;
  padding: 12px;
  font-size: 18px;
  text-align: center;
  height: 32px;
  overflow: hidden;
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
