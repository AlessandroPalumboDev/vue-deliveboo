<script>
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "Searchpage",

  data() {
    return {
      store,
      restaurants: [],
      rest_show: [],
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
          console.log(this.restaurants);
        })
        .catch((error) => console.log(error));
      console.log(this.restaurants.image_path);
    },
    goBack() {
      this.$router
        .push({
          name: "home",
        })
        .catch((error) => {
          console.log("Errore nel routing:", error); // Eventuali errori nel routing
        });
    },
    getMenu(rest) {
      // id
      let restID = rest.id;

      this.rest_ID = restID;
      localStorage.setItem("rest_ID", restID);

      // obj

      this.rest_show = rest;
      localStorage.setItem("rest_show", JSON.stringify(rest));

      this.$router
        .push({
          name: "restaurantMenu",
        })
        .catch((error) => {
          console.log("Errore nel routing:", error); // Eventuali errori nel routing
        });
    },
  },

  mounted() {
    this.getRestaurant();
  },
};
</script>

<template>
  <main>
    <!-- Restaurant types -->
    <button class="back-btn" @click="goBack()">← Torna Indietro</button>
    <div class="card-restaurant">
      <!-- Single card -->
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="card-sd"
        @click="getMenu(restaurant)"
      >
        <img
          :src="this.imageUrlDefault + restaurant.image_path"
          :alt="restaurant.name"
        />
        <div class="sd-card-name">
          <h2>{{ restaurant.business_name }}</h2>
        </div>
      </div>
      <!-- END Single card -->
    </div>
  </main>
</template>

<style scoped>
.back-btn {
  margin: 20px;
  background-color: transparent;
  color: rgb(255, 166, 0);
  font-size: 1.2em;
  border: 2px solid rgb(255, 166, 0);
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-btn:hover {
  background-color: #ff6600;
  color: white;
}
</style>
