<template>
  <div class="woof-form-container">
    <button @click="close" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <form @submit.prevent="addNewWoof">
      <div class="form-group">
        <label for="woof" class="text-white">Your Woof</label>
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
        userId: this.$store.state.user.user_id,
      };
      try {
        const res = await axios.post(`${API_ENDPOINT}/api/v1/woofs`, payload);

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
  width: 40%;
  margin: 5rem auto 0;
  textarea {
    font-size: 1.5rem;
    height: 200px;
  }
}
</style>
