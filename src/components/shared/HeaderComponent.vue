<script>
import { store } from "../../store.js";
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
          <li>
            Sei un ristoratore? Clicca qui per registrare il tuo ristorante
          </li>
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
