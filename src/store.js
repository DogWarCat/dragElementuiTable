import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    giveNum (state, obj) {
      state.count = obj.num
    //   state.count++
    },
    increment (state) {
      state.count++
    }
  }
})
export default store
