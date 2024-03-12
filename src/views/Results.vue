<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useDark } from '@vueuse/core';

  const isDark = useDark()
  const route = useRoute()
  const drinks = ref([]);
  const name = route.params.name;
  const type = route.params.type;
  const showDescription = ref(Array(10).fill(false));
  const router = useRouter();

  async function fetchByName(cocktailName)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    if (response.ok) {
      const data = await response.json();
      drinks.value = data.drinks || [];
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchByFirstLetter(firstLetter)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    if (response.ok) {
      const data = await response.json();
      drinks.value = data.drinks || [];
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchByIngredient(ingredientName)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    if (response.ok) {
      const data = await response.json();
      drinks.value = data.drinks || [];
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchByType()
  {
    switch (type) {
      case "name":
        fetchByName(name);
        break;
      case "first":
        fetchByFirstLetter(name);
        break;
      case "ingredient":
        fetchByIngredient(name);
        break;
      case "random":
        break;
      default:
        break;
    }
  }
  if (name != undefined) {
    fetchByType();
  }
  const toggleText = (index, show) => {
    showDescription.value[index] = show;
  }

  async function focusResults(id) {
    await router.push({ name: 'FocusResults', params: { id: id }});
  }
</script>

<template>
  <div :class="{ 'dark-background' : isDark }"><br>
    <h1 class="text-5xl font-bold text-white dark:text-white border-8 border-transparent">Results for {{ name }}</h1>
    <div class="container">
      <div class="card h-screen" v-for="(drink, index) in drinks.slice(0, 10)" :key="index"
      @mouseenter="toggleText(index, true)"
      @mouseleave="toggleText(index, false)"
      @click="focusResults(drink.idDrink)">
        <div class="box">
          <img :src="drink.strDrinkThumb" class="absolute inset-0 object-cover opacity-50 w-full h-full" alt="Drink Image">
          <div class="content transition-opacity duration-300">
            <h2>{{ index + 1 }}</h2>
            <h3 v-if="!showDescription[index]">{{ drink.strDrink }}</h3>
            <p v-if="!showDescription[index]">{{ drink.strCategory }} <br> {{ drink.strAlcoholic }}</p>
            <p v-else>{{ drink.strInstructions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  body .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }

  body .container .card {
    position: relative;
    min-width: 320px;
    height: 440px;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
      inset -5px -5px 15px rgba(255, 255, 255, 0.1),
      5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    margin: 30px;
    transition: 0.5s;
  }

  body .container .card .box {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: #2a2b2f;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: transform 600ms;
  }

  body .container .card .box:hover {
    transform: scale(1.3);
    cursor: pointer;
  }

  body .container .card .box:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.03);
  }

  body .container .card .box .content {
    padding: 20px;
    text-align: center;
    z-index: 1;
  }

  body .container .card .box .content h2 {
    position: absolute;
    top: -10px;
    right: 30px;
    font-size: 8rem;
    color: rgba(255, 255, 255, 0.1);
  }

  body .container .card .box .content h3 {
    font-size: 1.8rem;
    color: #fff;
    z-index: 1;
    transition: 0.5s;
    margin-bottom: 15px;
  }

  body .container .card .box .content p {
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
    z-index: 1;
    transition: 0.5s;
  }

  body .container .card .box .content a {
    position: relative;
    display: inline-block;
    padding: 8px 20px;
    background: black;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    margin-top: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }
  body .container .card .box .content a:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
    background: #fff;
    color: #000;
  }
</style>

