<template>
  <button class="like" @click="toggleLike">
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
      :class="isLiked && 'liked'"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      ></path>
    </svg>
    {{ likes }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    numberOfLikes: Number,
    liked: Boolean,
  },
  data() {
    return {
      isLiked: this.liked,
      likes: this.numberOfLikes || 0,
    };
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likes += this.isLiked ? 1 : -1;
    },
  },
});
</script>

<style scoped lang="scss">
button.like {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  svg.liked {
    fill: #fff;
  }
}
</style>
