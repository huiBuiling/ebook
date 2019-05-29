import Vue from 'vue'
import Vuex from 'vuex'
import getters from './gutters'
import book from './modules/book'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book
  },
  getters
})
