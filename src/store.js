import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
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
        if (!task) return {};
        return task;
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
  },
  actions: {
    async GET_TASKS({ commit }) {
      try {
        const { data } = await Vue.API.get('tasks');
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
  },
});
