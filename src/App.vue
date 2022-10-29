<template>
  <div class="wrapper">
    <TheSidebar />
    <TheTable />
  </div>
</template>

<script>
import TheSidebar from "./components/sidebar/TheSidebar.vue";
import TheTable from "./components/table/TheTable.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheTable,
  },
};
</script>

<style lang="scss">
@import "./style/nullstyle.scss";

.wrapper {
  display: flex;
}
</style>
