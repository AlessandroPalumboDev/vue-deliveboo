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
          <div class="col-6">
            <div>
              <h1>Cosa vorresti mangiare?</h1>
              <form action="">
                <input
                  type="text"
                  placeholder="Scrivi cosa vorresti mangiare"
                />
              </form>
            </div>
          </div>
          <div class="col-6">ciao</div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </main>
</template>
