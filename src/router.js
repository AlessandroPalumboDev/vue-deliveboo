import { createRouter, createWebHistory } from "vue-router";
import HomepageComponent from "./pages/HomepageComponent.vue";
import RestaurantMenuPage from "./pages/RestaurantMenuPage.vue"; 


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomepageComponent,
    },
    {
      path: "/menu/",  
      name: "restaurantMenu",
      component: RestaurantMenuPage,
      props: true,  
    },
  ],
});
export { router };
