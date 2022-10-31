<template>
  <div class="list" v-if="currentTasks">
    <TTask
      v-for="(task, index) in sortedTasks"
      :task="task"
      :key="task.id"
      :index="index"
      :kanban="false"
      class="list__item"
    />
    <TCreate class="list__item" />
  </div>
</template>

<script>
import TTask from "../components/tasks-ui/TTask.vue";
import TCreate from "../components/tasks-ui/TCreate.vue";
import { mapState } from "vuex";

export default {
  name: "ListView",
  components: {
    TTask,
    TCreate,
  },
  computed: {
    sortedTasks() {
      const sort = this.currentTasks;
      return sort.sort((x, y) => +new Date(x.date) - +new Date(y.date));
    },
    ...mapState(["currentTasks"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";

.list {
  @include text-primary;

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
  }
}
</style>
