<script>
import { store } from "../../store.js";

export default {
  data() {
    return {
      isCartActive: false,
      isHidden: true,
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
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  methods: {
    // Capitalizing the first letter of a string
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    toggleCart() {
      this.isCartActive = !this.isCartActive;
    },

    modalAppearance() {
      this.isHidden = !this.isHidden;
    },

    removeFromCart(item) {
      store.removeFromCart(item);
    },

    removeAllFromCart(item) {
      store.removeAllFromCart(item); // Rimozione completa di un articolo
    },

    incrementQuantity(item) {
      store.incrementQuantity(item);
    },
    cartTo(price) {
      this.cart_total = price;
      localStorage.setItem("cart_total", price);
      this.$router
        .push({
          name: "PaymentComponent",
        })
        .catch((error) => {
          console.log("Errore nel routing:", error); // Eventuali errori nel routing
        });
    },
  },
  mounted() {
    store.syncCartFromStorage();
  },
};
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <!-- Logo -->
      <div class="navbar-left">
        <div class="img-container">
          <router-link :to="{ name: 'home' }" class="nav-link">
            <img
              src="../../assets/img/header/logo3.png"
              alt="DeliveBoo Logo"
              class="logo"
            />
          </router-link>
        </div>
      </div>

      <!-- Bottoni -->
      <div class="navbar-right">
        <a href="#" class="nav-link" @click="toggleCart">
          <img
            src="../../assets/img/small-card/cart.webp"
            alt="Logo"
            class="logo2"
          />
          <!-- Mostra il numero di elementi nel carrello -->
          <span v-if="cartItemCount > 0" class="cart-count">{{
            cartItemCount
          }}</span>
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

    <!-- Modal -->
    <div class="modal-container">
      <div :class="['modal', isHidden ? '' : 'modal-active']" ref="modal">
        <div class="modal-header">
          <a href="http://localhost:8000/">
            <h3>Area Riservata</h3>
          </a>
        </div>
      </div>
    </div>

    <!-- Carrello -->
    <div :class="['cart', isCartActive ? 'cart-active' : '']">
      <h3>Il tuo Carrello</h3>
      <ul class="cart-items">
        <li v-for="(item, index) in cart" :key="index" class="cart-item">
          <div class="cart-item-details">
            <!-- Nome prodotto e quantità -->
            <span>{{ item.quantity }}x {{ item.name }}</span>

            <!-- Prezzo moltiplicato per la quantità -->
            <div>
              <span>€{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="btn-container">
            <!-- Bottone per diminuire la quantità di un singolo elemento -->
            <button
              class="minus-btn"
              @click="removeFromCart(item), checkCart()"
            >
              &minus;
            </button>

            <!-- Bottone per aumentare la quantità di un singolo elemento -->
            <button class="plus-btn" @click="incrementQuantity(item)">
              &plus;
            </button>

            <!-- Bottone per rimuovere tutte le quantità di quell'elemento -->
            <button
              class="remove-btn"
              @click="removeAllFromCart(item), checkCart()"
            >
              x
            </button>
          </div>
        </li>
      </ul>

      <div class="cart-footer">
        <!-- Totale del carrello -->
        <p v-if="cart.length > 0">Totale: €{{ cartTotal }}</p>
        <div class="buttons-container d-flex justify-between">
          <div class="check-out-container">
            <button
              v-if="cart.length > 0"
              @click="cartTo(cartTotal), toggleCart()"
            >
              Checkout
            </button>
          </div>
          <div class="close-container">
            <button @click="toggleCart" class="cart-close-btn">Chiudi</button>
          </div>
        </div>
      </div>

      <p v-if="cart.length === 0">Il carrello è vuoto.</p>
    </div>
  </header>
</template>

<style scoped>
.cart {
  background-color: #e2dede;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 3px 8px;
  font-size: 12px;
  position: absolute;
  top: 5px;
  right: 15px;
}

.cart-active {
  display: block;
}

.cart-items {
  max-height: 300px;
  list-style: none;
  padding: 10px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.cart-footer {
  padding: 10px;
  border-top: 1px solid #b1b1b1;
}

.buttons-container {
  padding-top: 20px;

  button {
    width: 70%;
    font-size: 14px;
  }

  .check-out-container {
    width: 50%;
    transition: background-color 0.3s ease;

    & button:hover {
      background-color: #ff9100;
    }
  }
}

.close-container {
  width: 50%;
}

.cart-count {
  background-color: rgb(255, 0, 0);
  color: white;
  border-radius: 50%;
  padding: 3px 8px;
  font-size: 12px;
  position: absolute;
  top: 5px;
  right: 15px;
}

.modal-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -30px;
}
</style>
