<template>
  <div class="container">
    <div class="container__form">
      <h1 class="text-center">Login</h1>
      <form @submit.prevent="signUp" novalidate>
        <transition name="fade">
          <div class="spinner-border" v-if="isLoading"></div>
        </transition>
        <transition name="scale">
          <div v-if="!isLoading" class="inputs">
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input
                class="form-control"
                :class="error && 'is-invalid'"
                id="email"
                type="email"
                v-model="fields.email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                :class="error && 'is-invalid'"
                id="password"
                type="password"
                v-model="fields.password"
              />
            </div>
          </div>
        </transition>
        <p v-if="error" class="text-danger text-center">
          E-mail or Password is incorrect!
        </p>
        <div class="bottom">
          <router-link to="/auth/signup">Create an Account!</router-link>
          <button class="btn btn-primary">Login</button>
        </div>
      </form>
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
        password: "",
        email: "",
      },
      apiResp: "",
      error: false,
      isLoading: false,
    };
  },
  methods: {
    async signUp() {
      try {
        this.isLoading = true;
        const resp = await axios.post(
          `${API_ENDPOINT}/api/v1/auth/login`,
          this.fields,
          {
            withCredentials: true,
          },
        );
        if (resp.status === 200) {
          this.error = false;
          this.isLoading = false;
          this.$store.state.user = resp.data.user;
          this.$store.state.jwt = resp.data.token;
          this.$router.push("/home");
        }
      } catch (error) {
        this.error = true;
        this.isLoading = false;
      }
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/_forms";
</style>
