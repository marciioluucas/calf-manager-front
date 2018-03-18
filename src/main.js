// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import components from './components/index'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueProgressBar from 'vue-progressbar'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts'

Vue.use(Vuetify, { theme: {
  primary: '#4f994d',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VueProgressBar, {
  color: '#2196F3',
  failedColor: 'red',
  height: '2px'
})

Vue.component('chart', ECharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: components,
  template: '<App/>'
})
