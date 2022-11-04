<template>
  <div class="task" v-bind:class="{ checked: task.state }">
    <TCheckbox :id="task.id" :state="task.state" />
    <div class="task__editable" v-bind:class="{ task__kanban: kanban }">
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
      <div class="task__date" v-if="!this.task.state">
        <time v-if="isTheDateSaved" class="task__date-value" @click="editDate">
          {{ formatDate }}
        </time>
        <Datepicker
          v-if="isTheDateBeingEdited"
          v-model="taskDate"
          @closed="submitDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TCheckbox from "./TCheckbox.vue";
import TInput from "./TInput.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { mapActions } from "vuex";

export default {
  name: "TTask",
  components: {
    TCheckbox,
    TInput,
    Datepicker,
  },
  props: {
    task: {
      id: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      state: {
        type: Boolean,
        required: true,
      },
    },
    kanban: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: "fullDate",
    },
  },
  data() {
    return {
      taskDate: this.task.date,
      taskDescription: this.task.title,
      isTheTaskSaved: true,
      isTheTaskBeingEdited: false,
      isTheDateSaved: true,
      isTheDateBeingEdited: false,
    };
  },
  computed: {
    formatDate() {
      const currentDate = new Date(this.taskDate);
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
      };
      const dateOptionsWithoutYear = {
        month: "numeric",
        day: "numeric",
      };
      const dateOptions = {
        year: "numeric",
        ...dateOptionsWithoutYear,
      };

      if (this.format === "onlyTime") {
        return `${currentDate.toLocaleString("ru", timeOptions)}`;
      } else if (this.format === "onlyDate") {
        return `${currentDate.toLocaleString("ru", dateOptions)}`;
      } else if (this.format === "dateWithoutYear") {
        return `${currentDate.toLocaleString("ru", dateOptionsWithoutYear)}`;
      } else
        return `${currentDate.toLocaleString(
          "ru",
          dateOptions
        )} ${currentDate.toLocaleString("ru", timeOptions)}`;
    },
  },
  methods: {
    editTaskDescription() {
      if (this.task.state) return;

      this.isTheTaskSaved = false;
      this.isTheTaskBeingEdited = true;
    },
    editDate() {
      this.isTheDateSaved = false;
      this.isTheDateBeingEdited = true;
    },
    submitTaskDescription() {
      this.updateTaskDescription({
        id: this.task.id,
        taskDescription: this.taskDescription,
      });
      this.isTheTaskSaved = true;
      this.isTheTaskBeingEdited = false;
    },
    submitDate() {
      this.updateTaskDate({
        id: this.task.id,
        taskDate: this.taskDate,
      });

      this.isTheDateSaved = true;
      this.isTheDateBeingEdited = false;
    },
    ...mapActions(["updateTaskDescription", "updateTaskDate"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.task {
  background-color: $task-background;
  padding: 0 16px;

  &__editable {
    display: flex;
    flex-grow: 1;
    gap: 8px;
    align-items: center;
  }

  &__kanban {
    flex-direction: column;
    align-items: start;
  }

  &__description {
    width: 100%;
  }

  &__date {
    min-width: fit-content;
  }

  &__date-value {
    line-height: 35px;
  }
}

.checked {
  background-color: $task-done-background;
  text-decoration: line-through;
}
</style>
