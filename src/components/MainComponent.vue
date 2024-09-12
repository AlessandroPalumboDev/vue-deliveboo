<script>
import { store } from "../store.js";
import HeaderComponent from "./HeaderComponent.vue";
import FooterComponent from "./FooterComponent.vue";
export default {
  name: "MainComponent",
  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      store,
    };
  },

  methods: {},
};
</script>

<template>
  <main>
    <HeaderComponent />

    <section>
      <p>This is a sample section added to your component.</p>
      <button>Click Me</button>
    </section>

    <FooterComponent />
  </main>
</template>
