<template>
  <div class="container">
    <div class="login">
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
                type="text"
                v-model="fields.username"
              />
            </div>
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input
                class="form-control"
                id="email"
                type="email"
                v-model="fields.email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                id="password"
                type="password"
                v-model="fields.password"
              />
            </div>
          </div>
        </transition>
        <div class="bottom">
          <router-link to="/auth/login">Create an Account!</router-link>
          <button class="btn btn-primary">Sign Up</button>
        </div>
      </form>
      <ul v-if="errors.length">
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
      apiResp: "",
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
  },
});
</script>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login {
    width: 50%;
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
    .scale-enter-active,
    .scale-leave-active {
      transition: transform 0.5s ease;
    }
    .scale-enter-from,
    .scale-leave-to {
      transform: scale(0);
    }
    .spinner-border {
      $spinner-size: 70px;
      display: block;
      margin: 0 auto;
      width: $spinner-size;
      height: $spinner-size;
    }
  }
  .bottom {
    display: flex;
    a {
      margin-right: auto;
    }
  }
}
</style>
