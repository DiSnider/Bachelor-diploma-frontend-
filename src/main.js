import Vue from 'vue'
import App from './components/App/App.vue'
import ToggleButton from 'vue-js-toggle-button'
import VModal from 'vue-js-modal'
import { ClientTable } from 'vue-tables-2'

Vue.use(ClientTable)
Vue.use(VModal, { dynamic: true })
Vue.use(ToggleButton)
Vue.component('vue-simple-spinner', require('vue-simple-spinner/src/components/Spinner.vue').default)

new Vue({
  el: '#app',
  render: h => h(App)
})