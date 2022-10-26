<template>
  <input type="text" class="input" :value="modelValue" @input="updateValue" />
</template>

<script>
export default {
  name: "TInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  height: 16px;
}
</style>
