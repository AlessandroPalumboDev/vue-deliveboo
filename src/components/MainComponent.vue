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
          <div class="col">
            <h1>CIAO</h1>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </main>
</template>
