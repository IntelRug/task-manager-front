import Vue from 'vue';
import Router from 'vue-router';
import Task from './components/Task.vue';
import List from './components/List.vue';
import Main from './components/Main.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'select',
  routes: [
    {
      path: '/about/signin',
      components: {
        modal: Login,
      },
      props: {
        modal: true,
      },
    },
    {
      path: '/about/signup',
      components: {
        modal: Register,
      },
      props: {
        modal: true,
      },
    },
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
    {
      path: '/',
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
