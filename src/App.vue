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
}
</style>
