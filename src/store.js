import { reactive } from "vue";

export const store = reactive({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  currentRestaurant: localStorage.getItem("currentRestaurant") || null, // Memorizza l'ID del ristorante corrente

  addToCart(item, restaurantId) {
    this.checkCart();
    if (this.currentRestaurant && this.currentRestaurant !== restaurantId) {
      // Se il ristorante corrente è diverso da quello del carrello, mostra avviso
      return false;
    }
    this.currentRestaurant = restaurantId;
    localStorage.setItem("currentRestaurant", restaurantId);

    const existingItem = this.cart.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.updateLocalStorage();
    return true;
  },

  removeFromCart(item) {
    const existingItem = this.cart.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      this.cart = this.cart.filter((cartItem) => cartItem.name !== item.name);
    }

    this.updateLocalStorage();
  },

  // Incrementa la quantità di un singolo elemento
  incrementQuantity(item) {
    const existingItem = this.cart.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem && existingItem.quantity >= 1) {
      existingItem.quantity++;
    } else {
      this.cart = this.cart.filter((cartItem) => cartItem.name !== item.name);
    }
    console.log(item.quantity);

    this.updateLocalStorage();
  },

  checkCart() {
    if (this.cart.length < 1) {
      this.currentRestaurant = null;
      console.log(this.currentRestaurant);
    }
  },

  removeAllFromCart(item) {
    this.cart = this.cart.filter((cartItem) => cartItem.name !== item.name);
    this.updateLocalStorage();
  },

  // Svuota il carrello
  clearCart() {
    this.cart = [];
    this.currentRestaurant = null;
    localStorage.removeItem("cart");
    localStorage.removeItem("currentRestaurant");
  },
  // clearCheckout() {
  //   this.cart = [];
  //   localStorage.removeItem("cart");
  //   localStorage.removeItem("currentRestaurant");
  // },

  updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    localStorage.setItem("currentRestaurant", this.currentRestaurant);
  },

  syncCartFromStorage() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.currentRestaurant = localStorage.getItem("currentRestaurant") || null;
  },

  checkCartConsistency(restaurantId) {
    // Verifica se il carrello ha articoli da un ristorante diverso
    if (this.currentRestaurant && this.currentRestaurant !== restaurantId) {
      this.clearCart(); // Svuota il carrello se il ristorante è cambiato
      this.currentRestaurant = restaurantId;
      localStorage.setItem("currentRestaurant", restaurantId);
    }
  },
});

window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    store.syncCartFromStorage();
  }
});
