<template>
  <main>
    <div class="btn-group">
      <router-link class="btn btn-primary" to="/auth/login">
        Login
      </router-link>
      <router-link class="btn btn-secondary" to="/auth/signup">
        Sign up
      </router-link>
      <router-link class="btn btn-primary" to="/woofs">
        Woofs
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
