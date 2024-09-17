<script>

import axios from "axios";
import { store } from "../store.js";
export default {
  name: "HomepageComponent",

  data() {
    return {
      store,
      restaurants: [],
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
    getRestaurantTypes() {
      // Componing the url to make the API call
      const url = this.api.baseUrl + this.api.endPoints.restaurant + this.store.searchrest;

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
  },

  created() {
    this.getRestaurantTypes();
  },
};
</script>

<template>
  <main>
    <!-- Restaurant types -->
    <div class="container-md">
      <!-- Single card -->
      <div v-for="type in restaurants" :key="type.id" class="card w-100 mt-5 mb-5 ">
        <div class="d-flex justify-center">
          <div class="card-body">

            <img src="/src/assets/img/small-card/napoli.jpg" alt="" />

            <p>{{ type.business_name }}</p>
          </div>
        </div>
      </div>
      <!-- END Single card -->
    </div>
  </main>
</template>
