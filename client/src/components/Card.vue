<template>
  <article class="media">
    <div class="media-body">
      <h1 class="h3 mb-0 d-inline">{{ username }}</h1>
      <a class="mx-1" href="#">{{ handle }}</a>
      <time :datetime="createdAt" class="text-muted">
        {{ timeStampToHumanReadable }}
      </time>
      <p class="mb-1 text-break">
        {{ text }}
      </p>
      <like :liked="false" :numberOfLikes="1" />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Like from "@/components/Like.vue";
import { format } from "timeago.js";

export default defineComponent({
  name: "Card",
  props: {
    username: String,
    handle: String,
    text: String,
    createdAt: String,
  },
  components: {
    Like,
  },
  computed: {
    timeStampToHumanReadable: function(): string {
      return format(this.createdAt as string);
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
