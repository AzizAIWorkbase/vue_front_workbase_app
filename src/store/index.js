import { createStore } from "vuex";
import useProfile from "@/composables/profile";
const { profile } = useProfile();

const state = {
  avatar_url: profile.value?.avatar,
  profileStore: profile,
  scrollProps: null,
};

const mutations = {
  changeImgUrl(state, url) {
    state.avatar_url = url;
    state.profileStore.avatar = url;
  },
  changeScrollProps(state, props) {
    state.scrollProps = props;
  },
};
const actions = {};

const getters = {};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
