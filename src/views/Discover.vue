<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { Button } from '@/components/ui/button'
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
  import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs'
  import { useDark } from '@vueuse/core';
  import { isReactive, toRaw } from 'vue';
  import { ref } from 'vue';
  const router = useRouter();
  const random = ref([]);
  const ingredient = ref();
  const alcoholic = ref(false);
  const isDark = useDark();
  const bool = ref(false);
  const loading = ref(false);
  const showDescription = ref(Array(10).fill(false));
  const selectedValue = ref('default');
  const modelValue = ref([]);
  let tableau;

  async function fetchRandom() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    if (response.ok) {
      const data = await response.json();
      random.value = data.drinks || [];
    } else {
      throw new Error("Erreur lors de la requette api")
    }
  }

  async function filterRandom()
  {
    const ok = false;
    while (bool.value == false) {
      loading.value = true;
      await fetchRandom();
      const compare = random.value[0].strAlcoholic.localeCompare(selectedValue.value);
      for (let i = 0; i < modelValue.value.length; i++) {
        // if (random.value[0].strIngredients.includes(modelValue.value[i]) == false) {
        //   ok = true;
        //   break;
        // }
        console.log(random.value[0].strIngredients);
      }
      if (compare == 0)
        bool.value = true;
    }
    bool.value = false;
    loading.value = false;
  }

  const toggleText = (index, show) => {
    showDescription.value[index] = show;
  }

  async function focusResults(id) {
    await router.push({ name: 'FocusResults', params: { id: id }});
  }

  function printmodelvalue()
  {
    console.log(modelValue.value);
    console.log(selectedValue.value);
    console.log(random.value);
    for (const i = 0; random.value.strIngredients + i != null; i++)
    {
      console.log(random.value[0].strIngredients + i);
    }
    tableau.push(random.value);
  }

</script>

<template>
  <div :class="{ 'dark-background' : isDark }" class="flex items-center justify-center flex-col space-y-2">
    <div class="corps">
      <section class="header">
        <div class="title-wrapper">
          <h1 class="sweet-title">
            <span data-text="Find">Find</span>
            <span data-text="YOUR">YOUR</span>
            <span data-text="cocktail">cocktail</span>
          </h1>
        </div>
      </section>
    </div>
    <Tabs default-value="account" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">
          Alcoholic
        </TabsTrigger>
        <TabsTrigger value="password">
          Ingredients
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Alcoholic</CardTitle>
            <CardDescription>
              Please indicate whether you are looking for an alcoholic cocktail or not
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <RadioGroup v-model="selectedValue" default-value="Alcoholic">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="r1" value="Alcoholic" />
                <Label for="r1">I am alcoholic</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="r2" value="Non alcoholic" />
                <Label for="r2">I don't drink this shit</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button>Gamberge</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>
              Please indicate the ingredients you want in your cocktail
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <TagsInput v-model="modelValue">
              <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>
              <TagsInputInput placeholder="Your Ingredients..." />
            </TagsInput>
          </CardContent>
          <CardFooter>
            <Button @click="printmodelvalue()">Show my cocktail</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <Button @click="filterRandom()">Boutton</Button>
    <div class="container h-screen">
      <div v-if="loading == true" class="text-white">Loading...</div>
      <div v-else>
        <div class="card" v-for="(drink, index) in random.slice(0, 10)" :key="index"
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
