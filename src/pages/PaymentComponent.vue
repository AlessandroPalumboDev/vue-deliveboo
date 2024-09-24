<script>
import axios from "axios";
import { store } from "../store.js";
// import router from "../router.js";

export default {
  data() {
    return {
      cart: [],
      cart_total: 0,
      api: {
        baseUrl: "http://localhost:8000/api/",
        apipay: "braintree/checkout",
        api_save_order: "save-order",
      },
      name: "",
      surname: "",
      email_address: "",
      delivery_address: "",
      delivery_time: "",
      note: "",
      total_price: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      errorMessage: "",
      loading: false,
      showModal: false, // Variabile per mostrare la modale di pagamento riuscito
      transactionId: "", // Per salvare l'ID della transazione
    };
  },
  methods: {
    formatExpirationDate(event) {
      const input = event.target.value.replace(/\D/g, "");
      let formatted = "";
      if (input.length > 2) {
        formatted = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
      } else {
        formatted = input;
      }
      this.expirationDate = formatted;
    },
    validateExpiryDate(expiryDate) {
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!regex.test(expiryDate)) {
        return false;
      }
      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const expiryYear = parseInt(year, 10);

      if (
        expiryYear < currentYear ||
        (expiryYear === currentYear && month < currentMonth)
      ) {
        return false;
      }
      return true;
    },
    async submitPayment() {
      this.loading = true;
      this.errorMessage = "";

      if (
        !this.cardNumber ||
        !this.expirationDate ||
        !this.cvv ||
        !this.name ||
        !this.surname ||
        !this.email_address ||
        !this.delivery_address ||
        !this.delivery_time ||
        !this.total_price
      ) {
        this.errorMessage = "Tutti i campi sono obbligatori";
        this.loading = false;
        return;
      }

      if (!this.validateExpiryDate(this.expirationDate)) {
        this.errorMessage =
          "Data di scadenza non valida. Usa il formato MM/YY.";
        this.loading = false;
        return;
      }

      try {
        const plates = this.cart.map((item) => ({
          plate_id: item.id,
          quantity: item.quantity,
        }));

        const valore_id = localStorage.getItem("rest_ID");

        const orderData = {
          restaurant_id: valore_id,
          name: this.name,
          surname: this.surname,
          email_address: this.email_address,
          delivery_address: this.delivery_address,
          delivery_time: this.delivery_time,
          note: this.note,
          total_price: this.total_price,
          plates: plates,
        };

        const paymentResponse = await axios.post(
          this.api.baseUrl + this.api.apipay,
          {
            cardNumber: this.cardNumber,
            expirationDate: this.expirationDate,
            cvv: this.cvv,
            amount: this.total_price,
          }
        );

        if (paymentResponse.data.success) {
          this.transactionId = paymentResponse.data.transaction_id;

          // Mostra la modale al posto dell'alert
          this.showModal = true;

          const saveOrderResponse = await axios.post(
            this.api.baseUrl + this.api.api_save_order,
            orderData
          );

          if (!saveOrderResponse.data.success) {
            throw new Error(saveOrderResponse.data.message);
          }
          this.clearCart();
        } else {
          this.errorMessage =
            "Errore nel pagamento:" + paymentResponse.data.message;
        }
      } catch (error) {
        this.errorMessage = "Errore durante il pagamento. Riprovare.";
        console.error("Errore:", error);
      } finally {
        this.loading = false;
      }
    },
    redirectToHome() {
      this.showModal = false;
      this.$router
        .push({ name: "home" })
        .catch((error) => console.log("Errore nel routing:", error));
    },
    getCart() {
      const cart = JSON.parse(localStorage.getItem("cart"));
      this.cart = cart;
    },
    getTotal() {
      const price_t = localStorage.getItem("cart_total");
      this.cart_total = price_t;
      this.total_price = price_t;
    },
    clearCart() {
      store.clearCart();
    },
  },
  mounted() {
    this.getCart();
    this.getTotal();
  },
};
</script>

<template>
  <div class="payment-form">
    <form @submit.prevent="submitPayment" class="container-pay">
      <!-- Informazioni personali -->
      <div class="payment-data">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            type="text"
            v-model="name"
            id="name"
            placeholder="Inserisci il nome"
            required
          />
        </div>

        <div class="form-group">
          <label for="surname">Cognome</label>
          <input
            type="text"
            v-model="surname"
            id="surname"
            placeholder="Inserisci il cognome"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email_address"
            id="email"
            placeholder="Inserisci la tua email"
            required
          />
        </div>

        <div class="form-group">
          <label for="delivery_address">Indirizzo di consegna</label>
          <input
            type="text"
            v-model="delivery_address"
            id="delivery_address"
            placeholder="Inserisci l'indirizzo di consegna"
            required
          />
        </div>

        <div class="form-group">
          <label for="delivery_time">Orario di consegna</label>
          <input
            type="time"
            v-model="delivery_time"
            id="delivery_time"
            placeholder="Inserisci l' orario di consegna"
            required
          />
        </div>

        <div class="form-group" id="mg">
          <label for="note">Note</label>
          <textarea
            v-model="note"
            id="note"
            placeholder="Inserisci eventuali note"
          ></textarea>
        </div>

        <!-- Informazioni di pagamento -->
        <div class="form-group">
          <div class="cardsname">
            <label for="cardNumber">Numero di Carta</label>
            <img
              class="cards"
              src=".././assets/img/card/card.jpg"
              alt="carte"
            />
          </div>

          <input
            type="text"
            v-model="cardNumber"
            id="cardNumber"
            placeholder="Inserisci il numero della carta"
            maxlength="16"
            required
          />
        </div>

        <div class="form-group">
          <label for="expirationDate">Data di Scadenza (MM/YY)</label>
          <input
            type="text"
            v-model="expirationDate"
            id="expirationDate"
            placeholder="MM/YY"
            required
            @input="formatExpirationDate"
          />
        </div>

        <div class="form-group">
          <label for="cvv">CVV</label>
          <input
            type="text"
            v-model="cvv"
            id="cvv"
            placeholder="CVV"
            required
          />
        </div>
      </div>
      <div class="right-section">
        <div class="payment-button">
          <h2 id="recap">Riepilogo del tuo ordine:</h2>
          <div id="price-list">
            <div v-for="item in this.cart" class="prod">
              <h3 class="capitalize">{{ item.name }}</h3>
              <h3>x{{ item.quantity }}</h3>
            </div>
          </div>
          <h2 id="total">Totale: €{{ this.cart_total }}</h2>
          <img
            src=".././assets/img/header/logo3.png"
            alt="DeliveBoo Logo"
            class="logo"
          />
        </div>

        <div id="price">
          <button class="purchase" type="submit" :disabled="loading">
            {{ loading ? "Processando..." : "Acquista" }}
          </button>
          <button type="button" @click="goBack" class="back-btn">
            Torna indietro
          </button>
        </div>
      </div>
    </form>
    <!-- Modale di pagamento riuscito -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Pagamento completato con successo!</h2>
        <p>ID transazione: {{ transactionId }}</p>
        <button @click="redirectToHome">Torna alla Home</button>
      </div>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.payment-form {
  max-width: 800px;
  margin: 80px auto;
  padding: 30px;
  background-color: #f8f8f813;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
  font-family: "Roboto", sans-serif;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  #note {
    width: 100%;
    height: 50px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.3s ease;
    resize: none;
  }
}

.container-pay {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.payment-data {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .form-group {
    flex: 1;
    min-width: 350px;
  }
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #ffffff;
  font-size: 19px;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff6600;
    box-shadow: 0 0 8px rgba(255, 102, 0, 0.2);
  }
}

button {
  width: 100%;
  padding: 15px;
  background-color: #ff6600;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff4d00;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
}

.payment-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;

  #price-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #d2911a;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    .prod {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }
  }

  #price {
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;

    h2 {
      margin-bottom: 20px;
    }
  }
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 16px;
  text-align: center;
}

/* Animazioni e tocchi visivi */
input,
textarea {
  background-color: #fafafa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f0f0f0;
  }
}

textarea {
  &:focus {
    border-color: #00bfa5;
    box-shadow: 0 0 10px rgba(0, 191, 165, 0.15);
  }
}

.payment-form:hover {
  border-color: #f9f9f9;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

#recap {
  color: rgb(255, 255, 255);
  font-size: 40px;
}

#total {
  color: white;
  margin-bottom: 20px;
}

.cardsname {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cards {
  width: 100px;
  height: auto;
  margin-bottom: 8px;
}

.back-btn {
  display: block;
  margin-top: 20px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-size: 1.2em;
  border: 2px solid rgb(255, 255, 255);

  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-btn:hover {
  background-color: #626262;
  color: white;
}

.purchase {
  display: block;
  margin-top: 20px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-size: 1.2em;
  border: 2px solid rgb(255, 152, 8);

  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

// MODALE
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgb(243, 175, 27);
  color: #000000;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6600;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff4d00;
}
</style>
