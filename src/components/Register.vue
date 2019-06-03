<template>
  <div class="modal">
    <div class="modal-block register">
      <router-link to="/about"
                   tag="div"
                   class="modal-block__close fa fa-times">
      </router-link>
      <div class="modal-block__content">
        <div class="modal-block__title">Попробуйте бесплатно</div>
        <label class="modal-block__label" for="modalFirstName">
          <input v-model="firstName"
                 type="text"
                 id="modalFirstName"
                 class="modal-block__input"
                 placeholder="First Name">
        </label>
        <label class="modal-block__label" for="modalLastName">
          <input v-model="lastName"
                 type="text"
                 id="modalLastName"
                 class="modal-block__input"
                 placeholder="Last Name">
        </label>
        <label class="modal-block__label" for="modalUsername">
          <input v-model="username"
                 type="text"
                 id="modalUsername"
                 class="modal-block__input"
                 placeholder="Username">
        </label>
        <label class="modal-block__label" for="modalEmail">
          <input v-model="email"
                 type="email"
                 id="modalEmail"
                 class="modal-block__input"
                 placeholder="your-email@example.com">
        </label>
        <label class="modal-block__label" for="modalPassword">
          <input v-model="password"
                 type="password"
                 id="modalPassword"
                 class="modal-block__input"
                 placeholder="Password">
        </label>
        <div v-on:click="register" class="modal-block__btn">Создать аккаунт</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Register',
  data() {
    return {
      email: this.$route.query.email,
      username: '',
      password: '',
      lastName: '',
      firstName: '',
    };
  },
  methods: {
    async register() {
      try {
        await Vue.API.register({
          username: this.username,
          password: this.password,
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
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
