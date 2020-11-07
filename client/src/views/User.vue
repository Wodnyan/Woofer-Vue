<template>
  <div class="woof-container container-fluid">
    <div
      v-if="showNewWoofForm"
      :data-open="showNewWoofForm"
      class="new-woof-container"
      @click="handleOverlayClick"
    >
      <new-woof-form />
    </div>
    <div class="row">
      <div class="col-3 p-4 d-none d-md-block">
        <Nav />
        <button
          class="btn btn-primary btn-block mb-1"
          @click="toggleNewWoofForm"
        >
          Woof
        </button>
      </div>
      <main class="col-md-6 feed">
        <card
          v-for="woof in woofs"
          :key="woof.id"
          :text="woof.woof"
          :handle="`@${woof.handle}`"
          :username="woof.username"
          :createdAt="woof.created_at"
        />
        <h1 v-if="!!!woofs.length" class="text-center">
          This female dog in heat is empty
        </h1>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import Nav from "@/components/Nav.vue";
import NewWoofForm from "@/components/NewWoofForm.vue";
import { API_ENDPOINT } from "@/constants/endpoint";
import axios from "axios";

export default defineComponent({
  components: {
    Card,
    Nav,
    NewWoofForm,
  },
  data() {
    return {
      woofs: [],
      showNewWoofForm: false,
    };
  },
  methods: {
    toggleNewWoofForm() {
      this.showNewWoofForm = !this.showNewWoofForm;
    },
    handleOverlayClick(e) {
      if (e.target.className === "new-woof-container") this.toggleNewWoofForm();
    },
  },
  async mounted() {
    const handle = this.$route.params.handle;
    const resp = await axios.get(
      `${API_ENDPOINT}/api/v1/woofs?handle=${handle}`,
      {
        withCredentials: true,
      },
    );
    this.woofs = resp.data.woofs;
  },
});
</script>

<style scoped lang="scss">
@import "../sass/components/_woofs";
</style>
