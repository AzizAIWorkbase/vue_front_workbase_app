import { createStore } from "vuex";

const state = {
  avatar_url: null,
};

const mutations = {
  changeImgUrl(state, url) {
    state.avatar_url = url;
  },

}
const actions = {};

const getters = {};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});