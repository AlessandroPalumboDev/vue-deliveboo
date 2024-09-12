<script>
import { store } from "../store.js";
import HeaderComponent from "./HeaderComponent.vue";
import FooterComponent from "./FooterComponent.vue";
export default {
  name: "MainComponent",
  components: {
    HeaderComponent,
    FooterComponent,
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
          <div>
            <h1>Hai fame? Cerca il piatto che vuoi nella tua città</h1>
            <div class="search-bar">
              <form action="" class="d-flex">
                <input
                  type="text"
                  placeholder="Cosa vorresti mangiare?"
                  class="py-2"
                />
                <button class="go-button py-1">Vai!</button>
              </form>
            </div>
          </div>
          <!-- END Search bar section -->

          <!-- Big image section -->
          <div class="Image-big">ciao</div>
          <!-- END Big image section -->
        </div>
      </div>
    </section>

    <FooterComponent />
  </main>
</template>
