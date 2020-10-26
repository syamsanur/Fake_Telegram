import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import sUsers from './sUsers'
import friend from './friend'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    sUsers,
    friend
  }
})
