<template>
  <div>
    <router-view name="modal"></router-view>
    <div class="main-page">
      <div class="main-page__header">
        <div class="header-logo"></div>
        <div class="header-buttons">
          <router-link to="/about/signin"
                       tag="div"
                       class="header-btn header-btn_login">Вход
          </router-link>
          <router-link to="/about/signup"
                       tag="div"
                       class="header-btn header-btn_register">Регистрация
          </router-link>
        </div>
      </div>
      <header>
        <div class="header-block">
          <h1 class="h1">Оптимизируйте работу с помощью SmartTask</h1>
          <h2 class="h2">
            Сервис для совместной работы и управления проектами,
            который подойдет для компаний любого размера и отрасли.
          </h2>
          <div class="header-block__form">
            <input v-model="email"
                   type="email"
                   class="header-block__form-input"
                   placeholder="Введите адрес эл. почты">
            <router-link :to="{ path: '/about/signup', query: { email: email }}"
                         tag="div"
                         class="header-block__form-btn no-select">Начните бесплатно
            </router-link>
          </div>
        </div>
      </header>
      <section class="organization">
        <img src="img/Image1.png" alt="image1" class="section-img">
        <div class="section-about">
          <h3 class="h3">Сотрудничайте со всеми</h3>
          <p class="section-text">
            Используйте как для личного пользования, так и для работы.
          </p>
        </div>
      </section>
      <section class="share">
        <div class="section-about">
          <h3 class="h3">Продуманный список задач</h3>
          <p class="section-text">
              Мало говорить о том, что работа должна быть наглядной, — мы сделали ее такой.
              Списки задач стали чище и информативнее.
          </p>
        </div>
        <img src="img/Image4.png" alt="image2" class="section-img">
      </section>
      <section class="features">
        <div class="section-about">
          <h3 class="h3">Особенности</h3>
          <ul class="features-list">
            <li class="features-item">
              <div class="features-item__img"
                   style="background-image: url('/img/AI_favorite.png');"></div>
              <div class="features-item__title">Папки</div>
              <div class="features-item__text">Группируйте связанные между собой списки в легко
                доступные папки
              </div>
            </li>
            <li class="features-item">
              <div class="features-item__img"
                   style="background-image: url('/img/AI_chat.png');"></div>
              <div class="features-item__title">Комментарии</div>
              <div class="features-item__text">Держите все обсуждения в одном и доступном для всех
                месте
              </div>
            </li>
            <li class="features-item">
              <div class="features-item__img"
                   style="background-image: url('/img/AI_user.png');"></div>
              <div class="features-item__title">Общие списки</div>
              <div class="features-item__text">Делитесь своими списками с коллегами, друзьями и
                семьей.
              </div>
            </li>
            <li class="features-item">
              <div class="features-item__img"
                   style="background-image: url('/img/AI_mappointer.png');"></div>
              <div class="features-item__title">Заметки</div>
              <div class="features-item__text">Добавляйте примечания и не упустите ни одну из идей
              </div>
            </li>
            <li class="features-item">
              <div class="features-item__img"
                   style="background-image: url('/img/AI_itinerary.png');"></div>
              <div class="features-item__title">Напоминания</div>
              <div class="features-item__text">Добавляйте напоминания, чтобы ничего не забыть</div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      email: '',
    };
  },
};
</script>

<style scoped>

</style>
