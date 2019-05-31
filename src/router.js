import Vue from 'vue';
import Router from 'vue-router';
import Task from './components/Task.vue';
import List from './components/List.vue';
import Main from "./components/Main";

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'select',
  routes: [
    {
      path: '/lists/:listId/tasks/:taskId',
      components: {
        left: List,
        default: Main,
        right: Task,
      },
      props: {
        default: true,
        right: true,
      },
    },
    {
      path: '/lists/:listId/tasks/create',
      components: {
        left: List,
        default: Main,
        right: Task,
      },
      props: {
        default: true,
        right: true,
      },
    },
    {
      path: '/lists/:listId',
      components: {
        left: List,
        default: Main,
      },
      props: {
        default: true,
      },
    },
  ],
});
