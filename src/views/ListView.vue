<template>
  <div class="list">
    <TTask
      date="Wed Dec 12 2012 12:12:00 GMT+0400 (Moscow Standard Time)"
      description="Задача 1"
    />
  </div>
</template>

<script>
import TTask from "../components/tasks-ui/TTask.vue";

export default {
  name: "App",
  components: {
    TTask,
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
}
</style>
