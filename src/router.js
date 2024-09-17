import { createRouter, createWebHistory } from "vue-router";
import HomepageComponent from "./pages/HomepageComponent.vue";
import Searchpage from "./pages/Searchpage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomepageComponent,
    },
    {
      path: "/search",
      name: "search",
      component: Searchpage,
    }
  ],
});
export { router };
