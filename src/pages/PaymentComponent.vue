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
               
                <div id="price-list">
                    <div v-for="item in this.cart" class="prod">
                        <h3>{{ item.name }}</h3>
                        <h3>x{{ item.quantity }}</h3>
                    </div>
                </div>
                <div id="price">
                    <div>
                        <h2>totale: €{{ this.cart_total }}</h2>

                    </div>
                    <button type="submit" :disabled="loading">
                    {{ loading ? 'Processando...' : 'Acquista' }}
                </button>
                </div>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.payment-form {
    max-width: 600px;
    margin: 80px auto;
    padding: 30px;
    background: white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    transition: all 0.3s ease-in-out;
    font-family: 'Roboto', sans-serif;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    #note {
        width: 100%;
        height: 100px;
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
    gap: 20px;
}

.payment-data {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .form-group {
        flex: 1;
        min-width: 250px;
    }
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    color: #000000;
    font-size: 14px;
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
    color: white;
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
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

        .prod {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 500;
            color: #555;
        }
    }

    #price {
        font-size: 22px;
        font-weight: bold;
        color: #333;

        h2 {
            margin: 0;
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

button {
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.2);

    &:hover {
        box-shadow: 0 6px 20px rgba(255, 77, 0, 0.3);
    }
}

.payment-form:hover {
    border-color: #f9f9f9;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

</style>