<script setup>
  import { ref } from 'vue';
  const showDescription = ref(Array(10).fill(false));
  const drinks = ref([
    {
      name:"Mojito",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.",
      img: "https://www.thecocktaildb.com/images/media/drink/3z6xdi1589574603.jpg"
    },
    {
      name:"Old Fashioned",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey. Garnish with orange twist, and a cocktail cherry.",
      img: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
    },
    {
      name:"Long Island Tea",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Mix all ingredients in a highball glass with ice and stir gently. Garnish with lemon and serve.",
      img: "https://www.thecocktaildb.com/images/media/drink/tppn6i1589574695.jpg"
    },
    {
      name: "Negroni",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Stir into glass over ice, garnish and serve.",
      img: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg"
    },
    {
      name: "Whiskey Sour",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Shake with ice. Strain into chilled glass, garnish and serve.",
      img: "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg"
    },
    {
      name: "Dry Martini",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Stir gin and dry vermouth over ice cubes in a mixing glass. Strain into a chilled cocktail glass. Garnish and serve.",
      img: "https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg"
    },
    {
      name: "Daiquiri",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.",
      img: "https://www.thecocktaildb.com/images/media/drink/usuuur1439906797.jpg"
    },
    {
      name: "Margarita",
      type: "Cocktail",
      category: "Alcoholic",
      instructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
      img: "https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg"
    },
  ]);

  const toggleText = (index, show) => {
    showDescription.value[index] = show;
  }
</script>

<template>
    <div class="container">
      <div class="card h-screen" v-for="(drink, index) in drinks" :key="index"
      @mouseenter="toggleText(index, true)"
      @mouseleave="toggleText(index, false)">
        <div class="box">
          <img :src="drink.img" class="absolute inset-0 object-cover opacity-50 w-full h-full" alt="Drink Image">
          <div class="content transition-opacity duration-300">
            <h2>{{ index + 1 }}</h2>
            <h1 v-if="!showDescription[index]" class="text-4xl text-white">{{ drink.name }}</h1>
            <p v-if="!showDescription[index]">{{ drink.type }} <br> {{ drink.category }}</p>
            <p v-else>{{ drink.instructions }}</p>
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
    transition: 250ms;
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
    cursor: pointer;
    transform: scale(1.2);
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
