<script>
import { store } from "../store.js";
import axios from "axios";
export default {
  data() {
    return {
      // restaurant: {
      //   name: "Burger King",
      //   description: "Fast food di alta qualità",
      //   type: "Fast Food",

      //   menuItems: [
      //     { name: "Whopper", description: "Il classico Whopper", price: 7.99 },
      //     {
      //       name: "Chicken Burger",
      //       description: "Pollo alla griglia",
      //       price: 6.49,
      //     },
      //     {
      //       name: "Coca-Cola",
      //       description: "Bevanda rinfrescante",
      //       price: 2.5,
      //     },
      //   ],

      // },
      restaurantMenu: [],
      rest: [],
      api: {
        baseUrl: "http://localhost:8000/api/",
        endPoints: {
          restaurant: "restaurants/",
          plate: '/plates'
        },
      },
      isCartActive: false,
      isMobile: false,
      imageUrlDefault: "http://localhost:8000/storage/",
    };
  },
  computed: {
    cart() {
      return store.cart;
    },
    cartTotal() {
      return this.cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  methods: {
    addToCart(item) {
      store.addToCart(item);
    },
    removeFromCart(item) {
      store.removeFromCart(item);
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    toggleCart() {
      this.isCartActive = !this.isCartActive;
    },
    getRest() {
      const restaurant = JSON.parse(localStorage.getItem('rest_show'));

      this.rest = restaurant;

    },
    getMenuRest() {
      // Componing the url to make the API call
      const valore_id = localStorage.getItem('rest_ID');

      const url = this.api.baseUrl + this.api.endPoints.restaurant + valore_id + this.api.endPoints.plate;

      // API call
      axios
        .get(url)
        .then((response) => {
          this.restaurantMenu = response.data.plates

        })
        .catch((error) => console.log(error));

    }
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
    // Sincronizza il carrello quando il componente è montato
    store.syncCartFromStorage();
    this.getMenuRest();
    this.getRest();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkIfMobile);
  },
};
</script>

<template>

  <div class="restaurant-menu-page">
    <button class="back-btn" @click="goBack">← Torna Indietro</button>

    <section class="restaurant-header">
      <img src="https://picsum.photos/600/400" alt="Banner del ristorante" class="restaurant-banner" />
      <div class="restaurant-info">
        <h1 class="title"></h1>
        <p class="description"></p>
        <p class="type"></p>
      </div>
    </section>

    <div class="content">
      <div class="menu-items">
        <h3 class="title">Menu</h3>
        <div v-for="item in this.restaurantMenu" :key="index" class="menu-item">
          <img :src="imageUrlDefault + item.cover_image" alt="Immagine del piatto" class="menu-item-image" />
          <div class="menu-item-details">
            <h4 class="title-food">{{ item.name }}</h4>
            <p class="description-food">{{ item.price }}</p>
            <span class="description-food">{{ item.ingredients }}</span>
          </div>
          <button @click="addToCart(item)" class="add-to-cart-btn">
            Aggiungi
          </button>
        </div>

        <button class="cart-toggle-btn" v-if="isMobile" @click="toggleCart">
          {{ isCartActive ? "Chiudi Carrello" : "Apri Carrello" }}
        </button>
      </div>

      <div class="cart" v-if="!isMobile">
        <h3>Il tuo carrello</h3>
        <ul v-if="cart.length > 0">
          <li v-for="(item, index) in cart" :key="index" class="cart-item">
            <div class="cart-item-details">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>€{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <button @click="removeFromCart(item)" class="remove-btn">
              Rimuovi
            </button>
          </li>
        </ul>
        <p v-if="cart.length === 0">Il carrello è vuoto.</p>
        <div class="cart-footer" v-if="cart.length > 0">
          <span>Totale: €{{ cartTotal }}</span>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS simile a quello originale */
</style>

<!-- CSS ANCORA DA SISTEMARE E SPOSTARE -->
<style scoped>
.restaurant-menu-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.back-btn {
  margin: 20px;
  background: linear-gradient(to bottom,
      rgb(255, 166, 0),
      rgba(255, 166, 1, 0.668)),
    rgba(255, 166, 0, 0.428);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #ff4500;
}

.restaurant-header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.restaurant-banner {
  width: 60%;
  max-width: 600px;
  border-radius: 8px;
  object-fit: cover;
}

.restaurant-info {
  width: 35%;
  padding-left: 20px;
  text-align: justify;
}

.title {
  font-size: 1.5em;
  margin: 0;
  color: rgb(255, 166, 0);
  text-align: justify;
}

.description {
  font-size: 1.1em;
  margin: 10px 0;
  color: #ffffff;
}

.title-food {
  font-size: 1.5em;
  margin: 0;
  color: rgb(255, 166, 0);
  text-align: justify;
}

.description-food {
  font-size: 1.1em;
  margin: 10px 0;
  color: #ffffff;
}

.type {
  font-size: 1.1em;
  font-weight: bold;
  color: #ff6600;
}

.content {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.menu-items {
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid orange;
}

.menu-item-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 8px;
}

.menu-item-details {
  flex-grow: 1;
}

.add-to-cart-btn {
  background: linear-gradient(to bottom,
      rgb(255, 166, 0),
      rgba(255, 166, 1, 0.668)),
    rgba(255, 166, 0, 0.428);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #ff4500;
}

.cart {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  margin-bottom: 100px;
  background: linear-gradient(to bottom,
      rgb(255, 166, 0),
      rgba(255, 166, 1, 0.109)),
    rgba(255, 166, 0, 0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.remove-btn {
  background-color: transparent;
  color: #ff4500;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.cart-footer {
  margin-top: 20px;
  text-align: right;
}

.cart-footer button {
  background-color: #ff6600;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.cart-footer button:hover {
  background-color: #ff4500;
}

.cart-toggle-btn {
  display: block;
  background-color: #ff6600;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 20px auto;
  text-align: center;
  z-index: 1000;
}

.mobile-cart {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  background-color: white;
  padding: 20px;
  z-index: 999;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: transform 0.3s ease;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.cart-close-btn {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.cart-close-btn:hover {
  background-color: #ff4500;
}
</style>
