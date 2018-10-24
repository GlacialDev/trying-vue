<template lang='pug'>
  .slider
    #meow
    ul.slider_list 
      li.slider_item(v-for="item in slider_items")
        a(href="/about")
          img(:src="item").slider_img
</template>

<script>
export default {
  name: "Slider",
  props: ["slider_items"],
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
@import "../../components/common/mixins.scss";

.slider {
  width: 80%;
  height: 60vh;
  border: 3px solid $medium_green;
  border-radius: 5px;
  transition: 0.5s;
  overflow: hidden;

  &_list {
    display: flex;
    width: 100%;
    height: 100%;
    transform: translateX(0%);
  }

  &_item {
    min-width: 100%;
    height: 100%;
  }

  &_img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
}
</style>
