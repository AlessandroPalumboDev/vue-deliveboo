<script>
import { store } from "../../store.js";
export default {
  name: "HeaderComponent",
  data() {
    return {
      isCartActive: false,
      isHidden: true,
    };
  },
  methods: {
    toggleCart() {
      this.isCartActive = !this.isCartActive;
    },
    modalAppearance() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>
<template>
  <header class="header">
    <nav class="navbar">
      <!-- LOGO -->
      <div class="navbar-left">
        <a class="nav-link">
          <router-link :to="{ name: 'home' }"></router-link>
          <img
            src="../../assets/img/header/logo3.png"
            alt="Logo"
            class="logo"
          />
        </a>
      </div>

      <!-- BOTTONI -->
      <div class="navbar-right">
        <a href="#" class="nav-link" @click="toggleCart">
          <img
            src="../../assets/img/small-card/cart.webp"
            alt="Logo"
            class="logo2"
          />
        </a>
        <button @click="modalAppearance" class="nav-link-register">
          <img
            src="../../assets/img/small-card/add.png"
            alt="Logo"
            class="logo3"
          />
        </button>
      </div>
    </nav>

    <!-- MODAL -->

    <div :class="['modal', isHidden ? '' : 'modal-active']" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <a href="http://127.0.0.1:8000/">
            <h3>Area Riservata</h3>
          </a>
        </div>
      </div>
    </div>

    <!-- CARRELLO -->
    <div :class="['cart', isCartActive ? 'cart-active' : '']">
      <h3>Il tuo Carrello</h3>
      <ul class="cart-items">
        <li class="cart-item">Prodotto 1</li>
        <li class="cart-item">Prodotto 2</li>
      </ul>
      <div class="cart-footer">
        <button @click="toggleCart" class="cart-close-btn">Chiudi</button>
      </div>
    </div>
  </header>
</template>
