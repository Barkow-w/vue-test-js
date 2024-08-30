<script setup>
import {computed, ref} from "vue";

 const number = ref(0)
 const inputEmail = ref('')

 const upNumber = () => {
   number.value++
 }

 const downNumber = () => {
   number.value--
 }

 const validateEmail = computed(() => {
   let email = inputEmail

   if (email.value === '@') {
     email.value.length
   }
 })
</script>

<template>
  <div class="score">
    <div class="number">
      {{ number }}
    </div>
    <button class="btn" @click="upNumber">Up</button>
    <button class="btn" @click="downNumber">Down</button>
  </div>
  <div class="email">
    <label for="email">Ведите email:</label>
    <input type="email" name="email" v-model="inputEmail">
    <button :disabled="validateEmail">PUSH</button>
  </div>
  <slot name="dialog"></slot>
</template>

<style scoped>
.score {
  padding-top: 50px;
}

.number {
  width: 50px;
  height: 25px;
  text-align: center;
  margin-right: 20px;
  padding: 5px 10px;
  background-color: aliceblue;
  border: antiquewhite;
}

.btn {
  height: 35px;
}
</style>