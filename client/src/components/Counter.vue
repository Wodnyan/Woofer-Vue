<template>
  <p :class="count > max && 'text-danger'" class="mb-0 h4 text-white">
    {{ count }}
  </p>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    count: Number,
    max: Number,
  },
});
</script>

<style></style>
