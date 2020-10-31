<template>
  <article class="media">
    <div class="media-body">
      <h1 class="h2 mb-0 mr-2 d-inline">{{ username }}</h1>
      <a href="#">{{ handle }}</a>
      <p class="mb-1 text-break">
        {{ text }}
      </p>
      <time :datetime="createdAt" class="text-muted ">
        {{ timeStampToHumanReadable }}
      </time>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "timeago.js";

export default defineComponent({
  name: "Card",
  props: {
    username: String,
    handle: String,
    text: String,
    createdAt: String,
  },
  computed: {
    timeStampToHumanReadable: function() {
      return format(this.createdAt);
    },
  },
});
</script>

<style scoped lang="scss">
@import "../sass/_colors";
article {
  /* margin-bottom: 1rem; */
  border: 1px solid $kinda-transparent-blue;
  padding: 1rem;
  color: #fff;
}
</style>
