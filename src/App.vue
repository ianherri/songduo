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
  padding-bottom: 100px;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
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

textarea {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  margin: 0;
  height: 34px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  resize: none;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  background-color: rgb(24, 24, 24);
  border-radius: 0;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
}

input[type='text'] {
  color: rgb(255, 255, 255);
  background-color: rgb(45, 45, 45);
  border: none;
}

textarea[type='search'] {
  -webkit-appearance: none;
}
</style>
