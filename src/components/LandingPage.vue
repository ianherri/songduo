<template>
  <div class="landing-page-container">
    <div class="landing-page-text-container">
      <h1 class="landing-page-logo-text">SongDuo</h1>
      <h3 class="landing-page-logo-subtext">Write songs with your friends</h3>
    </div>
    <button @click="handleSignIn">start -></button>
  </div>
</template>

<script setup>
import { signIn } from '../composables/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleSignIn() {
  const user = await signIn()

  if (user) {
    router.push({
      name: 'user',
    })
  } else {
    console.log('try again')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landing-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 100vh;

  gap: 24px;
}

.landing-page-text-container {
  display: block;
}

.landing-page-logo-text {
  font-family: 'Monoton', sans-serif;
  font-size: 48px;
  font-weight: 100;
  margin: 0;
  line-height: 50px;
}
.landing-page-logo-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}
</style>
