<script>
import { store } from "../store.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "SmallCardComponent",
  components: {},

  data() {
    return {
      store,
    };
  },

  methods: {},
};
</script>

<template>
  <div class="small-card">
    <div>
      <img src="../assets/img/small-card/map-pin.svg" alt="" />
    </div>
    <div>
      <img src="../assets/img/small-card/burger.svg" alt="" />
    </div>
    <div>
      <img src="../assets/img/small-card/dish-cap.svg" alt="" />
    </div>
  </div>
</template>
