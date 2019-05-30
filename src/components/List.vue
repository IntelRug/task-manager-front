<template>
  <div class="main-page__menu main-page__menu_left">
    <div class="left-menu__block">
      <div class="left-menu__block-header material-block"
           v-on:click="$store.dispatch('CREATE_LIST')">
        <span class="left-menu__block-header__text hidden-text no-select">
          Создать новый список
        </span>
        <i class="fas fa-plus"></i>
      </div>
      <ul class="left-menu__block-items">
        <li v-for="list in lists"
            :key="list.id"
            class="left-menu__block-item"
            :class="{edit: renamingId !== -1}">
          <input v-if="renamingId === list.id"
                 v-model="renamingText"
                 type="text"
                 class="left-menu__block-item__input">
          <router-link v-else
                :to="`/lists/${list.id}`"
                tag="span"
                class="left-menu__block-item__text hidden-text no-select">
            {{list.name}}
          </router-link>
          <span class="left-menu__block-item__icons">
            <i v-if="renamingId === -1"
               class="fas fa-pencil-alt"
               v-on:click="renameList(list.id)"></i>
            <i v-if="renamingId === -1"
               class="fas fa-trash"
               v-on:click="removeList(list.id)"></i>
            <i v-if="renamingId === list.id"
               class="fas fa-check edit-icon"
               v-on:click="doneEditList(list.id)"></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="left-menu__btn">
      <div class="left-menu__btn-column active"><i class="fas fa-user-tie"></i></div>
      <div class="left-menu__btn-column"><i class="fas fa-users"></i></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { paramInt } from '../lib/RouterHelper';

export default {
  name: 'List',
  data() {
    return {
      renamingId: -1,
      renamingText: '',
    };
  },
  created() {
    this.$store.dispatch('GET_LISTS');
  },
  computed: {
    ...mapGetters(['lists', 'list']),
    listId() {
      return paramInt('listId', this.$route.params);
    },
  },
  methods: {
    async removeList(id) {
      const { positive, moveTo } = await this.$confirm(id, this.lists);
      if (positive) {
        await this.$store.dispatch('REMOVE_LIST', { id, moveTo });
        if (id === this.listId()) {
          const url = this.lists.length > 0 ? `/lists/${this.lists[0].id}` : '/lists';
          this.$router.replace(url);
        }
      }
    },
    async renameList(id) {
      this.renamingId = id;
      this.renamingText = this.list(id).name;
    },
    async doneEditList(id) {
      this.renamingId = -1;
      const options = {
        name: this.renamingText,
      };
      this.$store.dispatch('EDIT_LIST', { id, options });
    },
  },
};
</script>

<style scoped>

</style>
