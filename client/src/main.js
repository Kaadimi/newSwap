import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./services/router";
import { store } from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.config.productionTip = false
const token = window.localStorage.getItem("swap_token");
if (token) axios.defaults.headers.common["x-auth-token"] = token;
else delete axios.defaults.headers.common["x-auth-token"];

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
