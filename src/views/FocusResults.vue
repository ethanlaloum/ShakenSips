<script setup>
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { useDark } from '@vueuse/core';

  const route = useRoute()
  const isDark = useDark()
  const id = route.params.id;
  let data = ref(null);

  async function fetchById(id)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    if (response.ok) {
      data.value = await response.json();
      console.log(data.value);
    } else
      throw new Error("Erreur lors de la requette api")
  }
  if (id)
    fetchById(id);
</script>

<template>
  <div :class="{ 'dark-background': isDark }" class="relative flex h-screen">
    <div class="flex flex-row">
      <div class="flex flex-col"><br><br>
        <span class="text-4xl text-white">
          Recette {{ data.drinks[0].strDrink }}
        </span>
        <img :src="data.drinks[0].strDrinkThumb">
      </div>
      <div class="flex flex-col"><br><br>
        <span class="text-white text-4xl">Ingredients :</span>
        <ul class="text-left">
          <li v-for="i in 15" :key="i">
            <span v-if="data.drinks[0][`strIngredient${i}`]" class="text-white"> - {{ data.drinks[0][`strIngredient${i}`] }}</span>
            &nbsp;
            <span v-if="data.drinks[0][`strMeasure${i}`]" class="text-white">{{ data.drinks[0][`strMeasure${i}`] }}</span>
          </li>
        </ul>
        <div>
          <span class="text-white text-4xl">Preparation of {{ data.drinks[0].strDrink }}</span>
          <p class="text-white">{{ data.drinks[0].strInstructions }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
