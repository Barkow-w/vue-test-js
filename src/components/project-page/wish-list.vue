<script setup>
import {computed, reactive, ref} from "vue";

const showAll = ref(false)
const inputText = ref('')
const cardList = ref([
  {
    id: 1,
    title: 'Ноутбук',
    description: 'Я хочу получить в подарок новый ноутбук',
    completed: false,
  },
  {
    id: 2,
    title: 'Наушники',
    description: 'Я хочу получить в подарок наушники для ноутбука',
    completed: true,
  },
  {
    id: 3,
    title: 'Мышка',
    description: 'Я хочу получить в подарок мышку для ноутбука',
    completed: false,
  },
  {
    id: 4,
    title: 'Игрушка',
    description: 'Я хочу получить в подарок наушники для ноутбука',
    completed: false,
  },
  {
    id: 5,
    title: 'Стул',
    description: 'Я хочу получить в подарок наушники для ноутбука',
    completed: true,
  },
])

const cardFilterList = computed(() => {
  let listNew = cardList.value

  if (showAll.value) {
    listNew = listNew.filter(item => item.completed)
  }
  if (inputText.value !== null) {
    listNew = listNew.filter(elem => elem.title.includes(inputText.value))
  }

  return listNew
})

// const cardFilterList = computed(() => {
//   let listNew = cardList
//
//   listNew = listNew.filter(elem => elem.title.includes(inputText.value))
//
//   return listNew
// })

const completedItemCount = computed(() => {
  return cardList.value.filter(item => item.completed).length

})

const notCompletedItemCount = computed(() => {
  return cardList.value.filter(item => !item.completed).length
})

const cardListCount = computed(() => {
  return cardList.value.length
})

const totalItemCount = computed(() => {
  return cardFilterList.value.length
})


</script>

<template>
  <div>
    <div>
      <label for="text">Ввод:</label>
      <input type="text" id="text"
             v-model="inputText">
    </div>
    <div>
      <input type="checkbox" name="check" id="check" v-model="showAll">
      <label for="check">Показать</label>
    </div>
  </div>
  <div class="list">
    <h1>Wish list</h1>
    <div class="card" v-for="cardItem in cardFilterList" :key="cardItem.id">
      <div class="card-title">{{ cardItem.title }}</div>
      <div class="card-description">{{ cardItem.description }}</div>
      <div class="card-completed">
        <div :class="cardItem.completed ? 'card-is-completed' : 'card-is-not-completed'">
          {{ cardItem.completed ? 'Исполнено' : 'Не исполнено' }}
        </div>
      </div>
    </div>
  </div>
  <div class="total">
    <p>Исполнено: {{ completedItemCount }}</p>
    <p>Не исполнено: {{ notCompletedItemCount }}</p>
    <p>Общее количество желаний: {{ cardListCount }}</p>
    <p>
      Количество видимых желаний: {{ totalItemCount }}
    </p>
  </div>
</template>

<style scoped>

.card {
  width: 300px;
  padding: 24px 24px 16px;
  background-color: #f0ebeb;
  border-radius: 16px;
  margin-bottom: 16px;
}


.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}


.card-description {
  color: rgb(106, 109, 114);
  margin-bottom: 16px;
}

.card-is-completed {
  text-align: center;
  width: 100px;
  padding: 0 6px;
  border: 1px solid rgb(42, 182, 231);
  color: rgb(42, 182, 231);
  border-radius: 4px;
}


.card-is-not-completed {
  text-align: center;
  width: 100px;
  padding: 0 6px;
  border: 1px solid rgb(166, 182, 197);
  color: rgb(166, 182, 197);
  border-radius: 4px;
}
</style>