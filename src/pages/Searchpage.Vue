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
      const url =
        this.api.baseUrl +
        this.api.endPoints.restaurant +
        this.store.searchrest;

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
  },

  created() {
    this.getRestaurantTypes();
  },
};
</script>

<template>
  <main>
    <!-- Restaurant types -->
    <div class="card-restaurant">
      <!-- Single card -->
      <div v-for="type in restaurants" :key="type.id" class="card-sd">
        <img
          src="/src/assets/img/small-card/napoli.jpg"
          alt="Restaurant Image"
        />
        <div class="sd-card-name">
          <h2>{{ type.business_name }}</h2>
        </div>
        <div class="card-text-sd">
          <div>
            <span>indirizzo: </span><span>{{ type.address }}</span>
          </div>
          <div class="block-sd">
            <span>tipologia: </span>tipologia:
            <span v-for="type in type.types">{{ type.name + ", " }}</span>
          </div>
        </div>
        <button class="btn-rest-sd">menu</button>
      </div>
      <!-- END Single card -->
    </div>
  </main>
</template>
