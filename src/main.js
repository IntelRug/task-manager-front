import './css/main.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Api from './lib/api';
import Dialog from './plugins/dialogs';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Dialog);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    Vue.API = new Api({
      loginURL: '/about',
      mainURL: '/',
    });
    this.$store.commit('SET_CURRENT_USER_ID', Vue.API.getUserId());
  },
}).$mount('#app');
