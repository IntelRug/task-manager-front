/* eslint-disable no-param-reassign */
import DeleteListDialog from './DeleteListDialog.vue';

export default {
  install(Vue, opts) {
    // Mount root Vue instance on new div element added to body

    // Make the root instance available in all components
    Vue.prototype.$confirm = (id, lists) => new Promise((resolve) => {
      console.log(lists);
      const root = new Vue({
        data: { id, lists },
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
    });
  },
};
