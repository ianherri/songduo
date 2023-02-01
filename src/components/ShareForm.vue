<template>
  <button class="share-button" @click.prevent="showForm = !showForm">
    {{ showForm ? 'X' : 'Share' }}
  </button>
  <div
    :class="[showForm ? 'show-form' : 'hide-form']"
    class="share-form-container"
  >
    <form class="share-form">
      <div class="add-collaborator-container">
        <label for="share">Add collaborators:</label>
        <div class="add-collaborator-form">
          <input
            type="text"
            class="collaborator-input"
            v-model="collaborator"
          />
          <button @click.prevent="handleAddCollaborator">+</button>
        </div>
      </div>
      <div class="visibility-container">
        <div class="visibility-text">Visibility:</div>
        <div class="visibility-options">
          <div
            class="private"
            :class="[isPublic ? 'active-visibility' : '']"
            @click.prevent="handleVisibility"
          >
            Public
          </div>
          <div
            class="public"
            :class="[isPublic ? '' : 'active-visibility']"
            @click.prevent="handleVisibility"
          >
            Private
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useState from '../composables/state'
const { songRef, saveSong } = useState()

const showForm = ref(false)
// TODO: not sure if this is working correctly
const isPublic = ref(songRef.value.visibility === 'public')
const collaborator = ref('')

async function handleVisibility() {
  isPublic.value = !isPublic.value

  songRef.value.visibility = isPublic.value ? 'public' : 'private'

  await saveSong(songRef.value)
}

async function handleAddCollaborator() {
  console.log(collaborator.value)
  console.log(songRef.value.coauthors)
  songRef.value.coauthors.push(collaborator.value)
  await saveSong(songRef.value)
}
</script>

<style scoped>
button {
  font-size: 18px;
  border-radius: 4px;
}

button:hover {
  color: orange;
  transition: all 200ms ease-in-out;
}

.share-form-container {
  display: flex;
  flex-direction: column;
  transition: height 0.5s ease;
}
.share-form {
  font-size: 18px;
  font-weight: 900;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 600px;
  padding: 12px;
  background-color: rgb(0, 0, 0);
}

.hide-form {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;
}
.show-form {
  height: 100px;
  transition: height 0.5s ease;
}

.add-collaborator-container,
.visibility-container {
  display: flex;
  flex-direction: row;
  height: 34px;
  align-items: center;
  justify-content: space-between;
  align-content: center;
}

.visibility-options,
.add-collaborator-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
}

.collaborator-input {
  width: 200px;
  border: 1px solid orange;
  background-color: black;
}
.collaborator-input:focus {
  border: 1px solid orange;
  background-color: rgb(15, 15, 15);
  outline: none;
}

.private,
.public {
  box-sizing: border-box;
  border: 1px solid black;
  padding: 2px 8px 2px 8px;
  color: rgb(113, 113, 113);
  cursor: pointer;
}

.active-visibility {
  box-sizing: border-box;
  color: orange;
  border: 1px solid red;
}

@media (max-width: 800px) {
  .share-form {
    width: 98vw;
  }
}
</style>
