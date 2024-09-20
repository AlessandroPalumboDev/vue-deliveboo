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
      restaurantType: "", // Memorizza il tipo di ristorante
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

  methods: {
    getRestaurant() {
      const valore = localStorage.getItem("searchrest");
      this.restaurantType = valore.charAt(0).toUpperCase() + valore.slice(1); // Capitalizzazione
      const url = this.api.baseUrl + this.api.endPoints.restaurant + valore;

      axios
        .get(url)
        .then((response) => {
          this.restaurants = response.data.results.data;
        })
        .catch((error) => console.log(error));
    },

    goBack() {
      this.$router
        .push({ name: "home" })
        .catch((error) => console.log("Errore nel routing:", error));
    },

    getMenu(rest) {
      let restID = rest.id;
      this.rest_ID = restID;
      localStorage.setItem("rest_ID", restID);
      this.rest_show = rest;
      localStorage.setItem("rest_show", JSON.stringify(rest));

      this.$router
        .push({ name: "restaurantMenu" })
        .catch((error) => console.log("Errore nel routing:", error));
    },
  },

  mounted() {
    this.getRestaurant();
  },
};
</script>

<template>
  <main class="search-page">
    <h1 class="restaurant-type-title">{{ restaurantType }}</h1>
    <button class="back-btn" @click="goBack()">← Torna Indietro</button>
    
    <!-- cards -->
    <div class="restaurant-grid">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="restaurant-card"
        @click="getMenu(restaurant)"
      >
        <div class="restaurant-image-wrapper">
          <img
            :src="this.imageUrlDefault + restaurant.image_path"
            :alt="restaurant.business_name"
            class="restaurant-image"
          />
        </div>
        <h2 class="restaurant-name">{{ restaurant.business_name }}</h2>
      </div>
    </div>
  </main>
</template>

<style scoped>


.restaurant-type-title {
  font-size: 3em;
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
  font-weight: bold;
}


.back-btn {
  display: block; 
  margin: 20px auto;
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


.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px;
  justify-items: center;
  align-items: start;
}


.restaurant-card {
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 280px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.restaurant-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.restaurant-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.restaurant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.restaurant-card:hover .restaurant-image {
  transform: scale(1.1);
}

.restaurant-name {
  color: white;
  font-size: 1.4em;
  text-align: center;
  padding: 15px 10px;
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0;
}
</style>
