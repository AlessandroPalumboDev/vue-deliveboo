<script>
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "HomepageComponent",

  data() {
    return {
      currentIndex: 0,
      store,
      restaurantTypes: [],
      tempRestaurantTypes: [],
      loadingcount: 0,
      isLoading: true,
      searchrest: "",
      error: false,
      api: {
        baseUrl: "http://localhost:8000/api/",
        endPoints: {
          restaurantsList: "types",
        },
      },
      imageUrlDefault: "http://localhost:8000/storage/",
    };
  },

  // computed: {
  //   getImage() {
  //     return this.imageUrlDefault + this.restaurantTypes.image_path;
  //   },
  // },

  methods: {
    getRestaurantTypes() {
      // Componing the url to make the API call
      const url = this.api.baseUrl + this.api.endPoints.restaurantsList;


      axios
        .get(url)
        .then((response) => {

          this.tempRestaurantTypes = response.data.types;
          this.restaurantTypes = [...this.tempRestaurantTypes];
          this.isLoading = false;
        })
        .catch((error) => console.log(error));
      this.isLoading = false;
    },

    loading() {
      this.isLoading = true;
    },
    goToSearchPage(typeName) {
      (this.searchrest = typeName),
        localStorage.setItem("searchrest", typeName);
      this.$router
        .push({
          name: "search",
        })
        .catch((error) => {
          console.log("Errore nel routing:", error); // Eventuali errori nel routing
        });
    },

    nextSlide() {
      if (this.currentIndex < this.restaurantTypes.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },

    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.restaurantTypes.length - 1;
      }
    },
  },
  mounted() {
    this.getRestaurantTypes();
    this.loading();

  },

};
</script>

<template>
  <main>
    <section>
      <div class="container">
        <div class="row">
          <!-- Jumbo section -->
          <div class="jumbo">
            <div class="d-flex justify-center title-box">
              <h1>Hai fame? Cerca il piatto che vuoi nella tua città</h1>
            </div>
            <div class="d-flex justify-center">
              <h2 class="delivery">
                I piatti dalle migliori cucine del mondo. Ovunque, anche a
                domicilio
              </h2>
            </div>

            <!-- Restaurant types -->
            <div class="card-container">
              <!-- loading dot -->
              <div v-if="isLoading" class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <!-- Carousel wrapper -->
              <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <!-- Single card -->

                <div v-for="type in restaurantTypes" :key="type.id" class="card" if>
                  <div class="card-box">
                    <div class="card-body" @click="goToSearchPage(type.name)">
                      <img :src="imageUrlDefault + type.image_path" alt="" />
                      <p>{{ type.name }}</p>
                    </div>
                  </div>
                </div>

                <!-- END Single card -->
              </div>

              <button @click="prevSlide" class="prev"><span>&lt;</span></button>
              <button @click="nextSlide" class="next">&gt;</button>
              <!-- Carousel wrapper -->
            </div>
            <!-- END restaurant types -->

            <!-- Images in column -->
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
                  <img src="../assets/img/small-card/shopping-cart.svg" alt="" />
                  <h4>Metti ciò che desideri nel carrello</h4>
                  <p>Puoi scegliere quale carta di credito usare</p>
                </div>
                <div class="small-card">
                  <img src="../assets/img/small-card/dish-cap.svg" alt="" />
                  <h4>Consegniamo a domicilio</h4>
                  <p>Aspetta l'ordine in tutta tranquillità a casa</p>
                </div>
              </div>
            </div>
            <!-- END images in column -->
          </div>
          <!-- END jumbo section -->
        </div>
      </div>
    </section>
  </main>
</template>
