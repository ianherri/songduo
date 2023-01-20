<template>
  <div class="stanza-container" :id="props.containerId">
    <div class="stanza-parent-container">
      <div
        @click.prevent="handleAddChildStanza(props.stanzaId)"
        class="test-button"
      >
        +
      </div>
      <textarea
        class="stanza-parent-input"
        :id="props.stanzaId"
        @keyup.delete="() => removeStanza(props.stanzaId)"
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

const childIdList = ref(stanza.value.children.map((child) => child.id))

onMounted(() => {
  clickCount.value = 0
  moveToTop()
})

function handleAddChildStanza(stanzaId) {
  clickCount.value = 0
  childIdList.value = stanza.value.children.map((child) => child.id)
  addChildStanza(stanzaId)

  // the child is not being added to child id list
  moveToTop()
}

function moveToTop() {
  clickCount.value += 1
  let totalHeight = 0
  let totalWidth = 0

  const colorArrBright = [
    'rgb(211, 64, 23)',
    'rgb(236, 229, 28)',
    'rgb(73, 236, 28)',
    'rgb(28, 222, 236)',
    'rgb(28, 146, 236)',
  ]

  const colorArrDull = [
    'rgb(110, 35, 14)',
    'rgb(110, 106, 11)',
    'rgb(32, 102, 13)',
    'rgb(13, 79, 84)',
    'rgb(13, 62, 99)',
  ]
  setTimeout(() => {
    // need to get elements by ID so that
    const container = document.getElementById(props.containerId)
    const children = childIdList.value.map((childId) => {
      return document.getElementById(childId)
    })

    container.style.height = `30px`

    const parent = document.getElementById(props.stanzaId)
    parent.style.top = '0px'
    parent.style.zIndex = 999
    let j = 0
    for (let i = 0; i < children.length; i++) {
      const elementHeight = children[i].offsetHeight
      if (j >= colorArrBright.length) {
        j = 0
        children[i].style.backgroundColor = colorArrBright[j]
        j++
      } else {
        children[i].style.backgroundColor = colorArrBright[j]
        j++
      }

      children[i].style.zIndex = 900 - i

      // first click expand or elements
      // and dull background colors
      if (clickCount.value % 2 === 0) {
        totalHeight += elementHeight
        children[i].style.top = `${totalHeight}px`
        children[i].style.width = '100%'
        children[i].style.borderRadius = '0px'

        if (j >= colorArrBright.length) {
          j = 0
          children[i].style.backgroundColor = colorArrDull[j]
          j++
        } else {
          children[i].style.backgroundColor = colorArrDull[j]
          j++
        }

        container.style.height = `${
          totalHeight + parent.offsetHeight + childIdList.value.length
        }px`

        // second click contract elements
      } else {
        container.style.height = `30px`
        // container.style.height = `${parent.offsetHeight - 12}px`
        // container.style.top = `${childIdList.value.length * 4}px`

        totalHeight = -4
        totalWidth += 18
        children[i].style.top = `${totalHeight}px`
        children[i].style.width = `${totalWidth}px`
        children[i].style.borderRadius = '0px 2px 0px 0px'
      }
    }
  }, 50)
}

// watch(stanza.value, (oldStanza, newStanza) => {
//   console.log(oldStanza, newStanza)
//   moveToTop()
// })
</script>

<style scoped>
.test-button {
  position: absolute;
  cursor: pointer;
  border-radius: 2px;
  top: 5px;
  right: 6px;
  z-index: 1000;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 2px;
  background-color: rgb(0, 0, 0);
}

.test-button:hover {
  color: coral;
}
.stanza-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;
}

.stanza-parent-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.stanza-parent-input:focus,
.stanza-child-input:focus {
  border: none;
  outline: none;
}

.stanza-child-input {
  color: rgb(255, 255, 255);
  box-sizing: border-box;
}

.stanza-parent-input,
.stanza-child-input {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 16px;
  border: none;
  transition: all 0.5s ease;
  top: 0px;
}

.odd-number {
  background-color: rgb(53, 53, 53);
}
</style>

<!-- oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' -->
