<template>
  <div class="kanban__column">
    <h2 class="kanban__title">{{ title }}</h2>
    <div class="kanban__tasks">
      <TTask
        v-for="task in taskList"
        :task="task"
        :key="task.id"
        :kanban="kanban"
        :format="format"
        class="kanban__item"
      />
      <TCreate class="kanban__item" :day="day" />
    </div>
  </div>
</template>

<script>
import TTask from "../tasks-ui/TTask.vue";
import TCreate from "../tasks-ui/TCreate.vue";

export default {
  name: "KanbanView",
  components: {
    TTask,
    TCreate,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    taskList: {
      type: Array,
      required: true,
    },
    kanban: {
      type: Boolean,
      default: true,
    },
    format: {
      type: String,
      default: "fullDate",
    },
    day: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.kanban {
  &__column {
    position: relative;
    width: calc(100% / 3);
    height: 100vh;
    overflow-y: auto;
    padding: 0 16px 16px;
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
