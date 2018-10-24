<template lang="pug">
  #app
    Sidebar
    router-view.content-field
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

.content-field {
  flex-grow: 1;
}
</style>
