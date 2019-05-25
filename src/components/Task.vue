<template>
  <div class="main-page__menu main-page__menu_right material-block">
    <div class="control-tasks">
      <div class="control-tasks__header">{{task.name}}</div>
      <div class="control-tasks__buttons no-select">
        <div class="control-tasks__button">Задать дату выполнения</div>
        <div class="control-tasks__button">Добавить подзадачу</div>
        <div class="control-tasks__button">Добавить заметку</div>
        <div class="control-tasks__button">Добавить файл</div>
      </div>
      <div class="control-tasks__comments">
        <div class="control-tasks__comments-title">Комментарии</div>
        <div class="control-tasks__comments-content">
          <div class="control-tasks__comment-item">
            <div class="comment-item__img"
                 style="background: url(/img/office-2.png) no-repeat center / cover;"></div>
            <div class="comment-item__content">
              <div class="comment-item__header">
                <span class="comment-item__header-name hidden-text">Имя отправителя</span>
                <time class="comment-item__header-time">21:42</time>
              </div>
              <div class="comment-item__text">Текст комментария</div>
            </div>
          </div>
          <div class="control-tasks__comment-item">
            <div class="comment-item__img"
                 style="background: url(/img/office-2.png) no-repeat center / cover;"></div>
            <div class="comment-item__content">
              <div class="comment-item__header">
                <span class="comment-item__header-name hidden-text">Имя отправителя</span>
                <time class="comment-item__header-time">21:42</time>
              </div>
              <div class="comment-item__text">Текст комментария</div>
            </div>
          </div>
          <div class="control-tasks__comment-time">создано 4100 часов назад</div>
        </div>
        <div class="control-tasks__comments-footer">
                <textarea name="comment" class="control-tasks__comments-input"
                          placeholder="Добавить комментарии..."></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  computed: {
    taskId() {
      return (/^([1-9]([0-9]+)?)$/).test(this.$route.params.taskId)
        ? parseInt(this.$route.params.taskId, 10) : -1;
    },
    task() {
      return this.$store.getters.task(this.taskId);
    },
  },
  created() {
    this.$store.dispatch('GET_TASK', this.taskId);
  },
};
</script>

<style scoped>

</style>
