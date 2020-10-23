<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        hello World
      </div>
      <div class="col-6">
        <Card
          v-for="woof in woofs"
          :key="woof.id"
          :text="woof.woof"
          handle="@test"
          username="FooBar"
          :createdAt="woof.created_at"
        />
      </div>
      <div class="col-3">
        <router-link to="/new" class="btn btn-primary btn-circle">
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { API_ENDPOINT } from "@/constants/endpoint";
import axios from "axios";

export default {
  data() {
    return {
      woofs: [],
    };
  },
  components: {
    Card,
  },
  async mounted() {
    const resp = await axios.get(`${API_ENDPOINT}/api/v1/woofs`);
    this.woofs = resp.data.woofs;
    console.log(resp.data);
  },
};
</script>

<style lang="scss"></style>
