<script>
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "HomepageComponent",

  data() {
    return {
      store,
      response: {},
      error: false,
      api: {
        baseUrl: "http://localhost:5173/api/",
        endPoints: {
          restaurantsList: "restaurants",
        },
      },
    };
  },

  methods: {
    getRestaurants() {
      const url = this.api.baseUrl + this.api.endPoints.restaurantsList;
      console.log(url);

      axios
        .get(url)
        .then((response) => {
          this.response = response.data;
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<template>
  <main>
    <section>
      <div class="container">
        <div class="row">
          <!-- Search bar section -->
          <div class="jumbo">
            <div class="d-flex justify-center title-box">
              <h1>Hai fame? Cerca il piatto che vuoi nella tua città</h1>
            </div>
            <div class="d-flex justify-center">
              <h2>
                I piatti dalle migliori cucine del mondo ovunque, anche a
                domicilio
              </h2>
            </div>
            <div class="search-bar">
              <form action="" class="d-flex">
                <input
                  type="text"
                  placeholder="Cosa vorresti mangiare?"
                  class="font-family"
                />
                <button
                  type="submit"
                  @click="getRestaurants"
                  class="go-button font-family"
                >
                  Vai!
                </button>
              </form>
            </div>
            <div class="image-big">
              <div class="text">
                <h3>Come ordinare?</h3>
              </div>
              <div class="text">
                <h2>E' semplicissimo!</h2>
              </div>
              <div class="small-cards-container">
                <div class="small-card">
                  <img src="../assets/img/small-card/burger.svg" alt="" />
                  <h4>Scegli cosa vorresti mangiare</h4>
                  <p>Vedrai in quali ristoranti lo puoi trovare</p>
                </div>
                <div class="small-card">
                  <img
                    src="../assets/img/small-card/shopping-cart.svg"
                    alt=""
                  />
                  <h4>Metti ciò che desideri nel carrello</h4>
                  <p>Puoi scegliere tra diversi metodi di pagamento</p>
                </div>
                <div class="small-card">
                  <img src="../assets/img/small-card/dish-cap.svg" alt="" />
                  <h4>Consegna a domicilio o ritiro al locale</h4>
                  <p>Aspetta l'ordine in tutta tranquillità a casa</p>
                </div>
              </div>
            </div>
          </div>
          <!-- END Search bar section -->

          <!-- Big image section -->

          <!-- END Big image section -->
        </div>
      </div>
    </section>
  </main>
</template>
