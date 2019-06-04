<template>
  <div class="main-page__menu main-page__menu_right material-block">
    <div class="control-tasks">
      <div class="control-tasks__header" :class="{edit: nameEdit}">
        <div v-if="!nameEdit" class="control-tasks__header-text">{{name}}</div>
        <input v-if="nameEdit" v-model="name" type="text" class="control-tasks__header-input">
        <div class="control-tasks__header-icon" v-on:click="toggleNameEdit">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-check edit-icon"></i>
        </div>
      </div>
      <div class="control-tasks__buttons no-select">
        <div class="control-tasks__button">
          <div class="control-tasks__button__text">Сроки:</div>
          <div class="control-tasks__button-content">
            <input v-model="deadlineDate" type="date" class="control-tasks__button-input">
            <input v-model="deadlineTime" type="time" class="control-tasks__button-input">
          </div>
        </div>
        <div class="control-tasks__button">
          <div class="control-tasks__button__text">Список:</div>
          <div class="control-tasks__button-content">
            <select v-model="listIndex" class="control-tasks__button-input">
              <option
                v-for="list in lists"
                :key="list.id"
                :value="list.id"
                :selected="list.id === (task.list_id ? task.list_id : listId())">
                {{list.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="control-tasks__button">
          <div class="control-tasks__button__text">Статус:</div>
          <div class="control-tasks__button-content">
            <select v-model="status" class="control-tasks__button-input">
              <option
                v-for="(text, index) in statuses"
                :key="index"
                :value="index"
                :selected="index === task.status">
                {{text}}
              </option>
            </select>
          </div>
        </div>
        <div class="control-tasks__button">
          <div class="control-tasks__button__text">Описание:</div>
          <textarea class="control-tasks__button-input control-tasks__button-input_textarea"
                    v-model="description">
          </textarea>
        </div>
      </div>
      <div class="control-tasks__checkboxes no-select">
        <div class="control-tasks__checkbox">
          <label for="tImportant" class="control-tasks__checkbox-label">
            <input v-model="important"
                   type="checkbox"
                   id="tImportant"
                   class="control-tasks__checkbox-label__input">
            <span class="control-tasks__checkbox-label__text">важная задача</span>
          </label>
        </div>
      </div>
      <div class="control-tasks__footer-buttons no-select">
        <div class="control-tasks__footer-button primary" v-on:click="save">Сохранить</div>
        <div class="control-tasks__footer-button secondary" v-on:click="init">Отменить</div>
        <div class="control-tasks__footer-button secondary" v-on:click="remove">Удалить</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { paramInt } from '../lib/RouterHelper';

export default {
  name: 'Task',
  data() {
    return {
      statuses: [
        'Новое',
        'В работе',
        'Проверяется',
        'Завершено',
      ],
      name: '',
      nameEdit: false,
      deadlineDate: '',
      deadlineTime: '',
      description: '',
      listIndex: 0,
      status: 0,
      important: 0,
    };
  },
  async beforeRouteUpdate(to, from, next) {
    await this.preload(to.params);
    next();
    this.init();
  },
  computed: {
    ...mapGetters(['users', 'user', 'lists', 'list', 'tasks']),
    taskId() {
      return paramInt('taskId', this.$route.params);
    },
    listId() {
      return paramInt('listId', this.$route.params);
    },
    task() {
      return this.$store.getters.task(this.taskId());
    },
    deadlineAt() {
      return Date.parse(`${this.deadlineDate} ${this.deadlineTime}`);
    },
    currentDate() {
      return (time) => {
        const match = this.localISOTime(time).match(/(.*)T(.*):/);
        return match[1];
      };
    },
    currentTime() {
      return (time) => {
        const match = this.localISOTime(time).match(/(.*)T(.*):/);
        return match[2];
      };
    },
    localISOTime() {
      return (time) => {
        const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
        const date = new Date((time || Date.now()) - timeZoneOffset);
        return date.toISOString();
      };
    },
  },
  async created() {
    await this.preload();
    this.init();
  },
  methods: {
    async preload(params = this.$route.params) {
      this.deadlineDate = this.currentDate();
      this.deadlineTime = this.currentTime();
      if (this.taskId(params) === -1) return;
      const load = [
        this.$store.dispatch('GET_TASK', this.taskId(params)),
        this.$store.dispatch('GET_LISTS'),
        this.$store.dispatch('GET_USERS'),
      ];
      if (!this.tasks.find(({ id }) => id == this.taskId(params))) {
        await Promise.all(load);
      }
    },
    async init() {
      this.name = this.task.name;
      if (this.task.deadline_at) {
        this.deadlineDate = this.currentDate(this.task.deadline_at);
        this.deadlineTime = this.currentTime(this.task.deadline_at);
      }
      this.description = this.task.description;
      this.listIndex = this.task.list_id ? this.task.list_id : this.listId();
      this.status = this.task.status;
      this.important = this.task.important;
    },
    toggleNameEdit() {
      this.nameEdit = !this.nameEdit;
    },
    async save() {
      if (this.task.id !== -1) {
        let lastIdDiffers = false;
        const options = {};
        if (this.name !== this.task.name)options.name = this.name;
        if (this.description !== this.task.description) options.description = this.description;
        if (this.status !== this.task.status) options.status = this.status;
        if (this.listIndex !== this.task.list_id) {
          options.list_id = this.listIndex;
          lastIdDiffers = true;
        }
        if (this.deadlineAt !== this.task.deadline_at) options.deadline_at = this.deadlineAt;
        if (this.important !== this.task.important) options.important = this.important ? 1 : 0;
        await Promise.all([
          this.$store.dispatch('EDIT_TASK', { id: this.task.id, options }),
        ]);
        if (lastIdDiffers) {
          this.$router.replace(`/lists/${options.list_id}/tasks/${this.task.id}`);
        }
      } else {
        const options = {
          name: this.name,
          description: this.description,
          status: this.status,
          list_id: this.listIndex,
          deadline_at: this.deadlineAt,
          important: this.important ? 1 : 0,
        };
        const task = await this.$store.dispatch('CREATE_TASK', options);
        this.$router.replace(`/lists/${task.list_id}/tasks/${task.id}`);
      }
    },
    async remove() {
      const { positive } = await this.$confirm('delete-task', { task: this.task });
      if (positive) {
        let redirectUrl = `/lists/${this.listId()}`;
        if (this.tasks.length > 0) {
          const id = this.tasks.findIndex(t => t.id === this.task.id);
          if (id !== -1) {
            if (this.tasks[id + 1]) {
              redirectUrl = `/lists/${this.listId()}/tasks/${this.tasks[id + 1].id}`;
            } else {
              redirectUrl = `/lists/${this.listId()}/tasks/${this.tasks[id - 1].id}`;
            }
          }
        }
        this.$router.replace(redirectUrl);
        this.$store.dispatch('REMOVE_TASK', this.task.id);
      }
    },
  },
};
</script>

<style scoped>

</style>
