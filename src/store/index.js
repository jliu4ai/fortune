import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null,
    remainingQuota: 2,
    isPremium: false
  },
  mutations: {
    SET_USER_INFO(state, info) {
      state.userInfo = info
    },
    DECREASE_QUOTA(state) {
      state.remainingQuota--
    },
    SET_PREMIUM(state, status) {
      state.isPremium = status
    }
  },
  actions: {
    async checkUserQuota({ state, commit }) {
      if (state.isPremium) return true
      if (state.remainingQuota > 0) {
        commit('DECREASE_QUOTA')
        return true
      }
      return false
    }
  }
})

export default store
