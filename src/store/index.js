import { createStore } from 'vuex';
import router from "../router/index";

export default createStore({
  state: {
    BASE_API_URL: "http://localhost:3000",
  },
  getters: {
    base_api_url(state) {
      return state.BASE_API_URL;
    }
  },
  mutations: {
    redirectToPage(state, payload){
      router.push(payload)
    }
  },
  actions: {
    redirectToPage({ commit }, payload){
      commit("redirectToPage", payload);
    }
  }
})
