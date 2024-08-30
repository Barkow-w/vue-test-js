<script setup>

import WishList from "@/components/project-page/wish-list.vue";
import Calendar from "@/components/project-page/Calendar.vue";
import {ref} from "vue";

const service = ref('wishlist')
</script>

<template>
  <div class="container">
    <div class="container__list">
      <div class="container__list__item"
      :class="{'container__list__item--active' : service === 'wishlist'}"
      @click="service = 'wishlist'">
        Вишлист
      </div>
      <div class="container__list__item"
      :class="{'container__list__item--active' : service === 'calendar'}"
      @click="service = 'calendar'">
        Календарь
      </div>
    </div>
  </div>
  <div>
    <wish-list v-if="service === 'wishlist'"/>
    <calendar v-if="service === 'calendar'"/>

  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  padding-top: 85px;
  &__list {
    display: flex;
    &__item {
      padding: 8px 26px;
      font-size: 32px;
      line-height: 40px;
      border-bottom: 3px solid #7e96dd;
      cursor: pointer;

      &:hover {
        border-bottom: 3px solid #3356ce;
      }

      &--active {
        border-bottom: 3px solid #3356ce;
      }
    }
  }
}
</style>