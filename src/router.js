import Vue from 'vue';
import Router from 'vue-router';
import OTask from './components/OTask.vue';
import UTask from './components/UTask.vue';
import UList from './components/UList.vue';
import Main from './components/Main.vue';
import OMain from './components/OMain.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import OrganizationsList from './components/OList.vue';
import Organization from './components/Organization.vue';

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
        left: UList,
        default: Main,
        right: UTask,
      },
      props: {
        default: true,
        right: true,
      },
    },
    {
      path: '/lists/:listId/tasks/create',
      components: {
        left: UList,
        default: Main,
        right: UTask,
      },
      props: {
        default: true,
        right: true,
      },
    },
    {
      path: '/lists/:listId',
      components: {
        left: UList,
        default: Main,
      },
      props: {
        default: true,
      },
    },
    {
      path: '/',
      components: {
        left: UList,
        default: Main,
      },
      props: {
        default: true,
      },
    },
    {
      path: '/organizations',
      components: {
        left: OrganizationsList,
      },
      props: {
        left: true,
      },
    },
    {
      path: '/organizations/:organizationId',
      components: {
        left: OrganizationsList,
        default: Organization,
      },
      props: {
        left: true,
        default: true,
      },
    },
    {
      path: '/organizations/:organizationId/lists/:listId',
      components: {
        left: OrganizationsList,
        default: OMain,
      },
      props: {
        left: true,
        default: true,
      },
    },
    {
      path: '/organizations/:organizationId/lists/:listId/tasks/:taskId',
      components: {
        left: OrganizationsList,
        default: OMain,
        right: OTask,
      },
      props: {
        left: true,
        default: true,
        right: true,
      },
    },
  ],
});
