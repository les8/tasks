import { createStore } from "vuex";
import axios from "axios";

function dayFiter(tasksList, subsequentDays) {
  const currentDate = new Date();

  return tasksList.filter((i) => {
    const itemDate = new Date(i.date);

    if (
      currentDate.getFullYear() === itemDate.getFullYear() &&
      currentDate.getMonth() === itemDate.getMonth() &&
      currentDate.getDate() + subsequentDays === itemDate.getDate()
    ) {
      return i;
    }
  });
}

export const store = createStore({
  state() {
    return {
      currentTasks: "",
    };
  },
  getters: {
    todayTasks(state) {
      return dayFiter(state.currentTasks, 0);
    },
    tomorrowTasks(state) {
      return dayFiter(state.currentTasks, 1);
    },
    otherTasks(state, getters) {
      const usedTasks = [...getters.todayTasks, ...getters.tomorrowTasks];
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
