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
    openModal() {
      classList.remove("hidden");
    },

    closeModal() {},
  },
};
</script>

<template>
  <header>
    <nav class="d-flex justify-around">
      <!-- Logo -->
      <div class="logo-container">
        <div class="logo">LOGO</div>
      </div>
      <!-- END Logo -->

      <!-- Restaurant registration -->
      <div class="registration">
        <p>
          Sei un ristoratore? <button @click="openModal">Clicca qui</button> per
          registrare il tuo ristorante
        </p>
        <div id="modal" class="hidden">
          <button @click="closeModal">Chiudi</button>
        </div>
      </div>

      <!-- END Restaurant registration -->

      <!-- Navbar list -->
      <div>
        <ul class="d-flex">
          <li>Home</li>
          <li>Carrello</li>
        </ul>
      </div>
      <!-- END navbar List -->

      <!-- <div class="nav-hamburger">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> -->
    </nav>
  </header>
</template>
