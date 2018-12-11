<template lang='pug'>
  .blog
    h1 This is blog page
    Posts
</template>

<script>
import Posts from "../components/posts/Posts";

export default {
  name: "Blog",
  components: {
    Posts
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
</style>
