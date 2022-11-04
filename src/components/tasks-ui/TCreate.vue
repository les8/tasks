<template>
  <div class="create" @click="create">+</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TCreate",
  props: {
    day: {
      type: String,
      default: "random",
    },
  },
  computed: mapState(["currentTasks"]),
  methods: {
    create() {
      let dayForTask = "";
      const today = new Date();
      const tomorrow = this.setTaskDate(today, 1);
      const theDayAfterTomorrow = this.setTaskDate(today, 2);
      const random = this.setTaskDate(today, Math.floor(Math.random() * 8));

      if (this.day === "today") {
        dayForTask = today;
      } else if (this.day === "tomorrow") {
        dayForTask = tomorrow;
      } else if (this.day === "theDayAfterTomorrow") {
        dayForTask = theDayAfterTomorrow;
      } else dayForTask = random;

      this.setNewTask({
        id:
          this.currentTasks.reduce(
            (prev, curr) => (prev.id > curr.id ? prev : curr),
            0
          ).id + 1,
        state: false,
        title: "Новая задача",
        date: dayForTask,
      });
    },
    setTaskDate(today, quantityDaysAfterToday) {
      let newDate = new Date();
      return newDate.setDate(today.getDate() + quantityDaysAfterToday);
    },
    ...mapMutations(["setNewTask"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.create {
  justify-content: center;
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;
  background-color: $task-create-background;
  border: 2px dashed grey;
  cursor: pointer;
}
</style>
