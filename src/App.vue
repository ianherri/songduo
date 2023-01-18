<template>
  <RouterView />
</template>

<script setup></script>

<style>
body {
  background-color: black;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}
button {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
