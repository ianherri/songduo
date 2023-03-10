<template>
  <div class="stanza-container" :id="props.containerId">
    <div class="stanza-parent-container">
      <div
        @click.prevent="handleAddChildStanza(props.stanzaId)"
        class="test-button"
      >
        <img src="../assets/down.png" />
      </div>
      <textarea
        class="stanza-parent-input"
        :id="props.stanzaId"
        @keyup.delete="() => removeStanza(props.stanzaId)"
        @click.prevent="() => styleStanzas()"
        v-model="stanza.text"
      ></textarea>
      <div
        v-for="child in stanza.children"
        :key="child.id"
        :id="child.id"
        class="stanza-child-container"
      >
        <div class="child-stanza-meta-data">
          {{ child.stanzaAuthorName }} {{ child.timeCreated }}
        </div>
        <textarea class="stanza-child-input" v-model="child.text"> </textarea>
      </div>
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
  styleStanzas('collapse')

  console.log(stanza.value)
})

function handleAddChildStanza(stanzaId) {
  addChildStanza(stanzaId)
  childIdList.value = stanza.value.children.map((child) => child.id)
  clickCount.value += 1
  styleStanzas('expand')
}

function styleStanzas(cmd) {
  let totalHeight = 0
  let totalWidth = 0

  const colorArrBright = [
    'rgb(211, 64, 23)',
    'rgb(236, 229, 28)',
    'rgb(73, 236, 28)',
    'rgb(28, 222, 236)',
    'rgb(28, 146, 236)',
  ]

  const colorArrDull = ['rgb(103, 103, 103)', 'rgb(61, 61, 61)']

  // main function wrapped in a timeout to allow Vue to add conditional class

  setTimeout(() => {
    // variable used for iterating through color array
    let j = 1
    // get stanza container by it's id
    const container = document.getElementById(props.containerId)
    // get children HTML elements by ids
    const children = childIdList.value.map((childId) => {
      return document.getElementById(childId)
    })

    container.style.height = `30px`

    const parent = document.getElementById(props.stanzaId)
    parent.style.top = '0px'
    parent.style.zIndex = 999
    parent.addEventListener('drag', (event) => {
      console.log(event)
    })

    for (let i = 0; i < children.length; i++) {
      const elementHeight = children[i].offsetHeight
      const childTextArea = Array.from(children[i].children).filter(
        (elem) => elem.tagName === 'TEXTAREA'
      )[0]
      const childMetaData = Array.from(children[i].children).filter(
        (elem) => elem.tagName === 'DIV'
      )[0]
      if (j > colorArrBright.length) {
        j = 1
        children[i].style.backgroundColor = colorArrBright[j]
        j++
      } else {
        children[i].style.backgroundColor = colorArrBright[j]
        j++
      }

      children[i].style.zIndex = 900 - i

      // first click expand child elements
      // and dull background colors
      if (cmd === 'expand') {
        // totalHeight variable determines how far below parent div element to position the child
        console.log(elementHeight)
        totalHeight += 36
        children[i].style.top = `${totalHeight}px`
        children[i].style.width = '100%'
        children[i].style.borderRadius = '0px'

        childTextArea.style.visibility = ''
        childMetaData.style.visibility = ''
        childTextArea.style.height = '34px'
        childMetaData.style.height = '34px'

        if (j >= colorArrDull.length) {
          j = 1
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
        totalHeight = -4
        totalWidth += 18
        children[i].style.top = `${totalHeight}px`
        children[i].style.width = `${totalWidth}px`
        children[i].style.borderRadius = '0px 2px 0px 0px'

        childTextArea.style.visibility = 'hidden'
        childTextArea.style.height = '0px'
        childMetaData.style.visibility = 'hidden'
        childMetaData.style.height = '0px'
      }
    }
  }, 50)
}

// drag stanza
// add drag listener
// calculate position of the dragged element (available via event screenX and screenY)
// find position of other non-dragged elements (available with element.getBoundingClientRect())

//
</script>

<style scoped>
.test-button {
  position: absolute;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0px;
  top: 0px;
  border-radius: 2px;
  width: 34px;
  height: 34px;
  border-radius: 2px;
  background-color: rgb(24, 24, 24);
}

img {
  width: 16px;
  height: 8px;
  flex-shrink: 0;
}

.test-button:hover {
}
.stanza-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;
}

.stanza-parent-container {
  position: relative;
  display: block;
  width: 100%;
}

.stanza-child-input {
  width: 100%;
  height: 34px;
  border: none;
  padding-left: 8px;
}

.child-stanza-meta-data {
  font-size: 10px;
  margin: 0;
  width: 45px;
  max-height: 34px;
}

.stanza-parent-input:focus,
.stanza-child-input:focus {
  border: none;
  outline: none;
}

.stanza-child-container {
  color: rgb(255, 255, 255);
  box-sizing: border-box;
}

.stanza-parent-input,
.stanza-child-container {
  position: absolute;
  display: flex;
  flex-direction: row;

  width: 550px;
  font-size: 16px;
  border: none;
  border-radius: 2px;
  transition: all 0.5s ease;
  top: 0px;
  padding-left: 8px;
}

@media (max-width: 800px) {
  .stanza-parent-input,
  .stanza-child-container {
    width: 90%;
  }
}
</style>

<!-- oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' -->
