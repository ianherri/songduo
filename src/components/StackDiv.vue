<template>
  <div class="test-container">
    <div
      class="adjustable-divs"
      v-for="(item, index) in items"
      :key="index"
      @click="() => moveToTop(index)"
      :class="{ top: index === topIndex, bottom: index != topIndex }"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  moveToTop(0)
})

const items = [
  { text: 'Div 1' },
  { text: 'Div 2' },
  { text: 'Div 3' },
  { text: 'Div 4' },
  { text: 'Div 5' },
]

const clickCount = ref(0)

let topIndex = ref(0)

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
    const bottoms = document.getElementsByClassName('bottom')
    const top = document.getElementsByClassName('top')
    top[0].style.top = '0px'
    top[0].style.backgroundColor = 'rgb(255, 255, 255)'
    top[0].style.zIndex = 999

    for (let i = 0; i < bottoms.length; i++) {
      const elementHeight = bottoms[i].offsetHeight
      bottoms[i].style.backgroundColor = colorArr[i]
      bottoms[i].style.zIndex = -i

      // every other click, expand or contract elements
      if (clickCount.value % 2 === 0) {
        totalHeight += elementHeight + 12
        bottoms[i].style.top = `${totalHeight}px`
      } else {
        totalHeight -= 4
        bottoms[i].style.top = `${totalHeight}px`
      }
    }
  }, 50)
}
</script>

<style scoped>
.test-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  color: black;
  height: auto;
  width: 400px;
}
.adjustable-divs {
  top: 0;
  width: 300px;
  height: 45px;
  transition: top 0.5s ease;
  position: absolute;
}
</style>
