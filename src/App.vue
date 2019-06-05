<template>
  <div class="main-content">
    <div class="content-page">
      <div class="content__header-panel">
        <div class="content__header-container">
          <a href="/about" class="header-panel__logo">
            <img src="/img/smarttask_logo-white1.png" alt="logo">
          </a>
<!--          <div class="header-panel__user no-select">-->
<!--            <div class="header-panel__user-name">{{$store.getters.currentUser.username}}</div>-->
<!--            <div class="header-panel__user-img"-->
<!--                 style="background-image: url(/img/avatar.png);"></div>-->
<!--          </div>-->
        </div>
      </div>
      <div class="main-page">
        <router-view name="left"></router-view>
        <router-view></router-view>
        <router-view name="right"></router-view>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
