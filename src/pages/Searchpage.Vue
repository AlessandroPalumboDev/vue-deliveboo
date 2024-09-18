<script>
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "Searchpage",

  data() {
    return {
      store,
      restaurants: [],
      rest_ID: null,
      error: false,
      api: {
        baseUrl: "http://localhost:8000/api/",
        endPoints: {
          restaurant: "restaurants?type=",
        },
      },
      imageUrlDefault: "http://localhost:8000/storage/",
    };
  },

  computed: {
    getImage() {
      return this.imageUrlDefault + this.restaurantTypes.image_path;
    },
  },

  methods: {
    getRestaurant() {
      // Componing the url to make the API call
      const valore = localStorage.getItem("searchrest");
      const url = this.api.baseUrl + this.api.endPoints.restaurant + valore;
      // API call
      axios
        .get(url)
        .then((response) => {
          this.restaurants = response.data.results.data;
          console.log(this.restaurants)

        })
        .catch((error) => console.log(error));
      console.log(this.restaurants.image_path);
    },
    goBack() {
      this.$router.push({
        name: 'home',
      }).catch((error) => {
        console.log("Errore nel routing:", error);  // Eventuali errori nel routing
      });
    },
    getMenu(restID) {

      this.rest_ID = restID,
        localStorage.setItem('rest_ID', restID);

      this.$router.push({
        name: 'restaurantMenu',
      }).catch((error) => {
        console.log("Errore nel routing:", error);  // Eventuali errori nel routing
      });

    }

  },

  mounted() {
    this.getRestaurant();
  },
};
</script>

<template>
  <main>
    <button class="back-btn" @click="goBack()">← Torna Indietro</button>
    <!-- Restaurant types -->
    <div class="card-restaurant">
      <!-- Single card -->
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="card-sd " @click="getMenu(restaurant.id)">

        <img :src="this.imageUrlDefault + restaurant.image_path" :alt="restaurant.name" />
        <div class="sd-card-name">
          <h2>{{ restaurant.business_name }}</h2>
        </div>
        <div class="card-text-sd">
          <div><span>indirizzo: </span><span>{{ restaurant.address }}</span></div>
          <div class="block-sd"><span>tipologia: </span><span v-for="restaurant in restaurant.types">{{
            restaurant.name + ', '
          }}</span></div>



        </div>

      </div>
      <!-- END Single card -->
    </div>
  </main>
</template>
