import { createApp } from "vue";
import { router } from "./router";

// Import style
import "./assets/scss/style.scss";

// Import Vue root component
import App from "./App.vue";

createApp(App).use(router).mount("#app");
