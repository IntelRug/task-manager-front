/* eslint-disable no-param-reassign */
import './css/modal.scss';
import DeleteListDialog from './DeleteListDialog.vue';
import DeleteTaskDialog from './DeleteTaskDialog.vue';


export default {
  install(Vue, opts) {
    // Mount root Vue instance on new div element added to body

    // Make the root instance available in all components
    Vue.prototype.$confirm = (type, options) => new Promise((resolve) => {
      if (type === 'delete-list') {
        const root = new Vue({
          data: { id: options.id, lists: options.lists },
          render: createElement => createElement(DeleteListDialog),
        });
        root.$mount(document.body.appendChild(document.createElement('div')));
        root.$on('positive', (moveTo) => {
          root.$destroy();
          root.$off();
          root.$el.remove();
          resolve({
            positive: true,
            moveTo,
          });
        });
        root.$on('negative', () => {
          root.$destroy();
          root.$off();
          root.$el.remove();
          resolve({
            positive: false,
          });
        });
      }
      if (type === 'delete-task') {
        const root = new Vue({
          data: { task: options.task },
          render: createElement => createElement(DeleteTaskDialog),
        });
        root.$mount(document.body.appendChild(document.createElement('div')));
        root.$on('positive', () => {
          root.$destroy();
          root.$off();
          root.$el.remove();
          resolve({
            positive: true,
          });
        });
        root.$on('negative', () => {
          root.$destroy();
          root.$off();
          root.$el.remove();
          resolve({
            positive: false,
          });
        });
      }
    });
  },
};
