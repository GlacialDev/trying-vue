import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      isChatHidden: false
    },
    mutations: mutations,
    actions: actions,
    getters: getters
  });
export default store;
