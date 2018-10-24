<template lang='pug'>
  .about
    h1 This is about page
    Slider(v-bind:slider_items = "slider_items")
</template>

<script>
import Slider from "./../components/slider/Slider";

export default {
  name: "About",
  components: {
    Slider
  },
  data() {
    return {
      slider_items: [
        require("../assets/about_slider/slide_1.jpg"),
        require("../assets/about_slider/slide_2.jpg"),
        require("../assets/about_slider/slide_3.jpg")
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
}
</style>
