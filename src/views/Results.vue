<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useDark } from '@vueuse/core';

  const isDark = useDark()
  const route = useRoute()
  const drinks = ref([]);
  const name = route.params.name;
  const type = route.params.type;
  const showDescription = ref(Array(10).fill(false));
  const router = useRouter();
  const loading = ref(true);

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
        await fetchByName(name);
        break;
      case "first":
        await fetchByFirstLetter(name);
        break;
      case "ingredient":
        await fetchByIngredient(name);
        break;
      case "random":
        break;
      default:
        break;
    }
  }

  onMounted(async() => {
    await fetchByType();
    loading.value = false;
  });

  const toggleText = (index, show) => {
    showDescription.value[index] = show;
  }

  async function focusResults(id) {
    await router.push({ name: 'FocusResults', params: { id: id }});
  }
</script>

<template>
  <div :class="{ 'dark-background' : isDark }"><br>
    <div class="corps">
      <section class="header">
        <div class="title-wrapper">
          <h1 class="sweet-title">
            <span data-text="results">Results</span>
            <span data-text="for">For</span>
            <span :data-text="name">{{ name }}</span>
          </h1>
        </div>
      </section>
    </div>
    <div class="container">
      <div v-if="loading == true" class="h-screen">
        <h1 class="text-white text-4xl">Loading...</h1>
      </div>
      <div v-else class="flex flex-wrap">
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

  .header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 20rem);
  }

  .title-wrapper {
    display: grid;
    align-items: center;
    justify-content: center;
    transform: skew(0, -10deg);
  }

  .top-title {
    order: 1;
    text-align: center;
    display: block;
    color: #fff;
    font-size: clamp(1rem, 4vw, 1.5rem);
    margin-bottom: 1rem;
    padding-right: 2rem;
  }

  .bottom-title {
    order: 3;
    text-align: center;
    display: block;
    color: #fff;
    font-size: clamp(1rem, 4vw, 1.5rem);
    margin-top: 2rem;
    padding-left: 2rem;
  }

  .sweet-title {
    order: 2;
    color: #fde9ff;
    font-weight: 900;
    text-transform: uppercase;
    font-size: clamp(3rem, 10vw, 6rem);
    line-height: 0.75em;
    text-align: center;
    text-shadow: 3px 1px 1px #4af7ff, 2px 2px 1px #165bfb, 4px 2px 1px #4af7ff,
      3px 3px 1px #165bfb, 5px 3px 1px #4af7ff, 4px 4px 1px #165bfb,
      6px 4px 1px #4af7ff, 5px 5px 1px #165bfb, 7px 5px 1px #4af7ff,
      6px 6px 1px #165bfb, 8px 6px 1px #4af7ff, 7px 7px 1px #165bfb,
      9px 7px 1px #4af7ff;

    span {
      display: block;
      position: relative;

      &:before {
        content: attr(data-text);
        position: absolute;
        text-shadow: 2px 2px 1px #e94aa1, -1px -1px 1px #c736f9,
          -2px 2px 1px #e94aa1, 1px -1px 1px #f736f9;
        z-index: 1;
      }

      &:nth-child(1) {
        padding-right: 2.25rem;
      }

      &:nth-child(2) {
        padding-left: 2.25rem;
      }
    }
  }

  .disclaimer {
    width: 100%;
    height: 2rem;
    text-align: center;
    color: #fff;

    a {
      color: #fff;
    }
  }
</style>
