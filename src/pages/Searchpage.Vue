<script>

import axios from "axios";
import { store } from "../store.js";
export default {
  name: "HomepageComponent",

  data() {
    return {
      store,
      restaurantTypes: [],
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

  computed: {
    getImage() {
      return this.imageUrlDefault + this.restaurantTypes.image_path;
    },
  },

  methods: {
    getRestaurantTypes() {
      // Componing the url to make the API call
      const url = this.api.baseUrl + this.api.endPoints.restaurantsList;

      // API call
      axios
        .get(url)
        .then((response) => {
          this.restaurantTypes = response.data.types;
        })
        .catch((error) => console.log(error));
      console.log(this.restaurantTypes.image_path);
    },
  },

  created() {
    this.getRestaurantTypes();
  },
};
</script>

<template>
  <main>
   
  </main>
</template>
