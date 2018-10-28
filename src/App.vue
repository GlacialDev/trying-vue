<template lang="pug">
  #app
    .sidebar_placeholder
    Sidebar
    router-view.content-field
    transition(name="fade")
      Chat(v-show="getChatHiddenState")
</template>

<script>
import Sidebar from "./modules/sidebar/Sidebar";
import Chat from "./components/chat/Chat";

export default {
  name: "App",
  components: {
    Sidebar,
    Chat
  },
  data() {
    return {};
  },
  computed: {
    getChatHiddenState() {
      return this.$store.getters.getChatHiddenState;
    }
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
  min-height: 100vh;
  padding: 2%;
}

.sidebar_placeholder {
  min-width: rem(48px);
  min-height: 100%;
}

.fade-enter-active {
  transition: all 0.1s ease;
}
.fade-leave-active {
  transition: all 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
