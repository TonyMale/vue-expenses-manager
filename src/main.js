import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import {store} from './store'

import 'vuetify/dist/vuetify.min.css' 
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
