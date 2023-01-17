<template>
  <div @click="handleSongClick" class="song-container">
    <h1 class="song-title">{{ props.title }}</h1>
    <h2 class="song-author">author</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String,
})
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
}

.song-author {
  margin: 0;
}
</style>
