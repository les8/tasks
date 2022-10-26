<template>
  <div class="list">
    <TTask />
    <TTask />
    <TTask />
    <TTask />
    <TTask />
    <TTask />
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
