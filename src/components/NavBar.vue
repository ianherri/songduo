<template>
  <div class="nav-container">
    <h1 @click="handleProfileNav" class="nav-logo">SD</h1>
    <button @click="handleSignOut" class="nav-button">sign out</button>
  </div>
</template>

<script setup>
import useAuth from '@/composables/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { doSignOut } = useAuth()

function handleProfileNav() {
  router.push({
    name: 'user',
  })
}

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
  padding-top: 10px;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: 'Monoton', sans-serif;
  font-size: 48px;
  font-weight: 100;
  margin: 0;
  padding: 0;
  line-height: 48px;
  cursor: pointer;
}

.nav-button {
  font-size: 20px;
}

@media (max-width: 800px) {
  .nav-container {
    max-width: 100vw;
  }

  .nav-logo {
    padding-left: 12px;
  }

  .nav-button {
    padding-right: 12px;
  }
}
</style>
