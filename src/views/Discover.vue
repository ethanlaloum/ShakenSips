<script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute()
  const name = route.params.name;
  console.log(name)
</script>

<template>
  <div class="h-screen bg-back_pink">
    <div class="container text-text_pink text-9xl">
      <h1>My Cocktail</h1>
    </div>
  </div>
</template>

<style scoped>
  *, *:after, *:before {
    box-sizing: border-box;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-weight: 900;
    text-shadow: -0.0075em 0.0075em 0 #fef2f6, 0.005em 0.005em 0 #f6a5c1, 0.01em 0.01em 0 #f7aac4, 0.015em 0.015em #f7aec7, 0.02em 0.02em 0 #f8b3ca, 0.025em 0.025em 0 #f8b7cd, 0.03em 0.03em 0 #f8bcd0, 0.035em 0.035em 0 #f9c0d3;
  }
</style>