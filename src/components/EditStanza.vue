<template>
  <div class="stanza-container">
    <div class="stanza-parent-container">
      <textarea
        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
        class="stanza-input"
        :class="{ 'odd-number': props.index % 2 !== 0 }"
        @keyup.delete="() => removeStanza(stanza.id)"
        @dblclick.prevent="() => addChildStanza(stanza.id)"
        v-model="stanza.text"
      ></textarea>
      <div
        v-for="child in stanza.children"
        :key="child.id"
        class="stanza-child"
      >
        {{ child.id }}
      </div>
    </div>
  </div>
</template>

<script setup>
import useState from '../composables/state'
import { defineProps, ref } from 'vue'
const { removeStanza, addChildStanza, getStanza } = useState()

const props = defineProps({
  stanzaId: String,
  index: Number,
})

const stanza = ref(getStanza(props.stanzaId))
</script>

<style scoped>
.stanza-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.stanza-parent-container {
  width: 100%;
}

.stanza-input:focus {
  border: none;
  outline: none;
}

.stanza-input {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.stanza-input {
  font-size: 16px;
  border: none;
}

.odd-number {
  background-color: rgb(53, 53, 53);
}
</style>
