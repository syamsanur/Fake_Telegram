import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { url } from '../src/helper/env'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBSraH5JA-j6lLMGSKkYtpBx0OwU9HoI2s'
  }
})

Vue.config.productionTip = false

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

axios.interceptors.response.use((response) => {
  console.log(response)
  if (response.data.code === 403) {
    const refreshToken = localStorage.getItem('refreshToken')
    axios.post('/user/refresh',
      { refreshToken })
      .then(async (result) => {
        await localStorage.setItem('token', result.data.data.newToken)
        await window.location.reload
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return response
})

axios.defaults.baseURL = url

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
