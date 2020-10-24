<template>
  <div class="container">
    <div class="container__form">
      <h1 class="text-center">Sign Up</h1>
      <form @submit.prevent="signUp" novalidate>
        <transition name="fade">
          <div class="spinner-border" v-if="isLoading"></div>
        </transition>
        <transition name="scale">
          <div v-if="!isLoading" class="inputs">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                class="form-control"
                id="username"
                :class="check('username') && 'is-invalid'"
                type="text"
                v-model="fields.username"
              />
            </div>
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input
                class="form-control"
                :class="check('email') && 'is-invalid'"
                id="email"
                type="email"
                v-model="fields.email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                :class="check('password') && 'is-invalid'"
                id="password"
                type="password"
                v-model="fields.password"
              />
            </div>
          </div>
        </transition>
        <div class="bottom">
          <router-link to="/auth/login">I already have an account.</router-link>
          <button class="btn btn-primary">Sign Up</button>
        </div>
      </form>
      <ul v-if="errors.length && typeof errors === 'object'">
        <li v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API_ENDPOINT } from "@/constants/endpoint";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      fields: {
        username: "",
        password: "",
        email: "",
      },
      errors: [] as [] | string[],
      isLoading: false,
    };
  },
  methods: {
    async signUp() {
      try {
        this.isLoading = true;
        const resp = await axios.post(
          `${API_ENDPOINT}/api/v1/auth/signup`,
          this.fields,
        );
        if (resp.status === 201) {
          this.errors = [];
          this.isLoading = false;
          this.$router.push("/");
        }
      } catch (error) {
        this.errors = error.response.data.errors;
        this.isLoading = false;
      }
    },
    check(field: "username" | "password" | "email") {
      return this.errors.some((error: string) => error.includes(field));
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/_forms";
</style>
