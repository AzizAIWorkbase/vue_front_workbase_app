import { createStore } from 'vuex'
import useProfile from "@/composables/profile";
const { profile } = useProfile();


export default createStore({
  state: {
    profile:profile
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
