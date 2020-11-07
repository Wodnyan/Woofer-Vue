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
        <div class="mb-4 mt-1">
          <new-woof-form />
        </div>
        <card
          v-for="woof in $store.state.woofs"
          :key="woof.id"
          :text="woof.woof"
          :handle="`@${woof.handle}`"
          :username="woof.username"
          :createdAt="woof.created_at"
        />
        <mobile-toggle-woof-button
          :toggle="toggleNewWoofForm"
          class="toggle-button"
        />
      </main>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import NewWoofForm from "@/components/NewWoofForm.vue";
import Nav from "@/components/Nav.vue";
import MobileToggleWoofButton from "@/components/MobileToggleWoofButton.vue";
import { API_ENDPOINT } from "@/constants/endpoint";
import axios from "axios";

const hideScrollBarIfFormIsOpen = () => {
  const isOpen = document.querySelector(".new-woof-container")
    ? document.querySelector(".new-woof-container")?.getAttribute("data-open")
    : false;
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

export default {
  data() {
    return {
      showNewWoofForm: false,
    };
  },
  components: {
    Card,
    NewWoofForm,
    Nav,
    MobileToggleWoofButton,
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
    const auth = await axios.get(`${API_ENDPOINT}/api/v1/users/check`, {
      withCredentials: true,
    });
    console.log(auth);
    this.$store.state.user = auth.data.user;
    const resp = await axios.get(`${API_ENDPOINT}/api/v1/woofs`);
    this.$store.state.woofs = resp.data.woofs;
  },
  updated() {
    if (!this.$store.state.user) {
      this.$router.push("/");
    }
    hideScrollBarIfFormIsOpen();
  },
};
</script>

<style scoped lang="scss">
@import "../sass/components/_woofs";
</style>
