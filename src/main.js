import './css/build/main.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Api from './lib/api';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    Vue.API = new Api();
  },
}).$mount('#app');
