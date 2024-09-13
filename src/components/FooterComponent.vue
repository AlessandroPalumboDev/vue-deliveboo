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
        <div class="col-socials-info">
          <div class="socials-container">
            <div class="socials-paragraph">
              <h3>
                Seguici sui nostri canali ufficiali per restare sempre
                aggiornato
              </h3>
            </div>
            <div class="socials-list">
              <ul class="d-flex justify-center">
                <li>
                  <a href="">
                    <img src="../assets/img/footer/facebook.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="../assets/img/footer/instagram.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="../assets/img/footer/x-social-media.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-info">
            <div class="info-container d-flex justify-between">
              <div class="column-sx">
                <h5>contatti</h5>
              </div>
              <div class="column-dx">
                <h5>supporto</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
