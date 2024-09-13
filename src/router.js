import { createRouter, createWebHistory } from "vue-router";
import HomepageComponent from "./pages/HomepageComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomepageComponent,
    },
  ],
});
export { router };
