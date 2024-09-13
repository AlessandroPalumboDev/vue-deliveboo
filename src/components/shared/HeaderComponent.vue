<script>
import { store } from "../../store.js";
export default {
  name: "HeaderComponent",
  components: {},

  data() {
    return {
      store,
      isHidden: true,
    };
  },

  methods: {
    modalAppearance() {
      this.isHidden = !this.isHidden;
    },

    modalAppearance() {
      this.isHidden = !this.isHidden;
    },
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
          Sei un ristoratore?
          <button @click="modalAppearance">Clicca qui</button> per registrare il
          tuo ristorante
        </p>
        <div id="modal" :class="{ hidden: isHidden }">
          <button @click="modalAppearance">Chiudi</button>
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
