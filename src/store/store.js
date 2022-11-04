import { createStore } from "vuex";
import axios from "axios";
import { subsequentDaysFiter, previousDaysFiter } from "../js/filters";

const headers = {
  "Content-Type": "application/json",
};

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
    setNewState(state, payload) {
      state.currentTasks.forEach((item) => {
        if (item.id === payload.id) {
          item.state = payload.state;
        }
      });
    },
    setNewTitle(state, payload) {
      state.currentTasks.map((item) => {
        if (item.id === payload.id) {
          item.title = payload.title;
        }
      });
    },
    setNewDate(state, payload) {
      state.currentTasks.map((item) => {
        if (item.id === payload.id) {
          item.date = payload.date;
        }
      });
    },
  },
  actions: {
    async getCurrentTasks(state) {
      try {
        const tasks = await axios
          .get(`http://localhost:3000/tasks/`)
          .then((response) => response.data);
        state.commit("setCurrentTasks", tasks);
      } catch {
        alert("Something went wrong");
      }
    },
    async createNewTask(state, payload) {
      try {
        const newTask = await axios
          .post(`http://localhost:3000/tasks/`, payload, {
            headers: headers,
          })
          .then((response) => response.data);
        state.commit("setNewTask", newTask);
      } catch {
        alert("Something went wrong");
      }
    },
    async updateTaskData(state, payload) {
      try {
        const currentTask = await axios
          .patch(`http://localhost:3000/tasks/${payload.id}`, payload.data, {
            headers: headers,
          })
          .then((response) => response.data);
        state.commit(payload.commitName, currentTask);
      } catch {
        alert("Something went wrong");
      }
    },
  },
  strict: true,
});
