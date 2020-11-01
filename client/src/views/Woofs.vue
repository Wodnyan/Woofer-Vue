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
      <div class="col-3 d-none d-md-block"></div>
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
    this.$store.state.user = auth.data.user;
    const resp = await axios.get(`${API_ENDPOINT}/api/v1/woofs`);
    this.$store.state.woofs = resp.data.woofs;
  },
  updated() {
    if (this.$store.state.user === null) {
      this.$router.push("/");
    }
    hideScrollBarIfFormIsOpen();
  },
};
</script>

<style scoped lang="scss">
@import "../sass/_colors";
.new-woof-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  .woof-form-container {
    position: relative;
    width: 50%;
    margin: 1rem auto 0;
  }
}
.woof-container {
  overflow-y: hidden;
  background: $dark-blue;
  height: 100vh;
}
.feed {
  position: relative;
  overflow-y: auto;
  z-index: 1;
  height: 100vh;
  .toggle-button {
    display: none;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
}
@media only screen and (max-width: 768px) {
  .feed {
    .toggle-button {
      display: block;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
    }
  }
}
</style>
