<template>
  <div class="main-content">
    <div class="content-page">
      <div class="content__header-panel"></div>
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
