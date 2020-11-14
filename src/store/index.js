import firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const defaultStore = {
//   user: null,
//   todoLists: [],
//   tasks: {},
// };

export default new Vuex.Store({
  state: {
    user: null,
    todoLists: [
      // {
      //   id: '123',
      //   title: 'List title',
      // },
    ],
    tasks: {
      // '123': [
      //   {
      //     taskId: '',
      //     taskState: 'Task1',
      //     taskText: false,
      //   }
      // ],
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addNewList(state, listTitle) {
      const id = `LId-${(new Date() - Math.random()).toString(36).substr(1, 9)}`;
      state.todoLists.unshift({
        id,
        title: listTitle,
      });
      Vue.set(state.tasks, id, []);
    },
    removeList(state, listId) {
      const listIndex = state.todoLists.findIndex((list) => list.id === listId);
      state.todoLists.splice(listIndex, 1);
      delete state.tasks[listId];
    },
    addTask(state, task) {
      state.tasks[task.listId].unshift(
        {
          taskId:
            `TId-${(new Date() - Math.random()).toString(36).substr(1, 9)}`,
          taskState: false,
          taskText: task.taskText,
        },
      );
    },
    removeTask(state, { taskId, listId }) {
      const tasksArr = state.tasks[listId];
      const taskIndex = tasksArr.findIndex((task) => task.taskId === taskId);
      tasksArr.splice(taskIndex, 1);
    },
    updateTaskState(state, { taskId, listId }) {
      const tasksArr = state.tasks[listId];
      const task = tasksArr.find((item) => item.taskId === taskId);
      task.taskState = !task.taskState;
    },
    // resetStore(state) {
    //   // for (const key in defaultStore) {
    //   //   if (defaultStore.hasOwnProperty(key)) {
    //   //     state[key] = defaultStore[key];
    //   //   }
    //   // }
    //   Object.keys(defaultStore).forEach((key) => {
    //     state[key] = defaultStore[key];
    //   });
    // },
  },
  actions: {
    async signUserUp({ commit }, { email, password }) {
      try {
        const user = await firebase.auth()
          .createUserWithEmailAndPassword(email, password);
        const newUser = { id: user.user.uid };
        commit('setUser', newUser);
      } catch (err) {
        alert(err.message);
      }
    },
    async signUserIn({ commit }, { email, password }) {
      try {
        const user = await firebase.auth()
          .signInWithEmailAndPassword(email, password);
        commit('setUser', { id: user.user.uid });
      } catch (err) {
        alert(err.message);
      }
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    autoSignIn({ commit }, { uid }) {
      commit('setUser', { id: uid });
    },
  },
  modules: {
  },
});
