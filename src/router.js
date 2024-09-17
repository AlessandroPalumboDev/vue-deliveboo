import { createRouter, createWebHistory } from "vue-router";
import HomepageComponent from "./pages/HomepageComponent.vue";
<<<<<<< HEAD
import SearchPage from "./pages/Searchpage.vue";  // Importa il componente della pagina di ricerca
=======
import RestaurantMenuPage from "./pages/RestaurantMenuPage.vue"; 

>>>>>>> main

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",  // Homepage
      name: "home",
      component: HomepageComponent,
    },
    {
<<<<<<< HEAD
      path: "/search",  // Pagina di ricerca
      name: "search",
      component: SearchPage,
      props: (route) => ({ type: route.query.type }),  // Passa il parametro 'type' come prop al componente
=======
      path: "/menu/",  
      name: "restaurantMenu",
      component: RestaurantMenuPage,
      props: true,  
>>>>>>> main
    },
  ],
});

export { router };
