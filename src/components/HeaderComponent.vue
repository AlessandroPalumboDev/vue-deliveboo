<script>
import { store } from "../store.js";
export default {
  name: "HeaderComponent",
  components: {},

  data() {
    return {
      store,
    };
  },

  methods: {},
};
</script>

<template>
  <header>
    <h1>Welcome to the Main Component</h1>
  </header>
</template>
