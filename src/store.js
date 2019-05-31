import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    tasks: [],
    users: [],
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
  },
  mutations: {
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
    REMOVE_LIST(state, id) {
      Vue.set(state, 'lists', state.lists || []);
      const index = state.lists.findIndex(l => l.id === id);
      if (index !== -1) {
        state.lists.splice(index, 1);
      }
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
    async SET_TASK_EXECUTORS({ dispatch }, { id, ids = '' }) {
      try {
        await Vue.API.post(`tasks/${id}/executors`, {
          user_ids: ids,
        });
        dispatch('GET_TASK', id);
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
  },
});
