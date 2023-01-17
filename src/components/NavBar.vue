<template>
  <div class="nav-container">
    <h1 class="nav-logo">SD</h1>
    <button @click="handleSignOut" class="nav-button">sign out</button>
  </div>
</template>

<script setup>
import { doSignOut } from '@/composables/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSignOut() {
  doSignOut()

  router.push({
    name: 'home',
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-container {
  width: 800px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-logo {
  font-family: 'Monoton', sans-serif;
  font-size: 48px;
  font-weight: 100;
  margin: 0;
  line-height: 50px;
}

.nav-button {
  font-size: 20px;
}

@media (max-width: 800px) {
  .nav-container {
    width: 100vw;
  }
}
</style>
