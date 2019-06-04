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
              <div class="new-members__form-dropdown no-select hidden-block">
                <div class="new-members__form-dropdown__item-text">Нет результатов</div>
                <div class="new-members__form-dropdown__item">
                  <div class="new-members__form-dropdown__item-img"
                       style="background-image: url(/img/avatar.png);"></div>
                  <div class="new-members__form-dropdown__item-info">
                    <div class="new-members__form-dropdown__item-name">Святослав Федоров</div>
                    <div class="new-members__form-dropdown__item-nick">@IntelRug</div>
                  </div>
                </div>
                <div class="new-members__form-dropdown__item">
                  <div class="new-members__form-dropdown__item-img"
                       style="background-image: url(/img/avatar.png);"></div>
                  <div class="new-members__form-dropdown__item-info">
                    <div class="new-members__form-dropdown__item-name">Артём Дивеев</div>
                    <div class="new-members__form-dropdown__item-nick">@TrenLok</div>
                  </div>
                </div>
              </div>
              <div class="new-members__form-placeholer">Найдите и выберите участников</div>
              <div class="new-members__list-members__item">Святослав Федоров <span
                class="new-members__list-members__item-del"><i class="fas fa-times"></i></span>
              </div>
              <div class="new-members__list-members__item">TrenLok <span
                class="new-members__list-members__item-del"><i class="fas fa-times"></i></span>
              </div>
            </div>
          </div>
          <div class="new-members__group">
            <div class="new-members__group-title">Выберите роль</div>
            <div class="new-members__select-role new-members__form">
              <div class="new-members__form-dropdown no-select hidden-block">
                <div class="new-members__form-dropdown__item">
                  Роль 1
                </div>
                <div class="new-members__form-dropdown__item">
                  Роль 2
                </div>
              </div>
              <div class="new-members__form-placeholer">Guests</div>
            </div>
          </div>
          <div class="new-members__group">
            <div class="new-members__footer-buttons">
              <div class="new-members__footer-button primary">Добавить в проект</div>
            </div>
          </div>
        </div>
        <div class="organization-page__body-title__small">Существующие участники</div>
        <div class="organization-page__existing-members">
          <div class="organization-page__existing-member">
            <div class="organization-page__existing-img"
                 style="background-image: url(/img/avatar.png);"></div>
            <div class="organization-page__existing-info">
              <div class="organization-page__existing-name">Артём Дивеев</div>
              <div class="organization-page__existing-nick">@TrenLok</div>
            </div>
          </div>
          <div class="organization-page__existing-member">
            <div class="organization-page__existing-img"
                 style="background-image: url(img/avatar.png);"></div>
            <div class="organization-page__existing-left">
              <div class="organization-page__existing-info">
                <div class="organization-page__existing-name">Святослав Федоров</div>
                <div class="organization-page__existing-nick">@IntelRug</div>
              </div>
              <div class="organization-page__existing-control no-select">
                <div class="new-members__group">
                  <div class="new-members__list-members new-members__form">
                    <div class="new-members__form-dropdown no-select hidden-block">
                      <div class="new-members__form-dropdown__item">
                        Роль 1
                      </div>
                      <div class="new-members__form-dropdown__item">
                        Роль 2
                      </div>
                    </div>
                    <div class="new-members__form-placeholer">Guests</div>
                  </div>
                </div>
                <div class="organization-page__existing-del"><i class="fas fa-trash-alt"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paramInt } from '../lib/RouterHelper';

export default {
  name: 'Organization',
  data() {
    return {

    };
  },
  created() {

  },
  computed: {
    organizationId() {
      return paramInt('organizationId', this.$route.params);
    },
    organization() {
      return this.$store.getters.organization(this.organizationId());
    },
  },
};
</script>

<style scoped>

</style>
