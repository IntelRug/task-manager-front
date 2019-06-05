import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    organizationLists: [],
    tasks: [],
    organizationTasks: [],
    users: [],
    organizations: [],
    organizationMembers: [],
    currentUserId: -1,
  },
  getters: {
    tasks(state) {
      Vue.set(state, 'tasks', state.tasks || []);
      return state.tasks;
    },
    task(state) {
      return (id) => {
        if (!state.tasks || !Array.isArray(state.tasks)) {
          return {};
        }
        const task = state.tasks.find(t => t.id === id);
        if (!task) {
          return {
            id: -1,
            name: 'Новая задача',
            description: 'Описание задачи',
            status: 0,
            list_id: state.tasks[0] ? state.tasks[0].list_id : 0,
            executors: [],
          };
        }
        return task;
      };
    },
    lists(state) {
      Vue.set(state, 'lists', state.lists || []);
      return state.lists;
    },
    list(state) {
      return (id) => {
        if (!state.lists || !Array.isArray(state.lists)) {
          return {};
        }
        const list = state.lists.find(t => t.id === id);
        if (!list) return {};
        return list;
      };
    },
    users(state) {
      Vue.set(state, 'users', state.users || []);
      return state.users;
    },
    user(state) {
      return (id) => {
        if (!state.users || !Array.isArray(state.users)) {
          return {};
        }
        const user = state.users.find(u => u.id === id);
        if (!user) return {};
        return user;
      };
    },
    currentUser(state) {
      if (!state.organizationMembers || !Array.isArray(state.organizationMembers)) {
        return {};
      }
      const user = state.organizationMembers.find(u => u.id === state.currentUserId);
      if (!user) return {};
      return user;
    },
    organizations(state) {
      Vue.set(state, 'organizations', state.organizations || []);
      return state.organizations;
    },
    organization(state) {
      return (id) => {
        if (!state.organizations || !Array.isArray(state.organizations)) {
          return {};
        }
        const organization = state.organizations.find(o => o.id === id);
        if (!organization) return {};
        return organization;
      };
    },
    organizationLists(state) {
      Vue.set(state, 'organizationLists', state.organizationLists || []);
      return state.organizationLists;
    },
    organizationList(state) {
      return (id) => {
        if (!state.organizationLists || !Array.isArray(state.organizationLists)) {
          return {};
        }
        const organizationList = state.organizationLists.find(l => l.id === id);
        if (!organizationList) return {};
        return organizationList;
      };
    },
    organizationTasks(state) {
      Vue.set(state, 'organizationTasks', state.organizationTasks || []);
      return state.organizationTasks;
    },
    organizationTask(state) {
      return (id) => {
        if (!state.organizationTasks || !Array.isArray(state.organizationTasks)) {
          return {};
        }
        const organizationTask = state.organizationTasks.find(t => t.id === id);
        if (!organizationTask) {
          return {
            id: -1,
            name: 'Новая задача',
            description: 'Описание задачи',
            status: 0,
            list_id: state.tasks[0] ? state.tasks[0].list_id : 0,
            executors: [],
          };
        }
        return organizationTask;
      };
    },
    organizationMembers(state) {
      Vue.set(state, 'organizationMembers', state.organizationMembers || []);
      return state.organizationMembers;
    },
    organizationMember(state) {
      return (id) => {
        if (!state.organizationMembers || !Array.isArray(state.organizationMembers)) {
          return {};
        }
        const organizationMember = state.organizationMembers.find(u => u.id === id);
        if (!organizationMember) return {};
        return organizationMember;
      };
    },
  },
  mutations: {
    SET_CURRENT_USER_ID(state, userId) {
      Vue.set(state, 'currentUserId', parseInt(userId, 10));
    },
    SET_TASKS(state, tasks = []) {
      Vue.set(state, 'tasks', tasks);
    },
    ADD_TASKS(state, tasks) {
      if (!tasks || !Array.isArray(tasks)) return;
      Vue.set(state, 'tasks', state.tasks || []);
      tasks.forEach((task) => {
        const tId = state.tasks.findIndex(({ id }) => (id === task.id));

        if (tId !== -1) {
          Vue.set(state.tasks, tId, task);
        } else {
          state.tasks.push(task);
        }
      });
    },
    REMOVE_TASK(state, id) {
      Vue.set(state, 'tasks', state.tasks || []);
      const index = state.tasks.findIndex(l => l.id === id);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
    SET_LISTS(state, lists = []) {
      Vue.set(state, 'lists', lists);
    },
    ADD_LISTS(state, lists) {
      if (!lists || !Array.isArray(lists)) return;
      Vue.set(state, 'lists', state.lists || []);
      lists.forEach((list) => {
        const tId = state.lists.findIndex(({ id }) => (id === list.id));

        if (tId !== -1) {
          Vue.set(state.lists, tId, list);
        } else {
          state.lists.push(list);
        }
      });
    },
    REMOVE_LIST(state, id) {
      Vue.set(state, 'lists', state.lists || []);
      const index = state.lists.findIndex(l => l.id === id);
      if (index !== -1) {
        state.lists.splice(index, 1);
      }
    },
    SET_USERS(state, users = []) {
      Vue.set(state, 'users', users);
    },
    ADD_USERS(state, users) {
      if (!users || !Array.isArray(users)) return;
      Vue.set(state, 'users', state.users || []);
      users.forEach((user) => {
        const uId = state.users.findIndex(({ id }) => (id === user.id));

        if (uId !== -1) {
          Vue.set(state.users, uId, user);
        } else {
          state.lists.push(user);
        }
      });
    },
    SET_ORGANIZATIONS(state, organizations = []) {
      Vue.set(state, 'organizations', organizations);
    },
    SET_ORGANIZATION_TASKS(state, organizationTasks = []) {
      Vue.set(state, 'organizationTasks', organizationTasks);
    },
    ADD_ORGANIZATION_TASKS(state, organizationTasks) {
      if (!organizationTasks || !Array.isArray(organizationTasks)) return;
      Vue.set(state, 'organizationTasks', state.organizationTasks || []);
      organizationTasks.forEach((task) => {
        const tId = state.organizationTasks.findIndex(({ id }) => (id === task.id));

        if (tId !== -1) {
          Vue.set(state.organizationTasks, tId, task);
        } else {
          state.organizationTasks.push(task);
        }
      });
    },
    REMOVE_ORGANIZATION_TASK(state, id) {
      Vue.set(state, 'organizationTasks', state.organizationTasks || []);
      const index = state.organizationTasks.findIndex(t => t.id === id);
      if (index !== -1) {
        state.organizationTasks.splice(index, 1);
      }
    },
    SET_ORGANIZATION_LISTS(state, organizationLists = []) {
      Vue.set(state, 'organizationLists', organizationLists);
    },
    ADD_ORGANIZATION_LISTS(state, organizationLists) {
      if (!organizationLists || !Array.isArray(organizationLists)) return;
      Vue.set(state, 'organizationLists', state.organizationLists || []);
      organizationLists.forEach((list) => {
        const lId = state.organizationLists.findIndex(({ id }) => (id === list.id));

        if (lId !== -1) {
          Vue.set(state.organizationLists, lId, list);
        } else {
          state.organizationLists.push(list);
        }
      });
    },
    REMOVE_ORGANIZATION_LIST(state, id) {
      Vue.set(state, 'organizationLists', state.organizationLists || []);
      const index = state.organizationLists.findIndex(l => l.id === id);
      if (index !== -1) {
        state.organizationLists.splice(index, 1);
      }
    },
    SET_ORGANIZATION_MEMBERS(state, organizationMembers = []) {
      Vue.set(state, 'organizationMembers', organizationMembers);
    },
    ADD_ORGANIZATION_MEMBERS(state, organizationMembers) {
      if (!organizationMembers || !Array.isArray(organizationMembers)) return;
      Vue.set(state, 'organizationMembers', state.organizationMembers || []);
      organizationMembers.forEach((user) => {
        const uId = state.organizationMembers.findIndex(({ id }) => (id === user.id));

        if (uId !== -1) {
          Vue.set(state.organizationMembers, uId, user);
        } else {
          state.organizationMembers.push(user);
        }
      });
    },
  },
  actions: {
    async GET_TASKS({ commit }, options) {
      try {
        const { data } = await Vue.API.get('tasks', options);
        commit('SET_TASKS', data.tasks);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_TASK({ commit }, id) {
      try {
        const { data } = await Vue.API.get(`tasks/${id}`);
        commit('ADD_TASKS', [data.task]);
      } catch (e) {
        console.log(e);
      }
    },
    async CREATE_TASK({ commit }, options = {}) {
      try {
        const { data } = await Vue.API.post('tasks', options);
        commit('ADD_TASKS', [data.task]);
        return data.task;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    async REMOVE_TASK({ commit }, id) {
      try {
        await Vue.API.delete(`tasks/${id}`);
        commit('REMOVE_TASK', id);
      } catch (e) {
        console.log(e);
      }
    },
    async EDIT_TASK({ commit }, { id, options = {} }) {
      try {
        const { data } = await Vue.API.put(`tasks/${id}`, options);
        commit('ADD_TASKS', [data.task]);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_LISTS({ commit }) {
      try {
        const { data } = await Vue.API.get('lists');
        commit('SET_LISTS', data.lists);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_LIST({ commit }, id) {
      try {
        const { data } = await Vue.API.get(`lists/${id}`);
        commit('ADD_LISTS', [data.list]);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_DEFAULT_LIST({ commit }, id) {
      try {
        const { data } = await Vue.API.get(`lists/${id}`);
        commit('ADD_LISTS', [data.list]);
      } catch (e) {
        console.log(e);
      }
    },
    async CREATE_LIST({ commit }) {
      try {
        const { data } = await Vue.API.post('lists', {
          name: 'Новый список',
        });
        commit('ADD_LISTS', [data.list]);
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_LIST({ commit }, { id, moveTo }) {
      try {
        const options = moveTo !== -1 ? { move_to: moveTo } : {};
        await Vue.API.delete(`lists/${id}`, options);
        commit('REMOVE_LIST', id);
      } catch (e) {
        console.log(e);
      }
    },
    async EDIT_LIST({ commit }, { id, options = {} }) {
      try {
        const { data } = await Vue.API.put(`lists/${id}`, options);
        commit('ADD_LISTS', [data.list]);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_USERS({ commit }) {
      try {
        const { data } = await Vue.API.get('users');
        commit('SET_USERS', data.users);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_USER({ commit }, id) {
      try {
        const { data } = await Vue.API.get(`users/${id}`);
        commit('ADD_USERS', [data.user]);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_ORGANIZATIONS({ commit }) {
      try {
        const { data } = await Vue.API.get('organizations');
        commit('SET_ORGANIZATIONS', data.organizations);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_ORGANIZATION_TASK({ commit }, { organizationId, taskId }) {
      try {
        const { data } = await Vue.API.get(`organizations/${organizationId}/tasks/${taskId}`);
        commit('ADD_ORGANIZATION_TASKS', [data.task]);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_ORGANIZATION_TASKS({ commit }, { organizationId, options = {} }) {
      try {
        const { data } = await Vue.API.get(`organizations/${organizationId}/tasks`, options);
        commit('SET_ORGANIZATION_TASKS', data.tasks);
      } catch (e) {
        console.log(e);
      }
    },
    async CREATE_ORGANIZATION_TASK({ commit }, { organizationId, options = {} }) {
      try {
        const { data } = await Vue.API.post(`organizations/${organizationId}/tasks`, options);
        commit('ADD_ORGANIZATION_TASKS', [data.task]);
        return data.task;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    async EDIT_ORGANIZATION_TASK({ commit }, { taskId, organizationId, options = {} }) {
      try {
        const { data } = await Vue.API.put(`organizations/${organizationId}/tasks/${taskId}`, options);
        commit('ADD_ORGANIZATION_TASKS', [data.task]);
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_ORGANIZATION_TASK({ commit }, { taskId, organizationId }) {
      try {
        await Vue.API.delete(`organizations/${organizationId}/tasks/${taskId}`);
        commit('REMOVE_ORGANIZATION_TASK', taskId);
      } catch (e) {
        console.log(e);
      }
    },
    async SET_ORGANIZATION_TASK_EXECUTORS({ dispatch }, { taskId, organizationId, ids = '' }) {
      try {
        await Vue.API.post(`organizations/${organizationId}/tasks/${taskId}/executors`, {
          user_ids: ids,
        });
        dispatch('GET_ORGANIZATION_TASK', { organizationId, taskId });
      } catch (e) {
        console.log(e);
      }
    },
    async GET_ORGANIZATION_LISTS({ commit }, organizationId) {
      try {
        const { data } = await Vue.API.get(`organizations/${organizationId}/lists`);
        commit('SET_ORGANIZATION_LISTS', data.lists);
      } catch (e) {
        console.log(e);
      }
    },
    async CREATE_ORGANIZATION_LIST({ commit }, organizationId) {
      try {
        const { data } = await Vue.API.post(`organizations/${organizationId}/lists`, {
          name: 'Новый список',
        });
        commit('ADD_ORGANIZATION_LISTS', [data.list]);
      } catch (e) {
        console.log(e);
      }
    },
    async EDIT_ORGANIZATION_LIST({ commit }, { listId, organizationId, options = {} }) {
      try {
        const { data } = await Vue.API.put(`organizations/${organizationId}/lists/${listId}`, options);
        commit('ADD_ORGANIZATION_LISTS', [data.list]);
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_ORGANIZATION_LIST({ commit }, { listId, organizationId, moveTo }) {
      try {
        const options = moveTo !== -1 ? { move_to: moveTo } : {};
        await Vue.API.delete(`organizations/${organizationId}/lists/${listId}`, options);
        commit('REMOVE_ORGANIZATION_LIST', listId);
      } catch (e) {
        console.log(e);
      }
    },
    async GET_ORGANIZATION_MEMBERS({ commit }, organizationId) {
      try {
        const { data } = await Vue.API.get(`organizations/${organizationId}/members`);
        commit('SET_ORGANIZATION_MEMBERS', data.members);
      } catch (e) {
        console.log(e);
      }
    },
    async SET_ORGANIZATION_MEMBERS_ROLE({ commit }, { organizationId, userIds, roleId }) {
      try {
        const { data } = await Vue.API.put(`organizations/${organizationId}/members/role`, {
          user_ids: userIds,
          role_id: roleId,
        });
        commit('ADD_ORGANIZATION_MEMBERS', data.members);
      } catch (e) {
        console.log(e);
      }
    },
    async ADD_ORGANIZATION_MEMBERS({ commit }, { organizationId, userIds, roleId }) {
      try {
        const { data } = await Vue.API.put(`organizations/${organizationId}/members`, {
          user_ids: userIds,
          role_id: roleId,
        });
        commit('SET_ORGANIZATION_MEMBERS', data.members);
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_ORGANIZATION_MEMBERS({ commit }, { organizationId, userIds }) {
      try {
        const { data } = await Vue.API.delete(`organizations/${organizationId}/members`, {
          user_ids: userIds,
        });
        commit('SET_ORGANIZATION_MEMBERS', data.members);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
