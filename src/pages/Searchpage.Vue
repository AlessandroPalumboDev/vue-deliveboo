<script>
import axios, { Axios } from 'axios';
import { store } from '../store';
export default {
  name: 'Searchpage',
  components: {

  },
  data() {
    return {
      store,
      searchrest: [],
      api: {
        baseUrl: "http://127.0.0.1:8000/api/",
        endPoints: {
          Restaurant: 'restaurants?type='
        },
      }

    }


  },

  methods: {

    getRestaurant() {
      // Componing the url to make the API call
      const url = this.api.baseUrl + this.api.endPoints.Restaurant + this.store.state.selectedRestaurantTypes
      console.log(this.store.state.selectedRestaurantTypes)
      // API call
      axios
        .get(url)
        .then((response) => {
          let parameters = response.data.results;

          this.searchrest = parameters.data

        })
        .catch((error) => console.log(error));

    },
  },


  created() {
    this.getRestaurant()

  }



}



</script>


<template>
  <!-- <div v-for="type in searchrest" :key="type.name" class="card d-flex justify-center">
    <div class="card-body">
      <img :src="type.image_path" alt="" />
      <p>{{ type.name }}</p>
      <p>{{ type.description }}</p>
      <p>{{ type.image_path }}</p>
    </div>
  </div> -->
</template>

<style scoped></style>