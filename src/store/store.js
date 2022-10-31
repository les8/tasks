import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
  state() {
    return {
      currentTasks: "",
    };
  },
  mutations: {
    setCurrentTasks(state, payload) {
      state.currentTasks = payload;
    },
    setTaskState(state, payload) {
      state.currentTasks.forEach((item) => {
        if (item.id === payload.id) {
          item.state = payload.state;
        }
      });
    },
    setNewTask(state, payload) {
      state.currentTasks.push(payload);
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
});
