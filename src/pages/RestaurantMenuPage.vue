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
      rest: {},
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
      const Restaurant = JSON.parse(localStorage.getItem('rest_show'));
      this.rest = Restaurant;
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
      <img :src="this.imageUrlDefault + this.rest.image_path" alt="Banner del ristorante" class="restaurant-banner" />
      <div class="restaurant-info">
        <h1 class="title">{{ this.rest.business_name }}</h1>
        <span v-for="rest in this.rest.types">
          <span class="type"> {{ rest.name + ' ' }}</span>
        </span>
        <div v-for="rest in this.rest.types">
          <span class="description"> {{ rest.description }}</span>
        </div>
        <!-- <p class="type">{{ this.rest.types }}</p> -->
      </div>
    </section>

    <div class="content">
      <div class="menu-items">
      
        <div v-for="item in this.restaurantMenu" :key="index" class="menu-item">
          <img :src="imageUrlDefault + item.cover_image" alt="Immagine del piatto" class="menu-item-image" />
          <div class="menu-item-details">
            <h4 class="title-food">{{ item.name }}</h4>
            <p class="description-food">{{ item.price }}</p>
            <span class="description-food">{{ item.ingredients }}</span>
          </div>
          <button @click="addToCart(item)" class="add-to-cart-btn">
            +
          </button>
        </div>

        <button class="back-btn" v-if="isMobile" @click="toggleCart">
          {{ isCartActive ? "Chiudi Carrello" : "Apri Carrello" }}
        </button>
      </div>

      <div class="cart" v-if="!isMobile">
        <h3>Il tuo ordine</h3>
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


.restaurant-menu-page {
  font-family: 'Arial', sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

}

.back-btn {
  margin: 20px;
  background-color: transparent;
  color: rgb(255, 166, 0);
  font-size: 1.2em;
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
  margin-bottom: 40px;
  transition: transform 0.3s ease;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.453),
      rgba(81, 8, 8, 0.094)
    ),
    rgba(84, 17, 17, 0);
    border-radius: 10px;
}

.restaurant-header:hover {
  transform: translateY(-5px); 
}

.restaurant-banner {
  width: 40%;
  max-width: 400px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, filter 0.3s ease;
 

}

.restaurant-banner:hover {
  transform: scale(1.02);
  filter: brightness(1.1);
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
  transition: color 0.3s ease, text-shadow 0.3s ease; 
}

.title-food {
 text-align: justify;
}

.title:hover {
  color: #ff4500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
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
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  padding: 15px;
  align-items: center; 
  
  
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
  border-radius: 12px;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.menu-item-image:hover {
  transform: scale(1.1); 
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
  font-size: 0.9em;
  color: #888;
  word-wrap: break-word; 
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
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; 
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
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
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
.cart-enter, .cart-leave-to {
  opacity: 0;
}

/* Media Queries */
@media (max-width: 768px) {
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


</style>
