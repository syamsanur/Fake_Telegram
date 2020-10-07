import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import sUsers from './sUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    sUsers
  }
})
