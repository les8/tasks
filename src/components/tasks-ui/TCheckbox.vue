<template>
  <input
    type="checkbox"
    class="checkbox"
    v-model="checked"
    :true-value="on"
    :false-value="off"
  />
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",
  props: {
    id: {
      type: Number,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      on: true,
      off: false,
      checked: this.state,
    };
  },
  updated() {
    this.setTaskState({ id: this.id, state: this.checked });
  },
  methods: mapMutations(["setTaskState"]),
};
</script>

<style lang="scss" scoped>
.checkbox {
  width: 16px;
  height: 16px;
  margin-right: 16px;
}
</style>
