<template lang='pug'>
  .slider
    .slider_controls-list
      li.slider_controls-item(v-for="slide in slides")
        a.slider_control(v-on:click="controlClicked(slide.order)" v-bind:class="{active: slide.isActive}")
    ul.slider_list(ref="slider_list")
      li.slider_item(v-for="slide in slides")
        a.slider_link(:href="slide.href")
          img.slider_img(:src="slide.img")
</template>

<script>
export default {
  name: "Slider",
  props: ["slides"],
  components: {},
  data() {
    return {
      slideNumber: 0,
      slideIntervalVariable: null
    };
  },
  methods: {
    scroll: function(order) {
      this.$refs.slider_list.style.transform =
        "translateX(" + order * -100 + "%)";
    },
    setActiveClass: function(order) {
      order = order || 0;
      let self = this;
      for (let i = 0; i < this.slides.length; i++) {
        self.slides[i].isActive = false;
      }
      self.slides[order].isActive = true;
    },
    initAutoScroll: function() {
      this.slideNumber++;
      let controlsAmount = this.slides.length;
      let self = this;
      self.slideIntervalVariable = setInterval(function() {
        if (self.slideNumber === controlsAmount) {
          self.slideNumber = 0;
        }
        self.scroll(self.slideNumber);
        self.setActiveClass(self.slideNumber);
        self.slideNumber++;
      }, 5000);
    },
    destroyAutoScroll: function() {
      clearInterval(this.slideIntervalVariable);
    },
    controlClicked: function(order) {
      this.destroyAutoScroll();
      this.slideNumber = order;
      this.scroll(order);
      this.setActiveClass(order);
      this.initAutoScroll();
    }
  },
  mounted: function() {
    this.initAutoScroll();
  },
  beforeDestroy: function() {
    this.destroyAutoScroll();
  }
};
</script>

<style lang='scss' scoped>
@import "../../components/common/mixins.scss";

.slider {
  width: 80%;
  height: 60vh;
  border: rem(3px) solid $medium_green;
  border-radius: 5px;
  transition: 0.5s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  &_controls {
    &-list {
      position: absolute;
      z-index: 10;
      padding-bottom: rem(8px);
    }

    &-item {
      display: inline-block;
    }
  }

  &_control {
    display: inline-block;
    width: rem(8px);
    height: rem(8px);
    margin-right: rem(8px);
    border-radius: 50%;
    background-color: $medium_green;
    transition: 0.5s;
    &:hover,
    &.active {
      background-color: $light_green;
    }
  }

  &_list {
    display: flex;
    width: 100%;
    height: 100%;
    transition: 0.5s;
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
