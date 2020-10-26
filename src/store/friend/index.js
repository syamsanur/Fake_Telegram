import axios from 'axios'

const state = () => {
  return {
    all: []
  }
}

const getters = {
  getAllFriend (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL (state, payload) {
    state.all = payload
  }
}

const actions = {
  getAllFriend (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get(`friend/getall/${payload}`)
        .then((response) => {
          // console.log(response.data.data)
          context.commit('SET_ALL', response.data.data)
          // resolve()
        }).catch((err) => {
          // reject(err)
          console.log(err)
        })
    })
  },
  insertFriend (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post('friend/insert', payload)
        .then((response) => {
          resolve(response)
          // console.log(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
