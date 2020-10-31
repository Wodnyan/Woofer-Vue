<template>
  <p :class="count > max && 'text-danger'" class="mb-0 h4 text-primary">
    {{ count }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    count: Number,
    max: Number,
  },
});
</script>

<style></style>
