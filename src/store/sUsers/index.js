import axios from 'axios'

const state = () => {
  return {
    all: [],
    oneUser: [],
    userChat: []
  }
}

const getters = {
  getAllUsers (state) {
    return state.all
  },
  getOneUser (state) {
    return state.oneUser
  },
  dataz (state) {
    const q = state.oneUser.id_users
    // console.log(q)
    const w = state.all.filter(e => e.id_users !== q)
    return w
  },
  getUserChat (state) {
    return state.userChat
  }
}

const mutations = {
  SET_ALL (state, payload) {
    state.all = payload
  },
  SET_ONE_USER (state, payload) {
    state.oneUser = payload
  },
  SET_USER_CHAT (state, payload) {
    state.userChat = payload
  }
}

const actions = {
  getAllUsers (context, payload) {
    // console.log(payload)
    this.sortBy = payload ? null : 'id_users'
    return new Promise((resolve, reject) => {
      axios.get(`users/getall?sorting=${payload}`)
        .then((response) => {
          // console.log(response.data.data)
          context.commit('SET_ALL', response.data.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
    })
  },
  getOneUser (context, payload) {
    // console.log(`${payload} dari state`)
    return new Promise((resolve, reject) => {
      axios.get(`users/getone/${payload}`)
        .then((response) => {
          // console.log(response.data)
          context.commit('SET_ONE_USER', response.data.data[0])
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getUserChat (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('users/getall')
        .then((response) => {
          const datax = response.data.data
          const datac = datax.filter(e => e.fullname_users === payload)
          // console.log(datac)
          const datav = datac[0]
          context.commit('SET_USER_CHAT', datav)
          // console.log(response.data.data)
          // context.commit('SET_ALL', response.data.data)
          // resolve()
        }).catch((err) => {
          reject(err)
        })
    })
  },
  updateData (context, payload) {
    console.log(payload)
    const formdata = new FormData()
    formdata.append('fullname_users', payload.fullname_users)
    formdata.append('image', payload.newImage)
    formdata.append('phone_users', payload.phone_users)
    formdata.append('bio_users', payload.bio_users)

    for (var value of formdata.values()) {
      console.log(value)
    }
    return new Promise((resolve, reject) => {
      axios.patch(`users/edit/${payload.id_users}`, formdata)
        .then((response) => {
          resolve(response.data.message)
          // console.log(response)
        })
        .catch((err) => {
          reject(err)
          // console.log(err)
        })
    })
  }
  // getCategory (context) {
  //   return new Promise((resolve, reject) => {
  //     axios.get('category/getall')
  //       .then((response) => {
  //         // console.log(response.data)
  //         context.commit('SET_CATEGORY', response.data.data)
  //         resolve()
  //       }).catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // addProduct (context, payload) {
  //   return new Promise((resolve, reject) => {
  //     // console.log(`vuex ${payload}`)

  //     // for (var value of payload.values()) {
  //     //   console.log(value)
  //     // }

  //     axios.post('product/insert', payload)
  //       .then((response) => {
  //         // console.log(response)
  //         // console.log(response.data.message)
  //         resolve(response)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // deleteProduct (context, payload) {
  //   // console.log(payload)
  //   if (confirm('Delete ?')) {
  //     return new Promise((resolve, reject) => {
  //       axios.delete(`product/delete/${payload}`)
  //         .then((response) => {
  //           // console.log(response)
  //           resolve(response.data)
  //         })
  //         .catch((err) => {
  //           reject(err)
  //         })
  //     })
  //   }
  // },
  // updateProduct (context, payload) {
  //   return new Promise((resolve, reject) => {
  //     const id = payload.get('id_product')
  //     // for (var value of payload.values()) {
  //     //   console.log(value)
  //     // }

  //     // console.log(`${id} dari payload`)

  //     axios.put(`product/update/${id}`, payload)
  //       .then((response) => {
  //         // console.log(response.data)
  //         resolve(response.data.message)
  //       }).catch((err) => {
  //         reject(err)
  //       })
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
