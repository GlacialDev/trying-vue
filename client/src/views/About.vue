<template lang='pug'>
  .about
    h1 This is about page
    Slider(v-bind:slides = "slides")
</template>

<script>
import Slider from "../components/slider/Slider";

export default {
  name: "About",
  components: {
    Slider
  },
  data() {
    return {
      slides: [
        {
          img: require("../assets/about_slider/slide_1.jpg"),
          href: "/about",
          order: 0,
          isActive: true
        },
        {
          img: require("../assets/about_slider/slide_2.jpg"),
          href: "/about",
          order: 1,
          isActive: false
        },
        {
          img: require("../assets/about_slider/slide_3.jpg"),
          href: "/about",
          order: 2,
          isActive: false
        },
        {
          img: require("../assets/about_slider/slide_4.jpg"),
          href: "/about",
          order: 3,
          isActive: false
        },
        {
          img: require("../assets/about_slider/slide_5.jpg"),
          href: "/about",
          order: 4,
          isActive: false
        }
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
