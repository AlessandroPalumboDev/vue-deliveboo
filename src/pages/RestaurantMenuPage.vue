<script>
import { store } from "../store.js";
import axios from "axios";

export default {
  data() {
    return {
      restaurantMenu: [],
      currentRestaurantId: null,
      showCartWarning: false,
      pendingItem: null,
      rest: [],
      api: {
        baseUrl: "http://localhost:8000/api/",
        endPoints: {
          restaurant: "restaurants/",
          plate: "/plates",
        },
      },
      isCartActive: false,
      isMobile: false,
      imageUrlDefault: "http://localhost:8000/storage/",
      restaurantName: "", // Nome del ristorante
      restaurantDescription: "", // Descrizione del ristorante
      restaurantType: "", // Tipo di ristorante
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
      const restaurantId = this.currentRestaurantId;

      const result = store.addToCart(item, restaurantId);
      // MODIFICA CONDIZIONE PER LA VISUALIZZAZIONE
      if (!result) {
        this.showCartWarning = true;
        this.pendingItem = item;
      }
    },
    removeFromCart(item) {
      store.removeFromCart(item);
    },
    removeAllFromCart(item) {
      store.removeAllFromCart(item);
    },
    incrementQuantity(item) {
      store.incrementQuantity(item);
    },
    checkCart() {
      store.checkCart();
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    toggleCart() {
      this.isCartActive = !this.isCartActive;
    },
    getRest() {
      const restaurant = JSON.parse(localStorage.getItem("rest_show"));
      this.rest = restaurant;
    },
    getMenuRest() {
      const valore_id = localStorage.getItem("rest_ID");
      this.currentRestaurantId = valore_id;

      const url =
        this.api.baseUrl +
        this.api.endPoints.restaurant +
        valore_id +
        this.api.endPoints.plate;

      axios
        .get(url)
        .then((response) => {
          this.restaurantMenu = response.data.plates;
          this.restaurantName = response.data.restaurant.name;
          this.restaurantDescription = response.data.restaurant.description;
          this.restaurantType = response.data.restaurant.type;
        })
        .catch((error) => console.log(error));
    },

    confirmClearCart() {
      store.clearCart(); // Svuota il carrello nel tuo store
      this.$nextTick(() => {
        // Aggiorna la UI dopo che il carrello è stato svuotato
        store.addToCart(this.pendingItem, this.currentRestaurantId);
        this.showCartWarning = false;
        this.pendingItem = null;
      });
    },
    cancelClearCart() {
      this.showCartWarning = false;
      this.pendingItem = null;
    },
    watch: {
      cart(newCart) {
        // Ricarica l'interfaccia utente se necessario
        this.$forceUpdate();
      },
    },

    goBack() {
      this.$router.back();
    },
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
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
    <!-- Avviso di cambio ristorante -->
    <div v-if="showCartWarning" class="cart-warning-modal">
      <p>
        Hai già elementi nel carrello di un altro ristorante. Vuoi svuotare il
        carrello?
      </p>
      <button @click="confirmClearCart">Sì, svuota il carrello</button>
      <button @click="cancelClearCart">No, mantieni il carrello</button>
    </div>

    <button class="back-btn" @click="goBack">← Torna Indietro</button>

    <section class="restaurant-header">
      <img
        :src="this.imageUrlDefault + this.rest.image_path"
        alt="Banner del ristorante"
        class="restaurant-banner"
      />
      <div class="restaurant-info">
        <h1 class="title">{{ this.rest.business_name }}</h1>
      </div>
    </section>
    <div class="content">
      <div class="menu-items">
        <div v-for="item in this.restaurantMenu" :key="index" class="menu-item">
          <img
            :src="imageUrlDefault + item.cover_image"
            alt="Immagine del piatto"
            class="menu-item-image"
          />
          <div class="menu-item-details">
            <h4 class="title-food">{{ item.name }}</h4>
            <p class="description-food">{{ item.ingredients }}</p>
            <span class="description-food">€{{ item.price }}</span>
          </div>
          <button @click="addToCart(item)" class="add-to-cart-btn">+</button>
        </div>

        <button class="back-btn open-cart" v-if="isMobile" @click="toggleCart">
          {{ isCartActive ? "Chiudi Carrello" : "Apri Carrello" }}
        </button>
      </div>

      <div class="cart" v-if="!isMobile">
        <h3>Il tuo ordine</h3>
        <ul v-if="cart.length > 0">
          <li v-for="(item, index) in cart" :key="index" class="cart-item">
            <div class="cart-item-details">
              <span>{{ item.quantity }}x {{ item.name }} </span>
              <span> €{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>

            <!-- Bottone per diminuire la quantità di un singolo elemento -->
            <button @click="removeFromCart(item), checkCart()">-</button>

            <!-- Bottone per aumentare la quantità di un singolo elemento -->
            <button @click="incrementQuantity(item)">+</button>

            <!-- Bottone per rimuovere tutte le quantità di quell'elemento -->
            <button @click="removeAllFromCart(item), checkCart()">x</button>
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

<style lang="scss" scoped>
.restaurant-menu-page {
  font-family: "Arial", sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  top: -60px;
}

.back-btn {
  width: 20%;
  margin-bottom: 60px;
  background-color: transparent;
  color: rgb(255, 166, 0);
  font-size: 12px;
  font-weight: bold;
  border: 2px solid rgb(255, 166, 0);
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-btn:hover {
  background-color: #ff6600;
  color: white;
}

.restaurant-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  margin-bottom: 40px;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.453),
      rgba(81, 8, 8, 0.094)
    ),
    rgba(84, 17, 17, 0);
  border-radius: 10px;
}

.restaurant-banner {
  width: 40%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.restaurant-info {
  margin-left: 20px;
  text-align: left;
  flex: 1;
}

.title {
  font-size: 2em;
  font-weight: bold;
  color: rgb(255, 166, 0);
  margin: 10px 0;
  text-align: justify;
  text-transform: capitalize;
}

.title-food {
  text-align: justify;
}

.description {
  font-size: 1.2em;
  color: #ffffff;
  margin-bottom: 5px;
}

.type {
  font-size: 1em;
  color: #ff6600;
  font-weight: bold;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: 0 auto;
  padding-bottom: 60px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 2;
}

.menu-item {
  display: flex;
  flex-direction: row;
  background-color: #ffffffc9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  padding: 15px;
  align-items: center;
  text-transform: capitalize;
}

.menu-item:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
}

.menu-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 15px;
}

.menu-item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.title-food {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.description-food {
  padding-right: 15px;
  font-size: 0.9em;
  color: #888;
  word-wrap: break-word;
}

p.description-food {
  font-weight: bold;
}

span.description-food {
  padding-top: 10px;
  text-align: center;
  font-weight: bold;
  color: black;
}

.open-cart {
  margin-top: 20px;
  margin-bottom: -80px;
}

.add-to-cart-btn {
  width: 40px;
  height: 40px;
  background: rgb(255, 166, 0);
  color: white;
  font-size: 1.5em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart-btn:hover {
  background-color: #ff4500;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cart {
  flex: 1;
  background: linear-gradient(
      to bottom,
      rgb(255, 166, 0),
      rgba(255, 166, 1, 0.425)
    ),
    rgba(255, 166, 0, 0%);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.cart h3 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.cart-item-details {
  font-size: 1.1em;
}

.remove-btn {
  background-color: transparent;
  color: #ff6600;
  border: none;
  cursor: pointer;
  font-size: 1em;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: #ff4500;
}

.cart-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-footer span {
  font-size: 1.4em;
  font-weight: bold;
}

.cart-footer button {
  background-color: #ff6600;
  color: white;
  padding: 10px 20px;
  font-size: 1.2em;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
}

.cart-footer button:hover {
  background-color: #ff4500;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Mobile */
.cart-toggle-btn {
  background-color: #ff6600;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 50px;
  font-size: 1.2em;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cart-toggle-btn:hover {
  background-color: #ff4500;
  transform: scale(1.05);
}

.cart-enter-active,
.cart-leave-active {
  transition: opacity 0.5s ease;
}

.cart-enter,
.cart-leave-to {
  opacity: 0;
}

/* Media Queries */
@media (max-width: 780px) {
  .back-btn {
    width: 41%;
  }

  .open-cart {
    width: 100%;
  }

  .restaurant-header {
    flex-direction: column;
    align-items: center;
  }

  .menu-items {
    grid-template-columns: 1fr;
  }

  .cart {
    display: none;
  }

  .cart-toggle-btn {
    display: block;
  }
}

.cart-warning-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 166, 0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.cart-warning-modal button {
  background-color: #ff6600;
  color: white;
  border: none;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
}
.cart-warning-modal button:hover {
  background-color: #ff4500;
}
</style>
