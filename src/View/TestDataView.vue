<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    monthYear() {
      return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    days() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    },
    monthDates() {
      const start = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const end = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      const datesArray = [];
      for (let i = start.getDate(); i <= end.getDate(); i++) {
        datesArray.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i));
      }
      return datesArray;
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
  },
};
</script>

<template>
  <div class="calendar">
    <h2>{{ monthYear }}</h2>
    <button @click="prevMonth">«</button>
    <button @click="nextMonth">»</button>
    <div class="days">
      <div v-for="day in days" :key="day">{{ day }}</div>
      <div v-for="date in monthDates" :key="date.getDate()" class="date">
        {{ date.getDate() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  text-align: center;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.date {
  padding: 10px;
}
</style>