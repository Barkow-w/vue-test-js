<script setup>
import { ref, computed } from 'vue';

const showTime = ref(false)
const dateActive = ref(null)
const timeActive = ref(null)

const currentDate = ref(new Date())
const recordTime = ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const startDate = computed(() => {
  const start = new Date(currentDate.value)
  const dayWeek = start.getDay()
  start.setDate(start.getDate() - dayWeek)
  return start
});

const endDate = computed(() => {
  const end = new Date(startDate.value)
  end.setDate(end.getDate() + 13)
  return end
});

const displayedDates = computed(() => {
  const datesArray = []
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate.value)
    date.setDate(date.getDate() + i)
    datesArray.push(date)
  }
  return datesArray
});

const prev = () => {
  currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() - 14))
  showTime.value = false
};

const next = () => {
  currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + 14))
  showTime.value = false
};

const formatDate = (date) => {
  return date.toLocaleDateString('default', { month: 'long', day: 'numeric' })
};

const dateActiveItem = (index) => {
  dateActive.value = index
  showTime.value = true
}

const timeActiveItem = (item) => {
  timeActive.value = item
}
</script>

<template>
  <div class="record">
    <div class="record__title">
      Запись в салон
    </div>
    <div class="record__slider">
      <div class="record__slider__btn" @click="prev">
        <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
              fill="#0F0F0F"/>
        </svg>
      </div>
      <div class="record__slider__month">
        {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
      </div>
      <div class="record__slider__btn" @click="next">
        <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
              fill="#0F0F0F"/>
        </svg>
      </div>
    </div>
    <div class="record__days">
      <div class="record__days__day" :class="{'record__days__day--active' : dateActive === index}"
           v-for="(date, index) in displayedDates" :key="index" @click="dateActiveItem(index)">
        {{ date.getDate() }}
      </div>
    </div>
  </div>
  <div class="time" v-if="showTime">
    <div class="time__title">
      Время записи
    </div>
    <div class="time__list">
      <div class="time__list__item" :class="{'time__list__item--active' : timeActive === item}"
           v-for="item in recordTime" :key="item" @click="timeActiveItem(item)">
        {{item}}
      </div>
    </div>
    <button class="time__btn">
      Записаться
    </button>
  </div>
</template>

<style scoped lang="scss">
.record {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  &__title {
    font-size: 32px;
    line-height: 36px;
    font-weight: 500;
  }

  &__slider {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 22px;

    &__month {
      font-size: 24px;
      line-height: 28px;
    }

    &__btn {
      display: flex;
      align-items: center;
      max-width: 20px;
      padding: 4px 8px;
      text-align: center;
      border: 1px solid #a9a8a8;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: #7e96dd;

        svg {
          path[stroke] {
            stroke: #f0ebeb;
          }

          path[fill] {
            fill: #f0ebeb;
          }

        }
      }


    }
  }

  &__days {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    max-width: 425px;

    &__day {
      min-width: 30px;
      padding: 4px 8px;
      font-size: 24px;
      line-height: 28px;
      border: 1px solid #a9a8a8;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;

      &:hover {
        border: 1px solid #5f77c5;
        background-color: #7e96dd;
        color: #f0ebeb;
      }

      &--active {
        border: 1px solid #5f77c5;
        background-color: #7e96dd;
        color: #f0ebeb;
      }
    }
  }
}

.time {
  text-align: center;
  margin-top: 16px;
  padding-top: 8px;
  border-top: 1px solid #d7d0d0;

  &__title {
    font-size: 22px;
    line-height: 20px;
    font-weight: 500;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;

    &__item {
      min-width: 30px;
      padding: 4px 8px;
      font-size: 24px;
      line-height: 28px;
      border: 1px solid #a9a8a8;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;

      &:hover {
        border: 1px solid #5f77c5;
        background-color: #7e96dd;
        color: #f0ebeb;
      }

      &--active {
        border: 1px solid #5f77c5;
        background-color: #7e96dd;
        color: #f0ebeb;
      }
    }
  }

  &__btn {
    margin-top: 24px;
    cursor: pointer;
  }
}
</style>