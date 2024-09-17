import { createRouter, createWebHistory } from "vue-router";
import HomepageComponent from "./pages/HomepageComponent.vue";
import SearchPage from "./pages/Searchpage.vue";  // Importa il componente della pagina di ricerca

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",  // Homepage
      name: "home",
      component: HomepageComponent,
    },
    {
      path: "/search",  // Pagina di ricerca
      name: "search",
      component: SearchPage,
      props: (route) => ({ type: route.query.type }),  // Passa il parametro 'type' come prop al componente
    },
  ],
});

export { router };
