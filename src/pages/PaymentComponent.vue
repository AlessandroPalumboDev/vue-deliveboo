<script>
import dropin from "braintree-web-drop-in";
import axios from "axios";

export default {
    data() {
        return {
            dropinInstance: null,
            loading: false,
            api: {
                baseUrl: "http://localhost:8000/api/",
                apipay: 'braintree/checkout'
            },
            name: '',
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
            if (!this.cardNumber || !this.expirationDate || !this.cvv) {
                this.errorMessage = 'Tutti i campi sono obbligatori';
                this.loading = false;
                return;
            }

            const url = this.api.baseUrl + this.api.apipay;
            // Invio dei dati al backend Laravel
            axios
                .post(url, {
                    name: this.name,
                    cardNumber: this.cardNumber,
                    expirationDate: this.expirationDate,
                    cvv: this.cvv,
                    amount: 10, // L'importo da addebitare
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
    },
};
</script>
<template>
    <div class="payment-form">
        <form @submit.prevent="submitPayment">
            <div class="form-group">
                <label for="name">nome</label>
                <input type="text" v-model="name" id="name" placeholder="Inserisci il tuo nome" required />
            </div>

            <div class="form-group">
                <label for="cardNumber">Numero di Carta</label>
                <input type="text" v-model="cardNumber" id="cardNumber" placeholder="Inserisci il numero della carta"
                    maxlength="16" required />
            </div>

            <div class="form-group">
                <label for="expirationDate">Data di Scadenza (MM/YY)</label>
                <input type="text" v-model="expirationDate" id="expirationDate" placeholder="MM/YY" required />
            </div>

            <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" v-model="cvv" id="cvv" placeholder="CVV" required />
            </div>

            <button type="submit" :disabled="loading">
                {{ loading ? 'Processando...' : 'Paga' }}
            </button>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>
<style scoped>
.payment-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
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
    width: 100%;
    padding: 12px;
    background-color: #28a745;
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