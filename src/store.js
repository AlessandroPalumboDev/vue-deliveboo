import { reactive } from "vue";

export const store = reactive({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart(item) {
    const existingItem = this.cart.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.updateLocalStorage();
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

  updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },

  syncCartFromStorage() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },
});

// Ascolta gli eventi di aggiornamento del `localStorage` da altre schede
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    store.syncCartFromStorage();
  }
});
