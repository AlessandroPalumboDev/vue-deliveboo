<script>
import { store } from "../../store.js";
export default {
  name: "HeaderComponent",
  data() {
    return {
      store,
      isHidden: true,       
      isCartVisible: false,   
      cartItems: [
        { name: "Pizza Margherita", price: 8.5 }, 
        { name: "Pasta al Pomodoro", price: 7.0 },
        { name: "Tiramisù", price: 5.0 },
      ], 
    };
  },
  methods: {
    modalAppearance() {
      this.isHidden = !this.isHidden; 
    },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible; 
    },
  },
};
</script>


<template>
  <header class="header">
    <nav class="navbar">

      <!-- LOGO -->
      <div class="navbar-left">
        <a href="#" class="nav-link">
        <img src="../../assets/img/header/logo3.png" alt="Logo" class="logo" />
        </a>
      </div>

     <!-- BOTTONI -->
      <div class="navbar-right">
        <a href="#" class="nav-link" @click="toggleCart"> <i class="fas fa-cart-plus"></i> </a>
        <button @click="modalAppearance" class="nav-link-register">
          <i class="fas fa-user-plus"></i> 
        </button>
      </div>
    </nav>

   <!-- MODAL -->
    <div v-if="!isHidden" class="modal">
      <div class="modal-content">
        <button @click="modalAppearance" class="btn-close">x</button>
        <div class="modal-header">
          <a href="#">
          <h2>Clicca qui se vuoi registrare il tuo ristorante.</h2>
          </a>
        </div>
      </div>
    </div>

    <!-- CARRELLO -->
    <div :class="['cart', isCartVisible ? 'cart-active' : '']">
      <h3>Il tuo carrello</h3>
      <ul class="cart-items">
        <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <span>{{ item.name }}</span>
          <span>{{ item.price.toFixed(2) }}€</span>
        </li>
      </ul>
      <div class="cart-footer">
        <button class="btn-register " @click="toggleCart">Chiudi</button>
      </div>
    </div>
  </header>
</template>

