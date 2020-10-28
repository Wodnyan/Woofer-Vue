<template>
  <div class="woof-form-container">
    <form @submit.prevent="addNewWoof">
      <div class="form-group">
        <textarea v-model="woof" class="form-control" />
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <button
          type="submit"
          :disabled="woof.length === 0"
          class="btn btn-lg btn-primary mr-auto"
        >
          Woof
        </button>
        <counter :count="woof.length" :max="maxLength" />
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { API_ENDPOINT } from "@/constants/endpoint";
import Counter from "@/components/Counter";

export default defineComponent({
  data() {
    return {
      woof: "",
      maxLength: 256,
    };
  },
  props: {
    close: Function,
  },
  components: {
    Counter,
  },
  methods: {
    async addNewWoof() {
      if (this.woof.length > this.maxLength) return;
      const payload = {
        woof: this.woof,
        userId: this.$store.state.user.id,
      };
      try {
        const res = await axios.post(`${API_ENDPOINT}/api/v1/woofs`, payload, {
          withCredentials: true,
        });
        console.log(res.data);
        const { user, woof, id } = res.data.woof;
        const newWoof = {
          id,
          woof,
          createdAt: res.data.woof.created_at,
          username: user.username,
          handle: user.handle,
        };
        this.$store.state.woofs = [newWoof, ...this.$store.state.woofs];
        this.woof = "";
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.woof-form-container {
  textarea {
    font-size: 1.5rem;
    height: 200px;
  }
}
</style>
