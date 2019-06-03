import './css/landing.scss';

import Vue from 'vue';
import router from './router';
import store from './store';
import Api from './lib/api';
import Landing from './Landing.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(Landing),
  created() {
    Vue.API = new Api();
  },
}).$mount('#app');
