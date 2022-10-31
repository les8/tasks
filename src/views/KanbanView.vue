<template>
  <div class="kanban" v-if="currentTasks">
    <div class="kanban__column">
      <h2 class="kanban__title">Сегодня</h2>
      <div class="kanban__tasks">
        <TTask
          v-for="(task, index) in todayTasks"
          :task="task"
          :key="task.id"
          :index="index"
          :kanban="true"
          format="onlyTime"
          class="kanban__item"
        />
        <TCreate class="kanban__item" day="today" />
      </div>
    </div>
    <div class="kanban__column">
      <h2 class="kanban__title">Завтра</h2>
      <div class="kanban__tasks">
        <TTask
          v-for="(task, index) in tomorrowTasks"
          :task="task"
          :key="task.id"
          :index="index"
          :kanban="true"
          format="onlyTime"
          class="kanban__item"
        />
        <TCreate class="kanban__item" day="tomorrow" />
      </div>
    </div>
    <div class="kanban__column">
      <h2 class="kanban__title">Позднее</h2>
      <div class="kanban__tasks">
        <TTask
          v-for="(task, index) in otherTasks"
          :task="task"
          :key="task.id"
          :index="index"
          :kanban="true"
          format="dateWithoutYear"
          class="kanban__item"
        />
        <TCreate class="kanban__item" day="theDayAfterTomorrow" />
      </div>
    </div>
  </div>
</template>

<script>
import TTask from "../components/tasks-ui/TTask.vue";
import TCreate from "../components/tasks-ui/TCreate.vue";
import { mapState } from "vuex";

export default {
  name: "KanbanView",
  components: {
    TTask,
    TCreate,
  },
  data() {
    return {
      currDate: new Date(),
    };
  },
  computed: {
    tasks() {
      return this.currentTasks;
    },
    todayTasks() {
      return this.tasks.filter((i) => {
        const itemDate = new Date(i.date);

        if (
          this.currDate.getFullYear() === itemDate.getFullYear() &&
          this.currDate.getMonth() === itemDate.getMonth() &&
          this.currDate.getDate() === itemDate.getDate()
        ) {
          return i;
        }
      });
    },
    tomorrowTasks() {
      return this.tasks.filter((i) => {
        const itemDate = new Date(i.date);

        if (
          this.currDate.getFullYear() === itemDate.getFullYear() &&
          this.currDate.getMonth() === itemDate.getMonth() &&
          this.currDate.getDate() + 1 === itemDate.getDate()
        ) {
          return i;
        }
      });
    },
    otherTasks() {
      const usedTasks = [...this.todayTasks, ...this.tomorrowTasks];
      const usedIds = [];

      usedTasks.forEach((i) => usedIds.push(i.id));

      return this.tasks.filter((task) => !usedIds.includes(task.id));
    },
    ...mapState(["currentTasks"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";

.kanban {
  @include text-primary;

  display: flex;

  &__column {
    position: relative;
    flex-grow: 1;
    padding: 0 16px;
    border-right: 1px solid $secondary-text;

    &:last-child {
      border-right: none;
    }
  }

  &__title {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 32px;
    text-align: center;
    background-color: $primary-background;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 120px;
    border-radius: 5px;
  }
}
</style>
