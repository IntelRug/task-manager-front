<template>
  <div class="alert-modal">
    <div class="alert-block">
      <div class="alert-block__header">Удалить задачу</div>
      <div class="alert-block__content">
        <div>Вы действительно хотите <b>удалить</b> задачу <b>{{removableTask.name}}</b>?</div>
      </div>
      <div class="alert-block__footer">
        <div class="alert-block__footer-btn secondary" v-on:click="negative">Отмена</div>
        <div class="alert-block__footer-btn primary" v-on:click="positive">Удалить</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteTaskDialog',
  data() {
    return {
      move: false,
      selected: -1,
    };
  },
  computed: {
    removableTask() {
      return this.$root.task;
    },
  },
  methods: {
    positive() {
      this.$root.$emit('positive');
    },
    negative() {
      this.$root.$emit('negative');
    },
  },
};
</script>

<style scoped>

</style>
