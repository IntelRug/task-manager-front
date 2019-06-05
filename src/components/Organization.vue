<template>
  <div class="main-page__container">
    <div class="organization-page material-block">
      <div class="organization-page__header">
        <div class="organization-page__header-mobile">
          <div class="organization-page__img" style="background-image: url(/img/avatar.png)"></div>
          <div class="organization-page__info-mobile">
            <div class="organization-page__info-name">{{organization.name}}</div>
            <div class="organization-page__info-status">{{organization.slogan}}</div>
          </div>
        </div>
        <div class="organization-page__info">
          <div class="organization-page__info-name no-mobile">{{organization.name}}</div>
          <div class="organization-page__info-status no-mobile">{{organization.slogan}}</div>
          <div class="organization-page__info-description">{{organization.description}}</div>
        </div>
        <!-- <div class="organization-page__statistics">
          <div class="organization-page__statistics-block">
            <div class="organization-page__statistics-num">24</div>
            <div class="organization-page__statistics-text">Участника</div>
          </div>
          <div class="organization-page__statistics-block">
            <div class="organization-page__statistics-num">31</div>
            <div class="organization-page__statistics-text">Задач</div>
          </div>
          <div class="organization-page__statistics-block">
            <div class="organization-page__statistics-num">12</div>
            <div class="organization-page__statistics-text">чего-то</div>
          </div>
        </div> -->
      </div>
      <div class="organization-page__body">
        <div class="organization-page__body-title">Участники проекта</div>
        <div class="organization-page__body-title__small">Пригласить новых участников</div>
        <div class="organization-page__new-members">
          <div class="new-members__group">
            <div class="new-members__group-title">Выберите участников для приглашения</div>
            <div class="new-members__list-members new-members__form">
              <div v-if="newMembersOpened" class="new-members__form-dropdown no-select">
                <div v-if="potentialMembers.length === 0"
                     class="new-members__form-dropdown__item-text">
                  Нет результатов
                </div>
                <div v-for="u in potentialMembers"
                     :key="u.id"
                     v-on:click="addSelectedUser(u.id)"
                     class="new-members__form-dropdown__item">
                  <div class="new-members__form-dropdown__item-img"
                       style="background-image: url(/img/avatar.png);"></div>
                  <div class="new-members__form-dropdown__item-info">
                    <div class="new-members__form-dropdown__item-name">
                      {{u.first_name}} {{u.last_name}}
                    </div>
                    <div class="new-members__form-dropdown__item-nick">@{{u.username}}</div>
                  </div>
                </div>
              </div>
              <input type="text"
                     class="new-members__form-placeholer"
                     placeholder="Найдите и выберите участников"
                     v-model="searchUsersText"
                     @focus="openNewMembers"
                     @blur="closeNewMembers">
              <div v-for="id in selectedUsersIds"
                   :key="id"
                   class="new-members__list-members__item">
                <span class="new-members__list-members__item-del">
                  {{user(id).first_name}} {{user(id).last_name}}
                  <i class="fas fa-times" v-on:click="removeSelectedUser(id)"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="new-members__group">
            <div class="new-members__group-title">Выберите роль</div>
            <div class="new-members__select-role new-members__form">
              <div v-if="openedRoles" class="new-members__form-dropdown no-select">
                <div v-for="(role, index) in selectRoles"
                     :key="index"
                     v-on:click="selectRole(index + 1)"
                     class="new-members__form-dropdown__item">
                  {{role}}
                </div>
              </div>
              <div v-on:click="toggleRoles" class="new-members__form-placeholer">
                {{roles[selectedRoleId]}}
              </div>
            </div>
          </div>
          <div class="new-members__group">
            <div class="new-members__footer-buttons">
              <div class="new-members__footer-button primary"
                   v-on:click="addSelectedUsersToOrganization">
                Добавить в проект
              </div>
            </div>
          </div>
        </div>
        <div class="organization-page__body-title__small">Существующие участники</div>
        <div class="organization-page__existing-members">
          <div v-for="u in organizationMembers"
               :key="u.id"
               class="organization-page__existing-member">
            <div class="organization-page__existing-img"
                 style="background-image: url(/img/avatar.png);"></div>
            <div class="organization-page__existing-info">
              <div class="organization-page__existing-name">{{u.first_name}} {{u.last_name}}</div>
              <div class="organization-page__existing-nick">@{{u.username}}</div>
            </div>
            <div class="organization-page__existing-control no-select">
              <div class="new-members__group" v-on:click="openRolesOnUser(u.id)">
                <div class="new-members__list-members new-members__form">
                  <div v-if="openedRolesId === u.id"
                       class="new-members__form-dropdown no-select">
                    <div v-for="(role, index) in roles"
                         :key="index"
                         class="new-members__form-dropdown__item"
                         v-on:click="setRole(u.id, index)">
                      {{role}}
                    </div>
                  </div>
                  <div class="new-members__form-placeholer">{{roles[u.settings.role_id]}}</div>
                </div>
              </div>
              <div
                v-if="canAccessUser(u)"
                class="organization-page__existing-del"
                v-on:click="removeUserFromOrganization(u.id)">
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { paramInt } from '../lib/RouterHelper';

export default {
  name: 'Organization',
  data() {
    return {
      chooseNewMembersFocused: false,
      openedRoles: false,
      selectedRoleId: 2,
      openedRolesId: -1,
      roles: [
        'Creator',
        'Moderator',
        'User',
      ],
      selectRoles: [
        'Moderator',
        'User',
      ],
      selectedUsersIds: [],
      searchUsersText: '',
    };
  },
  created() {
    this.$store.dispatch('GET_ORGANIZATION_MEMBERS', this.organizationId());
  },
  computed: {
    ...mapGetters(['users', 'user', 'organizationMember', 'organizationMembers', 'currentUser']),
    organizationId() {
      return paramInt('organizationId', this.$route.params);
    },
    organization() {
      return this.$store.getters.organization(this.organizationId());
    },
    newMembersOpened() {
      return this.chooseNewMembersFocused;
    },
    currentUserRole() {
      return this.currentUser.settings ? this.currentUser.settings.role_id : 2;
    },
    selectedUsersIdsString() {
      return Array.isArray(this.selectedUsersIds) && this.selectedUsersIds.length ? this.selectedUsersIds.join(',') : '';
    },
    potentialMembers() {
      return this.users.filter((user) => {
        const userSelected = this.selectedUsersIds.indexOf(user.id) !== -1;
        const userExist = this.organizationMembers.findIndex(u => u.id === user.id) !== -1;
        const searchText = this.searchUsersText.toLowerCase();
        const username = user.username.toLowerCase();
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const searchContainsUsername = username.search(searchText) !== -1;
        const searchContainsName = fullName.search(searchText) !== -1;
        return !userSelected && !userExist && (
          searchContainsName
          || searchContainsUsername
          || searchText === ''
        );
      });
    },
    canAccessUser() {
      return u => (this.currentUserRole <= 1 && this.currentUser.id)
        && !(this.currentUserRole === 1 && u.settings.role_id === 0)
      && !(this.currentUser.id === u.id);
    },
  },
  methods: {
    openNewMembers() {
      this.$store.dispatch('GET_USERS');
      this.chooseNewMembersFocused = true;
    },
    closeNewMembers() {
      setTimeout(() => {
        this.chooseNewMembersFocused = false;
      }, 300);
    },
    toggleRoles() {
      this.openedRoles = !this.openedRoles;
    },
    selectRole(id) {
      this.selectedRoleId = id;
      this.toggleRoles();
    },
    setRole(userId, roleId) {
      this.$store.dispatch('SET_ORGANIZATION_MEMBERS_ROLE', {
        organizationId: this.organizationId(),
        userIds: userId,
        roleId,
      });
    },
    openRolesOnUser(userId) {
      if (this.canAccessUser(this.organizationMember(userId))) {
        this.openedRolesId = this.openedRolesId === userId ? -1 : userId;
      }
    },
    addSelectedUser(id) {
      this.searchUsersText = '';
      const index = this.selectedUsersIds.indexOf(id);
      if (index === -1) {
        this.selectedUsersIds.push(id);
      }
    },
    removeSelectedUser(id) {
      const index = this.selectedUsersIds.indexOf(id);
      if (index !== -1) {
        this.selectedUsersIds.splice(index, 1);
      }
    },
    async addSelectedUsersToOrganization() {
      await this.$store.dispatch('ADD_ORGANIZATION_MEMBERS', {
        organizationId: this.organizationId(),
        userIds: this.selectedUsersIds.join(','),
        roleId: this.selectedRoleId,
      });
      this.selectedUsersIds = [];
    },
    removeUserFromOrganization(userId) {
      this.$store.dispatch('REMOVE_ORGANIZATION_MEMBERS', {
        organizationId: this.organizationId(),
        userIds: userId,
      });
    },
  },
};
</script>

<style scoped>

</style>
