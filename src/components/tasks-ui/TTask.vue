<template>
  <div class="task">
    <TCheckbox />
    <div class="task__editable">
      <div class="task__description">
        <div
          v-if="isTheTaskSaved"
          class="task__text"
          @click="editTaskDescription"
        >
          {{ taskDescription }}
        </div>
        <TInput
          v-if="isTheTaskBeingEdited"
          v-model="taskDescription"
          @keydown.enter="submitTaskDescription"
        />
      </div>
      <div class="task__date">
        <div v-if="isTheDateSaved" class="task__date-value">
          {{ date }}
        </div>
        <Datepicker v-if="isTheDateBeingEdited" v-model="date" />
      </div>
    </div>
  </div>
</template>

<script>
import TCheckbox from "./TCheckbox.vue";
import TInput from "./TInput.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "TTask",
  components: {
    TCheckbox,
    TInput,
    Datepicker,
  },
  data() {
    return {
      date: "10.11.2022",
      taskDescription: "Задача 1",
      isTheTaskSaved: true,
      isTheTaskBeingEdited: false,
      isTheDateSaved: true,
      isTheDateBeingEdited: false,
    };
  },
  methods: {
    editTaskDescription() {
      this.isTheTaskSaved = false;
      this.isTheTaskBeingEdited = true;
    },
    submitTaskDescription() {
      this.isTheTaskSaved = true;
      this.isTheTaskBeingEdited = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.task {
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: $task-background;
  padding: 0 16px;

  &__editable {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
  }
}
</style>
