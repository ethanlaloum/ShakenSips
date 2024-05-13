<script setup>
  import { ref } from 'vue';
  import { useDark } from '@vueuse/core'
  import { useRouter } from 'vue-router';

  const isDark = useDark()
  const cocktailName = ref(null);
  const cocktailData = ref(null);
  const requestType = ref(null);
  const router = useRouter();
  import { Button } from '@/components/ui/button';
  import { useToast } from '@/components/ui/toast/use-toast';

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'

  async function fetchByName(cocktailName)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    if (response.ok) {
      cocktailData.value = await response.json();
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchByFirstLetter(firstLetter)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    if (response.ok) {
      cocktailData.value = await response.json();
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchByIngredient(ingredientName)
  {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    if (response.ok) {
      cocktailData.value = await response.json();
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchRandom() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    if (response.ok) {
      cocktailData.value = await response.json();
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function fetchByType(requestType)
  {
    const name = cocktailName.value;
    switch (requestType) {
      case "Name":
        console.log(requestType);
        console.log(name);
        await router.push({ name: 'Results', params: { name: name, type: "name" }});
        break;
      case "First Letter":
        await router.push({ name: 'Results', params: { name: name, type: "first" }});
        break;
      case "Ingredient":
        await router.push({ name: 'Results', params: { name: name, type: "ingredient" }});
        break;
      case "random":
        await router.push({ name: 'Results', params: { name: name, type: "random" }});
        break;
      default:
        break;
    }
  }

  function placeholder_input()
  {
    if (requestType.value === "Name") {
      return "Enter the name of the cocktail"
    } else if (requestType.value === "First Letter") {
      return "Enter the first letter of the cocktail"
    } else if (requestType.value === "Ingredient") {
      return "Enter the ingredient of the cocktail"
    } else if (requestType.value === "random"){
      return "Don't enter anything, just click on the button to get a random cocktail"
    } else {
      return "Choose a type"
    }
  }

  function changeType(type)
  {
    requestType.value = type;
  }
</script>

<template>
  <div :class="{ 'dark-background' : isDark }" class="relative h-screen background-gradient">
    <div class="corps">
      <section class="header">
        <div class="title-wrapper">
          <h1 class="sweet-title">
            <span data-text="find">find</span>
            <span data-text="your">your</span>
            <span data-text="cocktail">cocktail</span>
          </h1>
        </div>
      </section>
    </div>
    <div class="absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-lg mx-auto flex justify-center">
      <Select>
        <SelectTrigger class="w-[180px] h-[50px]">
          <SelectValue placeholder="Select a Filter" class="dark:text-white"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filters</SelectLabel>
            <div class="flex flex-col space-y-1">
              <Button @click="changeType('Name')" class="bg-white text-black hover:bg-black hover:text-white" value="Name">Name</Button>
              <Button @click="changeType('First Letter')" class="bg-white text-black hover:bg-black hover:text-white" value="First Letter">First Letter</Button>
              <Button @click="changeType('Ingredient')" class="bg-white text-black hover:bg-black hover:text-white" value="Ingredient">Ingredient</Button>
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="text" v-model="cocktailName" :placeholder="placeholder_input()" class="w-80 p-2 border-2 rounded-lg border-transparent focus:outline-none">
      <Button v-on:click="fetchByType(requestType)" variant="destructive" class="w-[180px] h-[50px]">Search</Button>
    </div>
  </div>
</template>

<style scoped>
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
