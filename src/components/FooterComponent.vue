<script>
import { store } from "../store.js";
export default {
  name: "FooterComponent",
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
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-socials">
          <div class="socials-container">
            <ul>
              <li>
                <img src="../assets/img/footer/facebook.svg" alt="" />
              </li>
              <li>
                <img src="../assets/img/footer/instagram.svg" alt="" />
              </li>
              <li>
                <img src="../assets/img/footer/x-social-media.svg" alt="" />
              </li>
              <li>
                <img src="../assets/img/footer/linkedin.svg" alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div class="col-info"></div>
      </div>
    </div>
  </footer>
</template>
