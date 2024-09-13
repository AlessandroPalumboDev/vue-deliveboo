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

  methods: {
    openHamburger() {},
  },
};
</script>

<template>
  <header>
    <nav class="d-flex justify-between">
      <!-- Logo -->
      <div class="logo-container">
        <div class="logo">LOGO</div>
      </div>
      <!-- END Logo -->

      <!-- List -->
      <div>
        <ul class="d-flex">
          <li>Home</li>
          <li>About us</li>
          <li>Contact</li>
        </ul>
      </div>
      <!-- END List -->

      <!-- List -->
      <div>
        <ul class="d-flex">
          <li>Home</li>
          <li>About us</li>
          <li>Contact</li>
          <li>Carrello</li>
        </ul>
      </div>
      <!-- END List -->

      <!-- <div class="nav-hamburger">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> -->
    </nav>
  </header>
</template>
