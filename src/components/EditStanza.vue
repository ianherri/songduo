<template>
  <div class="stanza-container" :id="props.stanzaId">
    <div class="stanza-parent-container">
      <form
        @submit.prevent="addParentStanza"
        class="stanza-parent-input-container"
      >
        <input
          class="stanza-parent-input"
          :id="props.stanzaId"
          @keyup.delete="() => removeStanza(props.stanzaId)"
          @keyup="() => handleKeyUp(props.stanzaId)"
          v-model="stanza.text"
        />
        <div class="child-stanza-meta-data">
          {{ stanza.stanzaAuthorName }}
          {{ stanza.id }}
          {{ new Date(stanza.timeCreated).toLocaleString('en-US', options) }}
        </div>
      </form>
    </div>
    <div
      v-for="child in stanza.children"
      :key="child.id"
      :id="child.id"
      class="stanza-child-container"
    >
      <textarea class="stanza-child-input" v-model="child.text"> </textarea>
      <div class="child-stanza-meta-data">
        {{ child.stanzaAuthorName }}
        {{ new Date(child.timeCreated).toLocaleString('en-US', options) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import useState from '../composables/state'
import { defineProps, ref, watch } from 'vue'
const { removeStanza, getStanza, addChildStanza, songRef, addParentStanza } =
  useState()

const props = defineProps({
  stanzaId: String,
  containerId: String,
  songId: String,
})

const options = {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

const stanza = ref(getStanza(props.stanzaId))

function handleKeyUp(stanzaId) {
  event.preventDefault()
  if (event.key === '/') {
    addChildStanza(stanzaId)
  }
  if (event.key === 'Enter') {
    console.log(event.key)
  }
}

watch(songRef.value, () => {
  stanza.value = getStanza(props.stanzaId)
})

//
</script>

<style scoped>
.stanza-container {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;
  cursor: move;
  padding-bottom: 12px;
  /* cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab; */
}

.stanza-container:active {
  cursor: grabbing;
  /* cursor: -moz-grabbing;
  cursor: -webkit-grabbing; */
}
.stanza-parent-container {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 100%;
}

.stanza-parent-input {
  width: 100%;
  border: none;
  padding-left: 8px;
  font-weight: 900;
  font-family: 'Roboto' sans-serif;
  color: rgb(186, 186, 186);
}

img {
  width: 16px;
  height: 8px;
  flex-shrink: 0;
}

.stanza-child-container,
.stanza-parent-input-container {
  color: rgb(255, 255, 255);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0px;
  font-size: 16px;
  border: none;
  transition: all 0.5s ease;
}

.stanza-child-input {
  width: 100%;
  height: 34px;
  border: none;
  padding-left: 12px;
  font-weight: 900;
  font-family: 'Roboto' sans-serif;
  font-style: italic;
  color: rgb(113, 113, 113);
}

.child-stanza-meta-data {
  font-size: 10px;
  box-sizing: border-box;
  margin: 0;
  width: auto;
  color: grey;
  background-color: rgb(24, 24, 24);
  max-height: 34px;
  padding: 2px 8px 2px 8px;
  text-align: end;
}

.stanza-parent-input:focus,
.stanza-child-input:focus {
  border: none;
  outline: none;
}

.dragging {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

@media (max-width: 800px) {
  .stanza-parent-input,
  .stanza-child-container {
    width: 100%;
  }
}
</style>

<!-- Old homemade dragging code... -->

<!-- <div
    draggable="true"
    @dragstart="() => handleReposition(props.stanzaId)"
    @dragover.prevent
    @dragenter.prevent
    @drop="handleDrop"
    @touchmove="handleDrag"
    @touchend="handleDragEnd"
    class="stanza-container"
    :id="props.stanzaId"
  > -->

<!-- function handleReposition(id) {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('stanzaId', id)
}

function handleDrop() {
  console.log('handle drop triggered')
  const draggedId = event.dataTransfer.getData('stanzaId')
  const targetId = event.currentTarget.id
  const newStanzaOrder = songRef.value.stanzaOrder.filter(
    (stanzaId) => stanzaId !== draggedId
  )

  const targetIndex = songRef.value.stanzaOrder.indexOf(targetId)
  newStanzaOrder.splice(targetIndex, 0, draggedId)

  songRef.value.stanzaOrder = newStanzaOrder
  orderStanzas()
}

function handleDrag() {
  console.log('drag', event.target.id)
}
function handleDragEnd() {
  console.log('end', event)
} -->
