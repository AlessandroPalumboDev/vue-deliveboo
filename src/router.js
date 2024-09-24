import { createRouter, createWebHistory } from "vue-router";
import HomepageComponent from "./pages/HomepageComponent.vue";
import SearchPage from "./pages/Searchpage.vue";
import RestaurantMenuPage from "./pages/RestaurantMenuPage.vue";
import PaymentComponent from "./pages/PaymentComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/", // Homepage
      name: "home",
      component: HomepageComponent,
    },
    {
      path: "/search", // Pagina di ricerca
      name: "search",
      component: SearchPage,
      props: (route) => ({ type: route.query.type }),
    },
    {
      path: "/menu/",
      name: "restaurantMenu",
      component: RestaurantMenuPage,
      // props: (route) => ({ id: localStorage.getItem("currentRestaurant") }),
      props: true,
    },
    {
      path: "/payment",
      name: "PaymentComponent",
      component: PaymentComponent,
    },
  ],
});

export { router };
