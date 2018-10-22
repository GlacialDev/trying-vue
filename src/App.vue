<template lang="pug">
  #app
    Sidebar
      //- <router-link to="/">Home</router-link> |
      //- <router-link to="/about">About</router-link>
    router-view
</template>

<script>
import Sidebar from "./modules/sidebar/Sidebar";

export default {
  name: "App",
  components: {
    Sidebar
  }
};
</script>


<style lang='scss'>
@import "normalize-scss";
@include normalize();
@import "./components/common/mixins.scss";
@import "./components/common/universal.scss";

#app {
  display: flex;
  flex-direction: row;
  background-color: #f4f4f4;
}
</style>
