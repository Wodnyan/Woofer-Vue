<template>
  <div>
    Sign Up
    <form @submit.prevent="signUp" novalidate>
      <div class="form-group">
        <label for="username">Username*</label>
        <input
          class="form-control"
          id="username"
          type="text"
          v-model="fields.username"
        />
      </div>
      <div class="form-group">
        <label for="email">E-Mail*</label>
        <input
          class="form-control"
          id="email"
          type="email"
          v-model="fields.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password*</label>
        <input
          class="form-control"
          id="password"
          type="password"
          v-model="fields.password"
        />
      </div>
      <button class="btn btn-primary">Sign Up</button>
    </form>
    <h1>{{ fields.username }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  data() {
    return {
      fields: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {},
  setup() {
    onMounted(() => {
      console.log("I'm Mounted");
    });
  },
});
</script>

<style></style>
