<script setup>
  import { useDark, useToggle } from '@vueuse/core'
  import { Button } from '@/components/ui/button'
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  function is_dark(index) {
    if (isDark.value && index == 0) {
      return "../../img/light.png"
    } else if (!isDark.value && index == 0) {
      return "../../img/moon.png"
    }
    if (index == 1)
      return "../../img/Flamingo.png"
  }
</script>

<template>
  <div :class="{ 'dark-background' : isDark }">
    <nav class="bg-white z-10 dark:bg-zinc-900 navbar border-b-4 border-b-stone-500">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img :src="is_dark(1)" class="size-10" alt="Cooktail Logo" />
            <h1 class="sweet-title">
              <span data-text="My">My</span>
              <span data-text="Cocktail">Cocktail</span>
            </h1>
        </router-link>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-zinc-900 md:dark:bg-zinc-900">
            <Button variant="ghost">
              <router-link to="/" aria-current="page">Home</router-link>
            </Button>
            <Button variant="ghost">
              <router-link to="/about">About</router-link>
            </Button>
            <Button variant="ghost">
              <router-link to="/search">Search</router-link>
            </Button>
            <Button variant="ghost">
              <router-link to="/discover">Discover</router-link>
            </Button>
            <li class="mr-4">
              <button @click="toggleDark()" class="border-2 rounded-full border-transparent hover:border-current">
                <img :src="is_dark(0)" class="h-8">
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
  .sweet-title {
    order: 2;
    color: #fde9ff;
    font-weight: 900;
    text-transform: uppercase;
    font-size: clamp(1rem, 2vw, 1.5rem);
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
</style>