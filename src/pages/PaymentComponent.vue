<script>
import dropin from "braintree-web-drop-in";
import axios from "axios";

export default {
    data() {
        return {
            dropinInstance: null,
            loading: false,
            cart: [],
            cart_total: 0,
            api: {
                baseUrl: "http://localhost:8000/api/",
                apipay: 'braintree/checkout'
            },
            name: '',
            surname: '',
            email_address: '',
            delivery_address: '',
            note: '',
            total_price: '',
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            errorMessage: '',
        };
    },

    methods: {
        submitPayment() {
            this.loading = true;
            this.errorMessage = '';

            // Validazione basica dei campi
            if (!this.cardNumber || !this.expirationDate || !this.cvv || !this.name || !this.surname || !this.email_address || !this.delivery_address || !this.total_price) {
                this.errorMessage = 'Tutti i campi sono obbligatori';
                this.loading = false;
                return;
            }

            const url = this.api.baseUrl + this.api.apipay;

            // Invio dei dati al backend Laravel
            axios
                .post(url, {
                    name: this.name,
                    surname: this.surname,
                    email_address: this.email_address,
                    delivery_address: this.delivery_address,
                    note: this.note,
                    total_price: this.total_price,
                    cardNumber: this.cardNumber,
                    expirationDate: this.expirationDate,
                    cvv: this.cvv,
                    amount: this.total_price, // L'importo da addebitare basato sul prezzo totale
                })
                .then((response) => {
                    console.log(response)
                    if (response.data.success) {
                        alert(
                            'Pagamento completato con successo! ID transazione: ' +
                            response.data.transaction_id
                        );
                    } else {
                        this.errorMessage = 'Errore nel pagamento: ' + response.data.message;
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.errorMessage = 'Errore durante il pagamento. Riprovare.';
                    console.error('Errore:', error);
                    this.loading = false;
                });
        },
        getCart() {
            const cart = JSON.parse(localStorage.getItem("cart"));
            this.cart = cart;
            console.log(this.cart);
        },
        getTotal() {
            const price_t = localStorage.getItem('cart_total');
            this.cart_total = price_t;

        },
    },
    mounted() {
        this.getCart();
        this.getTotal();
    }
};
</script>
<template>
    <div class="payment-form">
        <form @submit.prevent="submitPayment" class="container-pay">
            <!-- Informazioni personali -->
            <div class="payment-data">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" v-model="name" id="name" placeholder="Inserisci il nome" required />
                </div>

                <div class="form-group">
                    <label for="surname">Cognome</label>
                    <input type="text" v-model="surname" id="surname" placeholder="Inserisci il cognome" required />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="email_address" id="email" placeholder="Inserisci la tua email"
                        required />
                </div>

                <div class="form-group">
                    <label for="delivery_address">Indirizzo di consegna</label>
                    <input type="text" v-model="delivery_address" id="delivery_address"
                        placeholder="Inserisci l'indirizzo di consegna" required />
                </div>

                <div class="form-group" id="mg">
                    <label for="note">Note</label>
                    <textarea v-model="note" id="note" placeholder="Inserisci eventuali note"></textarea>
                </div>


                <!-- Informazioni di pagamento -->
                <div class="form-group">
                    <label for="cardNumber">Numero di Carta</label>
                    <input type="text" v-model="cardNumber" id="cardNumber"
                        placeholder="Inserisci il numero della carta" maxlength="16" required />
                </div>

                <div class="form-group">
                    <label for="expirationDate">Data di Scadenza (MM/YY)</label>
                    <input type="text" v-model="expirationDate" id="expirationDate" placeholder="MM/YY" required />
                </div>

                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" v-model="cvv" id="cvv" placeholder="CVV" required />
                </div>
            </div>
            <div class="payment-button">
                <button type="submit" :disabled="loading">
                    {{ loading ? 'Processando...' : 'Acquista' }}
                </button>
                <div id="price-list">
                    <div v-for="item in this.cart" class="prod">
                        <h3>{{ item.name }}</h3>
                        <h3>{{ item.quantity }}</h3>
                    </div>
                </div>
                <div id="price">
                    <div>
                        <h2>totale: €{{ this.cart_total }}</h2>

                    </div>
                </div>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.payment-form {

    margin: 100px auto;
    padding: 20px;
    background-color: #f8f8f813;
    box-shadow: 0rem 0.5rem 1rem 0rem rgba(0, 0, 0, 0.878);
    border-radius: 8px;

    #note {
        width: 100%;
        height: 70px;
    }
}

.form-group {
    margin-bottom: 16px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 70%;
    padding: 12px;
    margin-bottom: 20px;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error-message {
    color: red;
    font-weight: bold;
    margin-top: 16px;
}
</style>