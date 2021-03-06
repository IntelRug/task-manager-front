<template>
  <div class="main-page__container">
    <div class="main-page__task-list">
      <div class="task-list__header material-block">
        <router-link :to="`/organizations/${organizationId()}/lists/${listId()}/tasks/create`"
                     tag="div"
                     class="task-list__header-create no-select">Создать задачу</router-link>
        <div class="task-list__header-sort no-select"
             v-on:click="toggleSort">
          <span v-html="sortHtmlCurrent"></span>
          <div v-if="sortOpened" class="header-sort__list">
            <div v-for="n in sortHtmlAll.length"
                 :key="n"
                 v-on:click="sortType = n - 1"
                 v-html="sortHtmlAll[n - 1]"
                 class="header-sort__list-item"></div>
          </div>
        </div>
      </div>
      <div class="task-list__content material-block">
        <ul class="task-list__task-items">
          <router-link tag="li" :to="taskLink(task)" v-for="task in sortedTasks" :key="task.id"
                       class="task-list__task-item">
            <div
              class="task-item__favorites no-select">
              <i class="far fa-star" :class="{select: task.important}"></i>
            </div>
            <div class="task-item__name hidden-text">{{task.name}}</div>
            <div :class="taskStatus(task).class"
                 class="task-item__status">
              {{taskStatus(task).text}}
            </div>
            <div class="task-item__author hidden-text">{{taskExecutorsString(task)}}</div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { paramInt } from '../lib/RouterHelper';

export default {
  name: 'Main',
  data() {
    return {
      sortType: 3,
      sortOpened: false,
      sortHtmlAll: [
        '<i class="fas fa-sort-amount-down"></i> По названию',
        '<i class="fas fa-sort-amount-up"></i> По названию',
        '<i class="fas fa-sort-amount-down"></i> По дате добавления',
        '<i class="fas fa-sort-amount-up"></i> По дате добавления',
      ],
    };
  },
  async beforeRouteUpdate(to, from, next) {
    await this.$store.dispatch('GET_ORGANIZATION_TASKS', {
      organizationId: this.organizationId(to.params),
      options: {
        list_id: this.listId(to.params),
      },
    });
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch('GET_ORGANIZATION_TASKS', {
      organizationId: this.organizationId(to.params),
      options: {
        list_id: this.listId(to.params),
      },
    });
    next();
  },
  computed: {
    ...mapGetters(['organizationTasks']),
    listId() {
      return paramInt('listId', this.$route.params);
    },
    organizationId() {
      return paramInt('organizationId', this.$route.params);
    },
    sortedTasks() {
      return this.sort(this.organizationTasks);
    },
    taskStatus() {
      return ({ status }) => {
        const texts = [
          'Новое',
          'В работе',
          'Проверяется',
          'Завершено',
        ];
        return {
          class: {
            new: status === 0,
            inwork: status === 1,
            verifying: status === 2,
            completed: status === 3,
          },
          // eslint-disable-next-line no-nested-ternary
          text: texts[status],
        };
      };
    },
    sortHtmlCurrent() {
      return this.sortHtmlAll[this.sortType];
    },
    taskLink() {
      return ({ id }) => (this.$route.fullPath
      === `/organizations/${this.organizationId()}/lists/${this.listId()}/tasks/${id}`
        ? `/organizations/${this.organizationId()}/lists/${this.listId()}`
        : `/organizations/${this.organizationId()}/lists/${this.listId()}/tasks/${id}`);
    },
    taskExecutorsString() {
      return ({ executors }) => {
        if (Array.isArray(executors) && executors.length > 0) {
          return executors.map(e => `${e.first_name} ${e.last_name}`).join(', ');
        }
        return 'Нет исполнителей';
      };
    },
  },
  methods: {
    sort(tasks = []) {
      let sortedTasks = [];
      switch (this.sortType) {
        case 0:
          sortedTasks = tasks.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
          break;
        case 1:
          sortedTasks = tasks.slice().sort((a, b) => (a.name > b.name ? 1 : -1));
          break;
        case 2:
          sortedTasks = tasks.slice().sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
          break;
        case 3:
          sortedTasks = tasks.slice().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
          break;
        default:
      }
      return sortedTasks;
    },
    toggleSort() {
      this.sortOpened = !this.sortOpened;
    },
  },
  async created() {
    if (this.listId() === -1) {
      this.$router.replace('');
    }
    await this.$store.dispatch('GET_ORGANIZATION_TASKS', {
      organizationId: this.organizationId(),
      options: {
        list_id: this.listId(),
      },
    });
    await this.$nextTick();
    this.sort(this.organizationTasks);
  },
};
</script>

<style scoped>

</style>
