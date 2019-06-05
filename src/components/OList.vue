<template>
  <div class="main-page__menu main-page__menu_left open1">
    <div class="left-menu__block">
      <div class="left-menu__block-header material-block">
        <span
          class="left-menu__block-header__text hidden-text no-select">Создать новую
          организацию</span> <i
        class="fas fa-plus"></i>
      </div>
      <ul class="left-menu__block-items">
        <li v-for="o in organizations"
            :key="o.id"
            class="left-menu__block-item"
            :class="{'select-org': organizationId() === o.id}">
          <div class="left-menu__block-item__content">
            <router-link :to="`/organizations/${o.id}`"
                         tag="span"
                         class="left-menu__block-item__text hidden-text">
              {{o.name}}
            </router-link>
            <span class="left-menu__block-item__icons">
              <i class="fas fa-trash"></i>
            </span>
          </div>
          <div v-if="organizationId() === o.id" class="left-menu__block-item__lists">
            <div class="left-menu__block-item__list-create"
                 v-on:click="$store.dispatch('CREATE_ORGANIZATION_LIST')">
              <div class="left-menu__block-item__list-text">Создать новый список</div>
              <div class="left-menu__block-item__list-icons">
                <i class="fas fa-plus"></i>
              </div>
            </div>
            <div v-for="list in organizationLists"
                 :key="list.id"
                 class="left-menu__block-item__list"
                 :class="{select: listId() === list.id}">
              <router-link :to="`/organizations/${organizationId()}/lists/${list.id}`"
                           tag="span"
                           v-if="renamingId !== list.id"
                           class="left-menu__block-item__list-text">
                {{list.name}}
              </router-link>
              <input v-if="renamingId === list.id"
                     type="text"
                     class="left-menu__block-item__input"
                     v-model="renamingText">
              <div v-if="!list.settings.default" class="left-menu__block-item__list-icons">
                <i v-if="renamingId === -1"
                   class="fas fa-pencil-alt"
                   v-on:click="renameList(list.id)"></i>
                <i v-if="renamingId === -1"
                   class="fas fa-trash"
                   v-on:click="removeList(list.id)"></i>
                <i v-if="renamingId === list.id"
                   class="fas fa-check edit-icon"
                   v-on:click="doneEditList(list.id)"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="left-menu__btn">
      <router-link to="/"
                   tag="div"
                   class="left-menu__btn-column">
        <i class="fas fa-user-tie"></i>
      </router-link>
      <router-link to="/organizations"
                   tag="div"
                   class="left-menu__btn-column active">
        <i class="fas fa-users"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { paramInt } from '../lib/RouterHelper';

export default {
  name: 'OrganizationsList',
  data() {
    return {
      renamingId: -1,
      renamingText: '',
    };
  },
  async beforeRouteUpdate(to, from, next) {
    await this.$store.dispatch('GET_ORGANIZATION_LISTS', this.organizationId(to.params));
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch('GET_ORGANIZATION_LISTS', this.organizationId(to.params));
    next();
  },
  computed: {
    ...mapGetters(['organizations', 'organizationLists', 'organizationList']),
    organizationId() {
      return paramInt('organizationId', this.$route.params);
    },
    listId() {
      return paramInt('listId', this.$route.params);
    },
  },
  async created() {
    await this.$store.dispatch('GET_ORGANIZATIONS');
    if (this.organizationId() !== -1) {
      await this.$store.dispatch('GET_ORGANIZATION_LISTS', this.organizationId());
    } else if (this.organizations.length > 0) {
      this.$router.replace(`/organizations/${this.organizations[0].id}`);
    }
  },
  methods: {
    async removeList(id) {
      const { positive, moveTo } = await this.$confirm('delete-list', {
        id,
        lists: this.organizationLists,
      });
      if (positive) {
        await this.$store.dispatch('REMOVE_ORGANIZATION_LIST', {
          organizationId: this.organizationId(),
          listId: id,
          moveTo,
        });
        if (id === this.listId()) {
          const url = this.organizationLists.length > 0
            ? `/organizations/${this.organizationId()}/lists/${this.organizationLists[0].id}`
            : `/organizations/${this.organizationId()}/lists`;
          this.$router.replace(url);
        }
      }
    },
    async renameList(id) {
      this.renamingId = id;
      this.renamingText = this.organizationList(id).name;
    },
    async doneEditList(id) {
      this.renamingId = -1;
      const options = {
        name: this.renamingText,
      };
      this.$store.dispatch('EDIT_ORGANIZATION_LIST', {
        listId: id,
        organizationId: this.organizationId(),
        options,
      });
    },
  },
};
</script>

<style scoped>

</style>
