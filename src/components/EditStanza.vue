<template>
  <div class="stanza-container" :id="props.containerId">
    <div class="stanza-parent-container">
      <textarea
        class="stanza-parent-input"
        :id="props.stanzaId"
        :class="{ 'odd-number': props.index % 2 !== 0 }"
        @keyup.delete="() => removeStanza(props.stanzaId)"
        @dblclick.prevent="() => addChildStanza(props.stanzaId)"
        @click.prevent="() => moveToTop(props.stanzaId)"
        v-model="stanza.text"
      ></textarea>
      <textarea
        v-for="child in stanza.children"
        :key="child.id"
        :id="child.id"
        class="stanza-child-input"
        v-model="child.text"
      >
      </textarea>
    </div>
  </div>
</template>

<script setup>
import useState from '../composables/state'
import { defineProps, ref, onMounted } from 'vue'
const { removeStanza, addChildStanza, getStanza } = useState()

const props = defineProps({
  stanzaId: String,
  containerId: String,
})

const stanza = ref(getStanza(props.stanzaId))
const clickCount = ref(0)
const topIndex = ref(props.index)

const childIdList = ref(stanza.value.children.map((child) => child.id))

onMounted(() => {
  clickCount.value = 0
  moveToTop(props.stanzaId)
  // set container height
})

function moveToTop(index) {
  topIndex.value = index
  clickCount.value += 1
  let totalHeight = 0

  const colorArr = [
    'rgb(211, 64, 23)',
    'rgb(236, 229, 28)',
    'rgb(73, 236, 28)',
    'rgb(28, 222, 236)',
    'rgb(28, 146, 236)',
  ]
  setTimeout(() => {
    // need to get elements by ID so that
    const children = childIdList.value.map((childId) => {
      return document.getElementById(childId)
    })

    const parent = document.getElementById(props.stanzaId)
    parent.style.top = '0px'
    parent.style.zIndex = 999

    // set height of container

    for (let i = 0; i < children.length; i++) {
      const elementHeight = children[i].offsetHeight
      const container = document.getElementById(props.containerId)
      children[i].style.backgroundColor = colorArr[i]
      children[i].style.zIndex = 900 - i

      // every other click, expand or contract elements
      if (clickCount.value % 2 === 0) {
        totalHeight += elementHeight + 12
        children[i].style.top = `${totalHeight}px`

        container.style.height = `${
          totalHeight + parent.offsetHeight + childIdList.value.length
        }px`
      } else {
        container.style.height = `${
          parent.offsetHeight + childIdList.value.length * 4
        }px`
        container.style.top = `${childIdList.value.length * 4}px`

        totalHeight -= 4
        children[i].style.top = `${totalHeight}px`
      }
    }
  }, 50)
}
</script>

<style scoped>
.stanza-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stanza-parent-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.stanza-input:focus,
.stanza-child-input:focus {
  border: none;
  outline: none;
}

.stanza-child-input {
  color: rgb(181, 22, 22);
}

.stanza-parent-input,
.stanza-child-input {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 16px;
  border: none;
  transition: top 0.5s ease;
  top: 0px;
}

.odd-number {
  background-color: rgb(53, 53, 53);
}
</style>

<!-- oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' -->
