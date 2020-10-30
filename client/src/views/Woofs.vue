<template>
  <div class="woof-container container-fluid">
    <div
      v-if="showNewWoofForm"
      :data-open="showNewWoofForm"
      class="new-woof-container"
      @click="handleOverlayClick"
    >
      <new-woof-form class="w-50 mx-auto mt-4" />
    </div>
    <div class="row">
      <div class="col-3 p-4">
        <Nav />
        <button
          class="btn btn-primary btn-block mb-1"
          @click="toggleNewWoofForm"
        >
          Woof
        </button>
      </div>
      <main class="col-6 feed">
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
      </main>
      <div class="col-3">
        <button @click="toggleNewWoofForm" class="btn btn-primary btn-circle">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            ></path>
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import NewWoofForm from "@/components/NewWoofForm";
import Nav from "@/components/Nav";
import { API_ENDPOINT } from "@/constants/endpoint";
import axios from "axios";

const hideScrollBarIfFormIsOpen = () => {
  const isOpen = document.querySelector(".new-woof-container")
    ? document.querySelector(".new-woof-container").getAttribute("data-open")
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
@import "../styles/_colors";
.new-woof-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
.woof-container {
  overflow-y: hidden;
  background: $dark-blue;
  height: 100vh;
}
.feed {
  overflow-y: auto;
  height: 100vh;
}
</style>
