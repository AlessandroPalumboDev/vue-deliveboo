<script>
import { store } from "../store.js";
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
      <i class="fas fa-map-pin"></i>
    </div>
  </div>
</template>
