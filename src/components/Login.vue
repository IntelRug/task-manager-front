<template>
  <div class="modal">
    <div class="modal-block login">
      <router-link to="/about"
                   tag="div"
                   class="modal-block__close fa fa-times">
      </router-link>
      <div class="modal-block__content">
        <div class="modal-block__title">Авторизация</div>
        <label class="modal-block__label" for="modalEmail">
          <input v-model="credentials.username"
                 type="text"
                 id="modalEmail"
                 class="modal-block__input"
                 placeholder="Email or username">
        </label>
        <label class="modal-block__label" for="modalPassword">
          <input v-model="credentials.password"
                 type="password"
                 id="modalPassword"
                 class="modal-block__input"
                 placeholder="Password">
        </label>
        <div class="modal-block__btn" v-on:click="login">Войти</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    };
  },
  created() {
    if (Vue.API.isLoggedIn()) {
      this.$router.replace('/');
      Vue.API.goToMainURL();
    }
  },
  methods: {
    async login() {
      try {
        await Vue.API.login({
          username: this.credentials.username,
          password: this.credentials.password,
        });
        window.location.pathname = '/';
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>

</style>
