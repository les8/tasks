import { createStore } from "vuex";
import axios from "axios";
import { subsequentDaysFiter, previousDaysFiter } from "../js/filters";

export const store = createStore({
  state() {
    return {
      currentTasks: "",
    };
  },
  getters: {
    todayTasks(state) {
      return subsequentDaysFiter(state.currentTasks, 0);
    },
    tomorrowTasks(state) {
      return subsequentDaysFiter(state.currentTasks, 1);
    },
    otherTasksAfterTomorrow(state, getters) {
      const usedTasks = [
        ...getters.todayTasks,
        ...getters.tomorrowTasks,
        ...previousDaysFiter(state.currentTasks),
      ];
      const usedIds = [];

      usedTasks.forEach((i) => usedIds.push(i.id));

      return state.currentTasks.filter((task) => !usedIds.includes(task.id));
    },
  },
  mutations: {
    setCurrentTasks(state, payload) {
      state.currentTasks = payload;
    },
    setNewTask(state, payload) {
      state.currentTasks.push(payload);
    },
    updateTaskState(state, payload) {
      state.currentTasks.forEach((item) => {
        if (item.id === payload.id) {
          item.state = payload.state;
        }
      });
    },
    updateTaskDescription(state, payload) {
      state.currentTasks.map((item) => {
        if (item.id === payload.id) {
          item.title = payload.taskDescription;
        }
      });
    },
    updateTaskDate(state, payload) {
      state.currentTasks.map((item) => {
        if (item.id === payload.id) {
          item.date = payload.taskDate;
        }
      });
    },
  },
  actions: {
    async setCurrentTasks(state) {
      try {
        const tasks = await axios
          .get(`http://localhost:3000/tasks/`)
          .then((response) => response.data);
        state.commit("setCurrentTasks", tasks);
      } catch {
        alert("Something went wrong");
      }
    },
  },
  strict: true,
});
