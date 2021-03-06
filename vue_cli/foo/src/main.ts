import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueMaterial.default)

new Vue({
  render: h => h(App)
}).$mount('#app')
