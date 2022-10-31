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

      const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        today.getHours(),
        today.getMinutes(),
        today.getSeconds()
      );

      const theDayAfterTomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2,
        today.getHours(),
        today.getMinutes(),
        today.getSeconds()
      );

      const random = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + Math.floor(Math.random() * 8),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds()
      );

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
