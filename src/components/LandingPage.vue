<template>
  <div class="landing-page-container">
    <div class="landing-page-text-container">
      <h1 class="landing-page-logo-text">SongDuo</h1>
      <h3 class="landing-page-logo-subtext">Write songs with your friends</h3>
    </div>

    <button @click="handleSignIn">start -></button>
    <p class="beta-notice">Google Sign Up Only</p>
  </div>
</template>

<script setup>
import useAuth from '../composables/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { signIn } = useAuth()

async function handleSignIn() {
  console.log('test log')
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

.beta-notice {
  font-size: 12px;
  font-style: italic;
  color: rgb(227, 117, 33);
}

@media (max-width: 800px) {
  .landing-page-container {
    width: 100vw;
  }
}
</style>

<!-- class="g-recaptcha signin-form"
      data-sitekey="6Lf7zRckAAAAADNa7RD6Zbc20WlEVpP63ScB4p2a"
      data-callback="onSubmit"
      data-action="submit" -->
