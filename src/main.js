import Vue from 'vue'
import App from './App'

import Api from './request/api'
Vue.prototype.$api = Api

import utils from './utils/index.js'
Vue.prototype.$util = utils

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
