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
          <input type="text"
                 id="modalFirstName"
                 class="modal-block__input"
                 placeholder="First Name">
        </label>
        <label class="modal-block__label" for="modalLastName">
          <input type="text"
                 id="modalLastName"
                 class="modal-block__input"
                 placeholder="Last Name">
        </label>
        <label class="modal-block__label" for="modalEmail">
          <input v-model="email"
                 type="email"
                 id="modalEmail"
                 class="modal-block__input"
                 placeholder="your-email@example.com">
        </label>
        <label class="modal-block__label" for="modalPassword">
          <input type="password"
                 id="modalPassword"
                 class="modal-block__input"
                 placeholder="Password">
        </label>
        <div class="modal-block__btn">Создать аккаунт</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: this.$route.query.email,
    };
  },
};
</script>

<style scoped>

</style>
