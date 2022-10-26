<template>
  <div class="table">
    <div class="table__content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  name: "TheTable",
  components: {
    RouterView,
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 80%;

  &__content {
    width: 100%;
  }
}
</style>
