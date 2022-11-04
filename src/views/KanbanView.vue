<template>
  <div class="kanban" v-if="currentTasks">
    <KanbanColumn
      title="Сегодня"
      :taskList="todayTasks"
      :kanban="true"
      format="onlyTime"
      day="today"
    />
    <KanbanColumn
      title="Завтра"
      :taskList="tomorrowTasks"
      :kanban="true"
      format="onlyTime"
      day="tomorrow"
    />
    <KanbanColumn
      title="Позднее"
      :taskList="otherTasksAfterTomorrow"
      :kanban="true"
      format="dateWithoutYear"
      day="theDayAfterTomorrow"
    />
  </div>
</template>

<script>
import KanbanColumn from "../components/kanban/KanbanColumn.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "KanbanView",
  components: {
    KanbanColumn,
  },
  computed: {
    ...mapState(["currentTasks"]),
    ...mapGetters(["todayTasks", "tomorrowTasks", "otherTasksAfterTomorrow"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";

.kanban {
  @include text-primary;

  display: flex;
}
</style>
