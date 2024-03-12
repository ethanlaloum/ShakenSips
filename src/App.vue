<script setup>
  import { useDark, useToggle } from '@vueuse/core'
  import Navbar from './composants/Navbar.vue'
  const isDark = useDark()
</script>

<template>
  <Navbar />
</template>

<style>

  #app {
    @import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@300;700;900&display=swap");
    font-family: "Exo 2", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background: rgb(63, 161, 251);
    background: linear-gradient(
      142deg,
      rgba(63, 161, 251, 1) 0%,
      rgba(252, 70, 168, 1) 100%
    );
  }

  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .dark-background {
    background-color: rgb(24 24 27);
  }
</style>
