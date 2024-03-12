import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Search from "../views/Search.vue";
import Discover from "../views/Discover.vue";
import Result from "../views/Results.vue"
import FocusResults from "../views/FocusResults.vue"


const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    }, {
        name: 'About',
        path: '/about',
        component: About
    }, {
        name: 'Search',
        path: '/search',
        component: Search
    }, {
        name: 'Discover',
        path: '/discover',
        component: Discover
    }, {
        name: 'Results',
        path: '/results/:type/:name',
        component: Result
    }, {
        name: 'FocusResults',
        path: '/focusresults/:id',
        component: FocusResults
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;