<script>
import { store } from "../../store.js";
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
                    <img src="../../assets/img/footer/facebook.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="../../assets/img/footer/instagram.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img
                      src="../../assets/img/footer/x-social-media.svg"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-info">
            <div class="info-container d-flex justify-between">
              <div class="column-sx">
                <h5>Contatti</h5>
                <ul class="contacts-list">
                  <li>
                    <a href="">Chi siamo</a>
                  </li>
                  <li>
                    <a href="">Contattaci</a>
                  </li>
                  <li>
                    <a href="">Lavora con noi</a>
                  </li>
                  <li>
                    <a href="">Diventa partner DeliveBoo</a>
                  </li>
                </ul>
              </div>
              <div class="column-dx">
                <h5>Supporto</h5>
                <ul class="support-list">
                  <li>
                    <a href="">FAQs</a>
                  </li>
                  <li>
                    <a href="">Termini e condizioni</a>
                  </li>
                  <li>
                    <a href="">Informativa cookie</a>
                  </li>
                  <li>
                    <a href="">Informazioni legali</a>
                  </li>
                  <li>
                    <a href="">Informativa sulla privacy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="copyright">
            <p>&copy; 2024 DeliveBoo</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
