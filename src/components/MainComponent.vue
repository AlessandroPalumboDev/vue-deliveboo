<script>
import { store } from "../store.js";
import HeaderComponent from "./HeaderComponent.vue";
import FooterComponent from "./FooterComponent.vue";
import SmallCardComponent from "./SmallCardComponent.vue";
export default {
  name: "MainComponent",
  components: {
    HeaderComponent,
    FooterComponent,
    SmallCardComponent,
  },

  data() {
    return {
      store,
    };
  },

  methods: {},
};
</script>

<template>
  <main>
    <HeaderComponent />

    <section>
      <div class="container">
        <div class="row">
          <!-- Search bar section -->
          <div class="jumbo">
            <div class="d-flex title-box">
              <h1>Hai fame? Cerca il piatto che vuoi nella tua città</h1>
            </div>
            <div class="d-flex">
              <h2>I piatti dei tuoi ristoranti ovunque, anche a domicilio</h2>
            </div>
            <div class="search-bar">
              <form action="" class="d-flex">
                <input
                  type="text"
                  placeholder="Cosa vorresti mangiare?"
                  class="font-family"
                />
                <button type="submit" class="go-button font-family">
                  Vai!
                </button>
              </form>
            </div>
          </div>
          <!-- END Search bar section -->

          <!-- Big image section -->
          <div class="image-big">
            <div>
              <h3>Come ordinare?</h3>
            </div>
            <div>
              <h2>E' semplicissimo!</h2>
            </div>
            <div>
              <SmallCardComponent />
            </div>
          </div>
          <!-- END Big image section -->
        </div>
      </div>
    </section>

    <FooterComponent />
  </main>
</template>
