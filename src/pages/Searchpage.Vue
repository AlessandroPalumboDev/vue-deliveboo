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
      restaurantType: "",
      error: false,
      api: {
        baseUrl: "http://localhost:8000/api/",
        endPoints: {
          restaurant: "restaurants?type=",
          page: "restaurants?page=",
        },
      },
      imageUrlDefault: "http://localhost:8000/storage/",
    };
  },

  methods: {
    getRestaurant(pageUrl = null) {
      const valore = localStorage.getItem("searchrest");
      this.restaurantType = valore.charAt(0).toUpperCase() + valore.slice(1);

      let url = pageUrl
        ? pageUrl
        : this.api.baseUrl + this.api.endPoints.restaurant + valore;

      axios
        .get(url)
        .then((response) => {
          const results = response.data.results;
          this.restaurants = results.data;
          this.currentPage = results.current_page;
          this.nextPageUrl = results.next_page_url;
          this.prevPageUrl = results.prev_page_url;
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

    nextPage() {
      if (this.nextPageUrl) {
        this.getRestaurant(this.nextPageUrl);
      }
    },

    prevPage() {
      if (this.prevPageUrl) {
        this.getRestaurant(this.prevPageUrl);
      }
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
    <div class="container">
      <div class="restaurant-grid">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="restaurant-card capitalize"
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
    </div>

    <!-- Pagination Buttons -->
    <h3 class="numero-pagina">Pagina {{ currentPage }}</h3>
    <div class="pagination-buttons">
      <button @click="prevPage" v-if="prevPageUrl">← Prec</button>
      <button @click="nextPage" v-if="nextPageUrl">Succ →</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
.restaurant-type-title {
  font-size: 3em;
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
  color: #ffffff;
  font-weight: bold;
}

.back-btn {
  display: block;
  margin: 20px auto;
  background-color: transparent;
  color: rgb(255, 166, 0);
  font-size: 16px;
  border: 2px solid rgb(255, 166, 0);
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-btn:hover {
  background-color: #ff6600;
  color: white;
}

.restaurant-grid {
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  gap: 30px;
  padding: 40px;
  align-items: start;
}

.restaurant-card {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 280px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease-in-out, background-color 0.3s ease-in-out;
  transition-delay: 0.1s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 1);
    transform: scale(1.05);
  }
}

.restaurant-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.restaurant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.restaurant-name {
  color: white;
  font-size: 1.4em;
  text-align: center;
  padding: 15px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0;
}
//Ale
.numero-pagina {
  color: rgb(255, 166, 0);
}
.pagination-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  button {
    background-color: transparent;
    color: rgb(255, 166, 0);
    font-size: 16px;
    border: 2px solid rgb(255, 166, 0);
    padding: 8px 20px;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
      background-color: #ff6600;
      color: white;
    }
  }
}
</style>
