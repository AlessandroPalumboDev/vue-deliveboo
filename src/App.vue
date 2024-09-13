<script>
import { RouterView } from "vue-router";
import HeaderComponent from "./components/shared/HeaderComponent.vue";
import FooterComponent from "./components/shared/FooterComponent.vue";
export default {
  name: "DeliveBoo",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<template>
  <HeaderComponent />
  <router-view></router-view>
  <FooterComponent />
</template>
