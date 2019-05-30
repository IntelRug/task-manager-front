<template>
  <div class="alert-modal">
    <div class="alert-block">
      <div class="alert-block__header">Удалить список</div>
      <div class="alert-block__content">
        <div>Вы действительно хотите <b>удалить</b> список <b>{{removableList.name}}</b>?</div>
        <label for="moveTasksCheck" class="alert-block__footer-label no-select">
          <input v-model="move"
                 type="checkbox"
                 id="moveTasksCheck"
                 class="alert-block__footer-input">перенести задачи в
          <select v-model="selected" :disabled="!move" name="list" id="listTask">
            <option v-for="list in listsCut" :key="list.id" :value="list.id">{{list.name}}</option>
          </select>
        </label>
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
  name: 'DeleteListDialog',
  data() {
    return {
      move: false,
      selected: -1,
    };
  },
  created() {
    this.selected = this.lists[0].id;
    console.log(this.lists);
    console.log(this.removableListId);
    console.log(this.removableList);
    console.log(this.removableListInArrayId);
  },
  computed: {
    lists() {
      return this.$root.lists;
    },
    listsCut() {
      const lists = this.lists.slice();
      lists.splice(this.removableListInArrayId, 1);
      return lists;
    },
    removableListId() {
      return this.$root.id;
    },
    removableList() {
      return this.lists[this.removableListInArrayId];
    },
    removableListInArrayId() {
      return this.lists.findIndex(({ id }) => id === this.removableListId);
    },
  },
  methods: {
    positive() {
      this.$root.$emit('positive', this.move ? this.selected : -1);
    },
    negative() {
      this.$root.$emit('negative');
    },
  },
};
</script>

<style scoped>

</style>
