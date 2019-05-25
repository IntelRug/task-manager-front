import Vue from 'vue';
import Router from 'vue-router';
import Task from './components/Task.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'select',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/tasks/:taskId',
      components: {
        right: Task,
      },
      props: {
        right: true,
      },
    },
  ],
});
